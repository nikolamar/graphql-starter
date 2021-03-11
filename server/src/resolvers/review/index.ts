import {
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
import { CreateReviewArgs, DeleteReviewArgs, ReviewArgs, ReviewsArgs, UpdateReviewArgs, VoteArgs } from "./args";
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
  async reviews(@Args() { limit, cursor, order, filter }: ReviewsArgs): Promise<PaginatedReviews> {
    const dbLimit = Math.min(defaults.pageLimit, limit);
    const query = createPaginatedQuery("reviews", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      reviews: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
    };
  }

  @Query(() => Review, { nullable: true })
  review(@Args() { id }: ReviewArgs): Promise<Review | undefined> {
    return Review.findOne(id);
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Review)
  async createReview(
    @Args() { hotelId, message }: CreateReviewArgs,
    @Ctx() ctx: Context
  ): Promise<Review> {
    return Review.create({ message, hotelId, userId: ctx.req.userId }).save();
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Review, { nullable: true })
  async updateReview(@Args() { id, message }: UpdateReviewArgs): Promise<Review | undefined> {
    await Review.update({ id }, { message });
    const review = await Review.findOne(id);
    return review;
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteReview(@Args() { id }: DeleteReviewArgs): Promise<Boolean> {
    await Review.delete(id);
    return true;
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async vote(
    @Args() { value, reviewId }: VoteArgs,
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
