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
import { Review } from "../../entities/review";
import { User } from "../../entities/user";
import { Vote } from "../../entities/vote";
import { isAuthenticated } from "../../middlewares/is-authenticated";
import { parseCookies } from "../../middlewares/parse-cookies";
import { Context } from "../../types";
import { createPaginatedQuery } from "../../utils/create-paginated-query";
import { PaginatedArgs } from "../args";
import { ReviewInput } from "./inputs";
import { PaginatedReviews } from "./objects";

@Resolver(Review)
export class ReviewResolver {
  @FieldResolver(() => User, { nullable: true })
  user(@Root() review: Review, @Ctx() ctx: Context) {
    if (!review.userId) {
      return;
    }
    return ctx.userLoader.load(review.userId);
  }

  @UseMiddleware(parseCookies)
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
  async reviews(@Args() { limit, cursor, order, filter }: PaginatedArgs<ReviewInput>): Promise<PaginatedReviews> {
    const dbLimit = Math.min(defaults.pageLimit, limit);
    const query = createPaginatedQuery("reviews", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      reviews: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
    };
  }

  @Query(() => Review, { nullable: true })
  review(
    @Arg("id", () => Int) id: number
  ): Promise<Review | undefined> {
    return Review.findOne(id);
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Review)
  async createReview(
    @Arg("hotelId", () => Int) hotelId: number,
    @Arg("message", () => String) message: string,
    @Ctx() ctx: Context
  ): Promise<Review> {
    return Review.create({ message, hotelId, userId: ctx.req.userId }).save();
  }

  @UseMiddleware(parseCookies)
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

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteReview(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await Review.delete(id);
    return true;
  }

  @UseMiddleware(parseCookies)
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
