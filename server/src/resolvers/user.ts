import argon2 from "argon2";
import { Hotel } from "../entities/hotel";
import {
  Arg,
  Ctx,
  FieldResolver,
  GraphQLISODateTime,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { getConnection, In } from "typeorm";
import { v4 } from "uuid";
import { config } from "../config";
import { COOKIE_NAME, CORS_ORIGIN, FORGOT_PASSWORD_PREFIX } from "../constants";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import { Image } from "../entities/image";
import { LoginInput, RegisterInput, UserFilterInput } from "../inputs";
import { isAdministrator } from "../middlewares/is-administrator";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { refreshTokens } from "../middlewares/refresh-tokens";
import { PaginatedUsers, UserResponse } from "../objects";
import { regEmail } from "../regex";
import { Context, Order } from "../types";
import { createCookies } from "../utils/create-cookies";
import { createError } from "../utils/create-error";
import { createPaginatedQuery } from "../utils/create-paginated-query";
import { createTokens } from "../utils/create-tokens";
import { invalidateTokens } from "../utils/invalidate-tokens";
import { sendEmail } from "../utils/send-email";
import { validateRegister } from "../utils/validate-register";
import { Review } from "../entities/review";
import { Vote } from "../entities/vote";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => Profile)
  profile(@Root() user: User, @Ctx() ctx: Context) {
    return ctx.profileLoader.load(user.profileId);
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isAdministrator)
  @Query(() => PaginatedUsers) async users(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => GraphQLISODateTime, { nullable: true }) cursor: Date,
    @Arg("order", () => String, { nullable: true }) order: Order,
    @Arg("filter", () => UserFilterInput, { nullable: true }) filter: UserFilterInput
  ): Promise<PaginatedUsers> {
    const dbLimit = Math.min(config.defaultLimit, limit);
    const query = createPaginatedQuery("users", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      users: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
    };
  }

  @Query(() => User, { nullable: true }) user(
    @Arg("id", () => Int) id: number
  ): Promise<User | undefined> {
    return User.findOne(id);
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isAdministrator)
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<Boolean> {
    const user = await User.findOne(id);
    const profile = await Profile.findOne(user?.profileId);
    const images = await Image.find({ where: { profileId: profile?.id }});
    const imageIds = images.map(i => i.id);
    const votes = await Vote.find({ where: { userId: user?.id }});
    const voteUserIds = votes.map(v => v.userId);
    const voteReviewIds = votes.map(v => v.reviewId);
    const reviews = await Review.find({ where: { hotelId: id } });
    const reviewIds = reviews.map(r => r.id);
    const hotels = await Hotel.find({ where: { userId: user?.id } });
    const hotelIds = hotels.map(h => h.id);

    if (imageIds?.length) {
      await Image.delete(imageIds);
    }

    if (voteUserIds?.length && voteReviewIds?.length) {
      await Vote.delete({ userId: In(voteUserIds), reviewId: In(voteReviewIds) });
    }

    if (reviewIds?.length) {
      await Review.delete(reviewIds);
    }

    if (hotelIds?.length) {
      await Hotel.delete(hotelIds);
    }

    if (profile) {
      await Profile.delete(profile.id);
    }

    await User.delete(id);
    return true;
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Query(() => User, { nullable: true })
  me(@Ctx() ctx: Context): Promise<User | undefined> {
    return User.findOne(ctx.req.userId);
  }

  @Mutation(() => UserResponse) async login(
    @Arg("input") input: LoginInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    const isEmail = regEmail.test(input.usernameoremail);

    const query = isEmail
      ? { email: input.usernameoremail }
      : { username: input.usernameoremail };

    const user = await User.findOne({ where: query });

    if (!user) {
      if (isEmail) {
        return createError(
          "usernameoremail",
          "user with that email doesn't exist"
        );
      } else {
        return createError("usernameoremail", "that username doesn't exist");
      }
    }
    const valid = await argon2.verify(user.password, input.password);
    if (!valid) {
      return createError("password", "incorrect password");
    }

    const tokens = createTokens(user);
    createCookies(ctx.res, tokens.accessToken, tokens.refreshToken);

    return { user };
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    const user = await User.findOne(ctx.req.userId);

    if (!user) {
      return false;
    }

    // logout from other systems
    await invalidateTokens(user);

    // clear all cookies
    ctx.res.clearCookie(`${COOKIE_NAME}-access-token`);
    ctx.res.clearCookie(`${COOKIE_NAME}-refresh-token`);

    return true;
  }

  @Mutation(() => UserResponse) async register(
    @Arg("input") input: RegisterInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    const errors = validateRegister(input);

    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(input.password);

    let user: any;
    try {
      const profile = await Profile.create().save();
      user = await User.create({ ...input, ...{ password: hashedPassword, profileId: profile.id }}).save();
    } catch (err: any) {
      if (err.code === "23505") {
        if (err.detail === `Key (email)=(${input.email}) already exists.`) {
          return createError("email", "email already taken");
        } else if (err.detail === `Key (username)=(${input.username}) already exists.`) {
          return createError("username", "username already taken");
        }
      }
    }

    const tokens = createTokens(user);
    createCookies(ctx.res, tokens.accessToken, tokens.refreshToken);

    return { user };
  }

  @Mutation(() => UserResponse) async forgotPassword(
    @Arg("usernameoremail") usernameoremail: string,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    const isEmail = regEmail.test(usernameoremail);

    const query = isEmail
      ? { email: usernameoremail }
      : { username: usernameoremail };

    const user = await User.findOne({ where: query });

    if (!user) {
      if (isEmail) {
        return createError(
          "usernameoremail",
          "user with that email doesn't exist"
        );
      } else {
        return createError("usernameoremail", "that username doesn't exist");
      }
    }

    const token = v4();

    await ctx.redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); // 3 days

    // logout from other systems
    invalidateTokens(user);

    await sendEmail(
      user.email,
      `<a href="${CORS_ORIGIN}/change-password/${token}">reset password</a>`
    );

    return { user };
  }

  @Mutation(() => UserResponse) async changePassword(
    @Arg("token") token: string,
    @Arg("newpassword") newpassword: string,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    if (newpassword.length <= 2) {
      return createError("newpassword", "length must be greater than 2");
    }

    const key = FORGOT_PASSWORD_PREFIX + token;
    const userId = await ctx.redis.get(key);
    if (!userId) {
      return createError("link", "link expired?");
    }

    const id = parseInt(userId);
    const user = await User.findOne(id);

    if (!user) {
      return createError("link", "user no longer exists");
    }

    // update db and delete from redis
    await User.update({ id }, { password: await argon2.hash(newpassword) });
    await ctx.redis.del(key);

    // logout from other systems
    invalidateTokens(user);

    // log in user after change password
    ctx.req.userId = user.id;

    return { user };
  }
}

