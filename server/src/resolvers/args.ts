import { Field, ArgsType, Int, GraphQLISODateTime } from "type-graphql";
import { HotelInput } from "../resolvers/hotel/inputs";
import { Order } from "../types";

@ArgsType()
export class PaginatedArgs {
  @Field(() => Int)
  limit: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  cursor: Date;

  @Field(() => String, { nullable: true })
  order: Order;

  @Field(() => HotelInput, { nullable: true })
  filter: HotelInput;
}
