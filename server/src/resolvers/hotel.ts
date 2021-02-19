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
import { Hotel } from "../entities/hotel";
import { Image } from "../entities/image";
import { Review } from "../entities/review";
import { User } from "../entities/user";
import { HotelInput } from "../inputs";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { refreshTokens } from "../middlewares/refresh-tokens";
import { PaginatedHotels } from "../objects";
import { Context, Order } from "../types";
import { createPaginatedQuery } from "../utils/create-paginated-query";

@Resolver(Hotel)
export class HotelResolver {
  @FieldResolver(() => String, { nullable: true })
  descriptionSnippet(@Root() hotel: Hotel): String {
    if (!hotel.description) {
      return "";
    }
    return hotel.description.slice(0, 50);
  }

  @FieldResolver(() => User, { nullable: true })
  user(@Root() hotel: Hotel, @Ctx() ctx: Context) {
    if (!hotel.userId) {
      return;
    }
    return ctx.userLoader.load(hotel.userId);
  }

  @FieldResolver(() => Image, { nullable: true })
  image(@Root() hotel: Hotel, @Ctx() ctx: Context) {
    if (!hotel.imageId) {
      return;
    }
    return ctx.imageLoader.load(hotel.imageId);
  }

  @FieldResolver(() => [Review])
  async reviews(@Root() hotel: Hotel, @Ctx() ctx: Context) {
    const reviews = await ctx.reviewsLoader.load(hotel.id);
    return reviews || [];
  }

  @FieldResolver(() => [Image])
  async images(@Root() hotel: Hotel, @Ctx() ctx: Context) {
    const images = await ctx.hotelImagesLoader.load(hotel.id);
    return images || [];
  }

  @Query(() => PaginatedHotels)
  async hotels(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => GraphQLISODateTime, { nullable: true }) cursor: Date,
    @Arg("order", () => String, { nullable: true }) order: Order,
    @Arg("filter", () => HotelInput, { nullable: true }) filter: HotelInput
  ): Promise<PaginatedHotels> {
    const dbLimit = Math.min(config.defaultLimit, limit);
    const query = createPaginatedQuery("hotels", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      hotels: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
    };
  }

  @Query(() => Hotel, { nullable: true }) hotel(
    @Arg("id", () => Int) id: number
  ): Promise<Hotel | undefined> {
    return Hotel.findOne(id);
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Hotel)
  async createHotel(
    @Arg("input") input: HotelInput,
    @Ctx() ctx: Context
  ): Promise<Hotel | null> {
    if (Object.keys(input).length === 0 && input.constructor === Object) {
      return null;
    }

    if (!input.image) {
      const { image, ...values } = input;
      return await Hotel.create({ ...values, userId: ctx.req.userId }).save();
    }

    let result: Hotel = {} as Hotel;

    await getConnection().transaction(async (tm) => {
      const [ image ] = await tm.query(
        `INSERT INTO "images"("url") VALUES ($1) RETURNING "id"`,
        [input.image]
      );
      const [ hotel ] = await tm.query(
        `INSERT INTO "hotels"
        ("name", "city", "country", "description", "location", "stars", "price", "userId", "imageId", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT, DEFAULT)
        RETURNING "id", "name", "city", "country", "description", "location", "stars", "price", "userId", "imageId", "createdAt", "updatedAt"`,
        [input.name, input.city, input.country, input.description, input.location, input.stars, input.price, ctx.req.userId, image.id]
      );
      await tm.query(
        `UPDATE images
        SET "hotelId" = $2
        WHERE id = $1
      `,
        [image.id, hotel.id]
      );

      result = hotel;
    });

    return result;
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Hotel, { nullable: true })
  async updateHotel(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: HotelInput,
    @Ctx() ctx: Context
  ): Promise<Hotel | null> {
    if (Object.keys(input).length === 0 && input.constructor === Object) {
      return null;
    }

    let { image, ...rest } = input;

    const res1 = await Hotel.findOne(id);

    if (image) {
      await getConnection()
        .createQueryBuilder()
        .update(Image)
        .set({ url: image })
        .where(`"id" = :id`, { id: res1?.imageId })
        .returning("*")
        .execute();
    }

    const res2 = await getConnection()
      .createQueryBuilder()
      .update(Hotel)
      .set({ ...rest })
      .where(`id = :id AND "userId" = :userId`, {
        id,
        userId: ctx.req.userId,
      })
      .returning("*")
      .execute();

    return res2.raw[0];
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteHotel(
    @Arg("id", () => Int) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    await Hotel.delete({ id, userId: ctx.req.userId });
    return true;
  }
}
