import moment from "moment";
import {
  Arg,
  FieldResolver,
  GraphQLTimestamp,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { config } from "../config";
import { Profile } from "../entities/profile";
import { ProfileInput } from "../inputs";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { refreshTokens } from "../middlewares/refresh-tokens";
import { PaginatedProfiles } from "../objects";
import { Order } from "../types";

@Resolver(Profile)
export class ProfileResolver {
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
    @Arg("cursor", () => GraphQLTimestamp, { nullable: true }) cursor: number,
    @Arg("order", () => String, { nullable: true }) order: Order = "ASC"
  ): Promise<PaginatedProfiles> {
    const dbLimit = Math.min(config.defaultLimit, limit);
    const dbLimitPlusOne = dbLimit + 1;
    const createdAt = cursor ? `'${moment(cursor).format()}'` : null;
    const whereQuery = createdAt
      ? ` WHERE p."createdAt" ${order === "ASC" ? ">" : "<"} ${createdAt}`
      : "";
    const orderQuery = order ? ` ORDER BY p."createdAt" ${order}` : "";
    const limitQuery = limit ? ` LIMIT ${dbLimitPlusOne}` : "";

    const query =
      "SELECT p.* FROM profiles AS p" + whereQuery + orderQuery + limitQuery;

    const profiles = await getConnection().query(query);

    return {
      profiles: profiles.slice(0, dbLimit),
      hasMore: profiles.length === dbLimitPlusOne,
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
