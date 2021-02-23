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
import { getConnection } from "typeorm";
import { config } from "../config";
import { Image } from "../entities/image";
import { Profile } from "../entities/profile";
import { ProfileInput, ReviewFilterInput } from "../inputs";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { refreshTokens } from "../middlewares/refresh-tokens";
import { PaginatedProfiles } from "../objects";
import { Context, Order } from "../types";
import { createPaginatedQuery } from "../utils/create-paginated-query";

@Resolver(Profile)
export class ProfileResolver {
  @FieldResolver(() => Image, { nullable: true })
  image(@Root() profile: Profile, @Ctx() ctx: Context) {
    if (!profile.imageId) {
      return;
    }
    return ctx.imageLoader.load(profile.imageId);
  }

  @FieldResolver(() => [Image])
  async images(@Root() profile: Profile, @Ctx() ctx: Context) {
    const images = await ctx.profileImagesLoader.load(profile.id);
    return images || [];
  }

  @FieldResolver(() => String, { nullable: true })
  fullName(@Root() profile: Profile): String {
    let fullName = "";
    if (profile.firstName) {
      fullName += profile.firstName;
    }
    if (profile.middleName) {
      fullName += " " + profile.middleName;
    }
    if (profile.lastName) {
      fullName += " " + profile.lastName;
    }
    return fullName;
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Query(() => PaginatedProfiles) async profiles(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => GraphQLISODateTime, { nullable: true }) cursor: Date,
    @Arg("order", () => String, { nullable: true }) order: Order,
    @Arg("filter", () => ReviewFilterInput, { nullable: true }) filter: ReviewFilterInput
  ): Promise<PaginatedProfiles> {
    const dbLimit = Math.min(config.defaultPageLimit, limit);
    const query = createPaginatedQuery("profiles", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      profiles: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
    };
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Profile)
  createProfile(
    @Arg("input") input: ProfileInput,
  ): Promise<Profile> | null {
    if (Object.keys(input).length === 0 && input.constructor === Object) {
      return null;
    }

    return Profile.create({ ...input }).save();
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Profile, { nullable: true })
  async updateProfile(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: ProfileInput,
  ): Promise<Profile | undefined> {
    await Profile.update({ id }, input);
    const profile = await Profile.findOne(id);
    return profile;
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteProfile(
    @Arg("id", () => Int) id: number,
  ): Promise<Boolean> {
    await Profile.delete({ id });
    return true;
  }
}
