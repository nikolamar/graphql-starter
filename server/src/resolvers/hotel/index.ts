import "reflect-metadata";
import {
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { defaults } from "../../configs/defaults";
import { Hotel } from "../../entities/hotel";
import { Image } from "../../entities/image";
import { Review } from "../../entities/review";
import { User } from "../../entities/user";
import { isAuthenticated } from "../../middlewares/is-authenticated";
import { parseCookies } from "../../middlewares/parse-cookies";
import { Context } from "../../types";
import { createPaginatedQuery } from "../../utils/create-paginated-query";
import {
  CreateHotelArgs,
  DeleteHotelArgs,
  HotelArgs,
  HotelsArgs,
  UpdateHotelArgs,
} from "./args";
import { PaginatedHotels } from "./objects";
import * as TOPICS from "./topics";
// import { NewHotelArgs } from "./args";

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

  @FieldResolver(() => [Review])
  async reviews(@Root() hotel: Hotel, @Ctx() ctx: Context) {
    const reviews = await ctx.reviewsLoader.load(hotel.id);
    return reviews || [];
  }

  @FieldResolver(() => Image, { nullable: true })
  image(@Root() hotel: Hotel, @Ctx() ctx: Context) {
    if (!hotel.imageId) {
      return;
    }
    return ctx.imageLoader.load(hotel.imageId);
  }

  @FieldResolver(() => [Image])
  async images(@Root() hotel: Hotel, @Ctx() ctx: Context) {
    const images = await ctx.hotelImagesLoader.load(hotel.id);
    return images || [];
  }

  @Query(() => PaginatedHotels)
  async hotels(
    @Args() { limit, cursor, order, filter }: HotelsArgs
  ): Promise<PaginatedHotels> {
    const dbLimit = Math.min(defaults.pageLimit, limit);
    const query = createPaginatedQuery(
      "hotels",
      cursor,
      order,
      dbLimit,
      filter
    );
    const result = await getConnection().query(query);

    return {
      hotels: result.slice(0, dbLimit),
      hasMore: result.length === dbLimit + 1,
    };
  }

  @Query(() => Hotel, { nullable: true })
  hotel(@Args() { id }: HotelArgs): Promise<Hotel | undefined> {
    return Hotel.findOne(id);
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Hotel)
  async createHotel(
    @Args() { input }: CreateHotelArgs,
    @Ctx() ctx: Context,
    @PubSub(TOPICS.NEW_HOTEL) notifyAboutNewHotel: Publisher<Hotel>
  ): Promise<Hotel | null> {
    if (Object.keys(input).length === 0 && input.constructor === Object) {
      return null;
    }

    const { image: url, ...values } = input;

    if (!url) {
      return await Hotel.create({ ...values, userId: ctx.req.userId }).save();
    }

    return await getConnection().transaction(async (tm) => {
      const [
        image,
      ] = await tm.query(
        `INSERT INTO "images"("url") VALUES ($1) RETURNING "id"`,
        [url]
      );
      const [hotel] = await tm.query(
        `INSERT INTO "hotels"
        ("name", "city", "country", "description", "location", "stars", "price", "userId", "imageId", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT, DEFAULT)
        RETURNING "id", "name", "city", "country", "description", "location", "stars", "price", "userId", "imageId", "createdAt", "updatedAt"`,
        [
          input.name,
          input.city,
          input.country,
          input.description,
          input.location,
          input.stars,
          input.price,
          ctx.req.userId,
          image.id,
        ]
      );
      await tm.query(
        `UPDATE images
        SET "hotelId" = $2
        WHERE id = $1
      `,
        [image.id, hotel.id]
      );

      await notifyAboutNewHotel(hotel);

      return hotel;
    });
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Hotel, { nullable: true })
  async updateHotel(
    @Args() { id, input }: UpdateHotelArgs,
    @Ctx() ctx: Context
  ): Promise<Hotel | null> {
    if (Object.keys(input).length === 0 && input.constructor === Object) {
      return null;
    }

    let { image: url, ...values } = input;
    const hotel = await Hotel.findOne(id);

    if (url) {
      const hotelImg = await Image.findOne(hotel?.imageId);

      if (!hotelImg?.url || hotelImg?.url !== url) {
        let img = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Image)
          .values({ url, hotelId: id })
          .returning("id")
          .execute();

        (values as any).imageId = img.raw[0].id;
      }
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Hotel)
      .set({ ...values })
      .where(`id = :id AND "userId" = :userId`, { id, userId: ctx.req.userId })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteHotel(
    @Args() { id }: DeleteHotelArgs,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    await Hotel.delete({ id, userId: ctx.req.userId });

    const images = await Image.find({ where: { hotelId: id } });
    const imageIds = images.map((i) => i.id);

    if (imageIds?.length) {
      await Image.delete(imageIds);
    }
    return true;
  }

  // @Subscription(() => Hotel, {
  //   topics: TOPICS.NEW_HOTEL,
  //   filter: ({ payload, args }: ResolverFilterData<Hotel, ArgsNewHotel>) => {
  //     return payload.userId === args.userId;
  //   },
  // })
  // newHotel(
  //   @Root() hotel: Hotel,
  //   @Args() { userId }: NewHotelArgs,
  // ): NewHotelResponse {
  //   console.log("userId", userId);
  //   return {
  //     hotel
  //   };
  // }

  @Subscription({ topics: TOPICS.NEW_HOTEL })
  newHotel(@Root() hotel: Hotel): Hotel {
    return hotel;
  }
}
