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
import { Review } from "../entities/review";
import { Vote } from "../entities/vote";
import { ReviewFilterInput } from "../inputs";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { refreshTokens } from "../middlewares/refresh-tokens";
import { PaginatedReviews } from "../objects";
import { Context, Order } from "../types";
import { createPaginatedQuery } from "../utils/create-paginated-query";

@Resolver(Review)
export class ReviewResolver {
  @UseMiddleware(refreshTokens)
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

  @Query(() => PaginatedReviews)
  async reviews(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => GraphQLISODateTime, { nullable: true }) cursor: Date,
    @Arg("order", () => String, { nullable: true }) order: Order,
    @Arg("filter", () => ReviewFilterInput, { nullable: true }) filter: ReviewFilterInput
  ): Promise<PaginatedReviews> {
    const dbLimit = Math.min(config.defaultLimit, limit);
    const query = createPaginatedQuery("reviews", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      reviews: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
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
