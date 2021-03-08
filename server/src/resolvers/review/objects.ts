import {
  Field,
  ObjectType
} from "type-graphql";
import { Review } from "../../entities/review";

@ObjectType()
export class PaginatedReviews {
  @Field(() => [Review])
  reviews: Review[];

  @Field()
  hasMore: boolean;
}