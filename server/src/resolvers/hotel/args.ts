import { ArgsType, Field, ID } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { HotelInput } from "./inputs";

@ArgsType()
export class NewHotelArgs {
  @Field(() => ID)
  userId: number;
}

@ArgsType()
export class HotelsArgs extends PaginatedArgs {
  @Field(() => HotelInput, { nullable: true })
  filter: HotelInput;
}