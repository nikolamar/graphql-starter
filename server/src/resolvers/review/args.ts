import { ArgsType, Field } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { ReviewInput } from "./inputs";

@ArgsType()
export class ReviewsArgs extends PaginatedArgs {
  @Field(() => ReviewInput, { nullable: true })
  filter: ReviewInput;
}
