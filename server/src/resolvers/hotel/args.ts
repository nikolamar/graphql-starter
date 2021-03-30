import { ArgsType, Field, Int } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { HotelInput } from "./inputs";

@ArgsType()
export class HotelsArgs extends PaginatedArgs {
  @Field(() => HotelInput, { nullable: true })
  filter: HotelInput;
}

@ArgsType()
export class HotelArgs {
  @Field(() => Int)
  id: number;
}

@ArgsType()
export class CreateHotelArgs {
  @Field()
  input: HotelInput;
}

@ArgsType()
export class UpdateHotelArgs {
  @Field(() => Int)
  id: number;

  @Field()
  input: HotelInput;
}

@ArgsType()
export class DeleteHotelArgs {
  @Field(() => Int)
  id: number;
}

@ArgsType()
export class NewHotelArgs {
  @Field(() => Int)
  userId: number;
}
