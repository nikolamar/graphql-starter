import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { getConnection, In } from "typeorm";
import { defaults } from "../../configs/defaults";
import { Hotel } from "../../entities/hotel";
import { Image } from "../../entities/image";
import { Profile } from "../../entities/profile";
import { Review } from "../../entities/review";
import { User } from "../../entities/user";
import { Vote } from "../../entities/vote";
import { isAdministrator } from "../../middlewares/is-administrator";
import { isAuthenticated } from "../../middlewares/is-authenticated";
import { parseCookies } from "../../middlewares/parse-cookies";
import { Context } from "../../types";
import { createPaginatedQuery } from "../../utils/create-paginated-query";
import { PaginatedArgs } from "../args";
import { UserInput } from "./inputs";
import { PaginatedUsers } from "./objects";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => Profile)
  profile(@Root() user: User, @Ctx() ctx: Context) {
    return ctx.profileLoader.load(user.profileId);
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isAdministrator)
  @Query(() => PaginatedUsers)
  async users(@Args() { limit, cursor, order, filter }: PaginatedArgs<UserInput>): Promise<PaginatedUsers> {
    const dbLimit = Math.min(defaults.pageLimit, limit);
    const query = createPaginatedQuery("users", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      users: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
    };
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isAdministrator)
  @Query(() => User, { nullable: true })
  user(
    @Arg("id", () => Int) id: number
  ): Promise<User | undefined> {
    return User.findOne(id);
  }

  @UseMiddleware(parseCookies)
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
}

