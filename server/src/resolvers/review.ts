import moment from "moment";
import {
  Arg,
  Ctx,
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
import { Review } from "../entities/review";
import { Vote } from "../entities/vote";
import { ReviewFilterInput } from "../inputs";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { refreshTokens } from "../middlewares/refresh-tokens";
import { PaginatedReviews } from "../objects";
import { Context, Order } from "../types";

@Resolver(Review)
export class ReviewResolver {
  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() review: Review,
    @Ctx() ctx: Context
  ): Promise<number | null> {
    if (!ctx.req.userId) {
      return null;
    }
    const vote = await ctx.voteStatusLoader.load({
      reviewId: review.id,
      userId: ctx.req.userId,
    });
    return vote ? vote.value : null;
  }

  @Query(() => PaginatedReviews) async reviews(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => GraphQLTimestamp, { nullable: true }) cursor: number,
    @Arg("order", () => String, { nullable: true }) order: Order = "ASC",
    @Arg("filter", () => ReviewFilterInput, { nullable: true }) filter: ReviewFilterInput
  ): Promise<PaginatedReviews> {
    const dbLimit = Math.min(config.defaultLimit, limit);
    const dbLimitPlusOne = dbLimit + 1;
    const createdAt = cursor ? `'${moment(cursor).format()}'` : null;
    const whereCretedAtQuery = createdAt
      ? ` WHERE h."createdAt" ${order === "ASC" ? ">" : "<"} ${createdAt}`
      : "";
    const whereHotelIdQuery = filter?.hotelId
      ? ` ${createdAt ? "AND" : "WHERE"} "hotelId" = ${filter.hotelId}`
      : "";
    const orderQuery = order ? ` ORDER BY r."createdAt" ${order}` : "";
    const limitQuery = limit ? ` LIMIT ${dbLimitPlusOne}` : "";

    const query =
      "SELECT r.* FROM reviews AS r" +
      whereCretedAtQuery +
      whereHotelIdQuery +
      orderQuery +
      limitQuery;

    const reviews = await getConnection().query(query);

    return {
      reviews: reviews.slice(0, dbLimit),
      hasMore: reviews.length === dbLimitPlusOne,
    };
  }

  @Query(() => Review, { nullable: true }) review(
    @Arg("id", () => Int) id: number
  ): Promise<Review | undefined> {
    return Review.findOne(id);
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Review)
  async createReview(
    @Arg("hotelId", () => Int) hotelId: number,
    @Arg("message", () => String) message: string
  ): Promise<Review> {
    return Review.create({ message, hotelId }).save();
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Review, { nullable: true })
  async updateReview(
    @Arg("id", () => Int) id: number,
    @Arg("message", () => String) message: string
  ): Promise<Review | undefined> {
    await Review.update({ id }, { message });
    const review = await Review.findOne(id);
    return review;
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteReview(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await Review.delete(id);
    return true;
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async vote(
    @Arg("value", () => Int) value: number,
    @Arg("reviewId", () => Int) reviewId: number,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const isPostive = value !== -1;
    const computedValue = isPostive ? 1 : -1;
    const userId = ctx.req.userId;
    const setValue = computedValue === 1 ? "likes" : "dislikes";
    const downgradeValue = computedValue === 1 ? "dislikes" : "likes";

    const vote = await Vote.findOne({ where: { reviewId, userId } });

    // Changing vote
    if (vote && vote.value !== computedValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          UPDATE votes
          SET value = $1
          WHERE "reviewId" = $2 AND "userId" = $3
        `,
          [computedValue, reviewId, userId]
        );
        await tm.query(
          `
          UPDATE reviews
          SET ${downgradeValue} = ${downgradeValue} - 1
          WHERE id = $1
        `,
          [reviewId]
        );
        await tm.query(
          `
          UPDATE reviews
          SET ${setValue} = ${setValue} + 1
          WHERE id = $1
        `,
          [reviewId]
        );
      });
      // There is no vote
    } else if (!vote) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          INSERT INTO VOTES ("userId", "reviewId", value)
          VALUES ($1, $2, $3)
        `,
          [userId, reviewId, computedValue]
        );
        await tm.query(
          `
          UPDATE reviews
          SET ${setValue} = ${setValue} + 1
          WHERE id = $1
        `,
          [reviewId]
        );
      });
    }

    return true;
  }
}
