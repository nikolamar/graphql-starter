import { ID, Field, ArgsType } from "type-graphql";

@ArgsType()
export class NewHotelArgs {
  @Field(() => ID)
  userId: number;
}
