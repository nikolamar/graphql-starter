import { ArgsType, Field, Int } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { ReviewInput } from "./inputs";

@ArgsType()
export class ReviewsArgs extends PaginatedArgs {
  @Field(() => ReviewInput, { nullable: true })
  filter: ReviewInput;
}

@ArgsType()
export class ReviewArgs {
  @Field(() => Int)
  id: number;
}

@ArgsType()
export class CreateReviewArgs {
  @Field(() => Int)
  hotelId: number;

  @Field()
  message: string;
}

@ArgsType()
export class UpdateReviewArgs {
  @Field(() => Int)
  id: number;

  @Field()
  message: string;
}

@ArgsType()
export class DeleteReviewArgs {
  @Field(() => Int)
  id: number;
}

@ArgsType()
export class VoteArgs {
  @Field(() => Int)
  value: number;

  @Field(() => Int)
  reviewId: number;
}