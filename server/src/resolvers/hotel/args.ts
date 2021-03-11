import { ArgsType, Field, ID } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { HotelInput } from "./inputs";

@ArgsType()
export class HotelsArgs extends PaginatedArgs {
  @Field(() => HotelInput, { nullable: true })
  filter: HotelInput;
}

@ArgsType()
export class HotelArgs {
  @Field()
  id: number;
}

@ArgsType()
export class CreateHotelArgs {
  @Field()
  input: HotelInput;
}

@ArgsType()
export class UpdateHotelArgs {
  @Field()
  id: number;

  @Field()
  input: HotelInput;
}

@ArgsType()
export class DeleteHotelArgs {
  @Field()
  id: number;
}

@ArgsType()
export class NewHotelArgs {
  @Field(() => ID)
  userId: number;
}
