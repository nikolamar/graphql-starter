import { Field, ArgsType, Int, GraphQLISODateTime } from "type-graphql";
import { Order } from "../types";

@ArgsType()
export class PaginatedArgs {
  @Field(() => Int)
  limit: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  cursor: Date;

  @Field(() => String, { nullable: true })
  order: Order;
}
