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
import { getConnection } from "typeorm";
import { defaults } from "../../configs/defaults";
import { Image } from "../../entities/image";
import { Profile } from "../../entities/profile";
import { ProfileInput } from "./inputs";
import { isAuthenticated } from "../../middlewares/is-authenticated";
import { parseCookies } from "../../middlewares/parse-cookies";
import { Context } from "../../types";
import { createPaginatedQuery } from "../../utils/create-paginated-query";
import { PaginatedArgs } from "../args";
import { PaginatedProfiles } from "./objects";

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

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Query(() => PaginatedProfiles)
  async profiles(@Args() { limit, cursor, order, filter }: PaginatedArgs): Promise<PaginatedProfiles> {
    const dbLimit = Math.min(defaults.pageLimit, limit);
    const query = createPaginatedQuery("profiles", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      profiles: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
    };
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Profile)
  async createProfile(
    @Arg("input") input: ProfileInput,
  ): Promise<Profile | null> {
    if (Object.keys(input).length === 0 && input.constructor === Object) {
      return null;
    }

    const { image: url, ...values } = input;

    if (!url) {
      return await Profile.create({ ...values }).save();
    }

    return await getConnection().transaction(async (tm) => {
      const [ image ] = await tm.query(
        `INSERT INTO "images"("url") VALUES ($1) RETURNING "id"`,
        [url]
      );
      const [ profile ] = await tm.query(
        `INSERT INTO "profiles"
        ("gender", "firstName", "middleName", "lastName", "city", "country", "birthDate", "phone", "imageId", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT, DEFAULT)
        RETURNING "gender", "firstName", "middleName", "lastName", "city", "country", "birthDate", "phone", "imageId", "createdAt", "updatedAt"`,
        [input.gender, input.firstName, input.middleName, input.lastName, input.city, input.country, input.birthDate, input.phone, image.id]
      );
      await tm.query(
        `UPDATE images
        SET "profileId" = $2
        WHERE id = $1
      `,
        [image.id, profile.id]
      );

      return profile;
    });
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Profile, { nullable: true })
  async updateProfile(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: ProfileInput,
  ): Promise<Profile | null> {
    if (Object.keys(input).length === 0 && input.constructor === Object) {
      return null;
    }

    let { image: url, ...values } = input;
    const profile = await Profile.findOne(id);

    if (url) {
      const profileImg = await Image.findOne(profile?.imageId);

      if (!profileImg?.url || profileImg?.url !== url) {
        let img = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Image)
          .values({ url, profileId: id })
          .returning("id")
          .execute();

        (values as any).imageId = img.raw[0].id;
      }
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Profile)
      .set({ ...values })
      .where(`id = :id`, { id })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteProfile(
    @Arg("id", () => Int) id: number,
  ): Promise<Boolean> {
    await Profile.delete({ id });
    return true;
  }
}
