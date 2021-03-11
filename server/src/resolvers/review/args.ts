import { ArgsType, Field } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { ReviewInput } from "./inputs";

@ArgsType()
export class ReviewsArgs extends PaginatedArgs {
  @Field(() => ReviewInput, { nullable: true })
  filter: ReviewInput;
}

@ArgsType()
export class ReviewArgs {
  @Field()
  id: number;
}

@ArgsType()
export class CreateReviewArgs {
  @Field()
  hotelId: number;

  @Field()
  message: string;
}

@ArgsType()
export class UpdateReviewArgs {
  @Field()
  id: number;

  @Field()
  message: string;
}

@ArgsType()
export class DeleteReviewArgs {
  @Field()
  id: number;
}

@ArgsType()
export class VoteArgs {
  @Field()
  value: number;

  @Field()
  reviewId: number;
}