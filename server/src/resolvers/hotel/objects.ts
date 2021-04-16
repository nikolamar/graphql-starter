import { Field, ObjectType } from "type-graphql";
import { Hotel } from "../../entities/hotel";

@ObjectType()
export class NewHotelResponse {
  @Field(() => Hotel)
  hotel: Hotel;
}

@ObjectType()
export class PaginatedHotels {
  @Field(() => [Hotel])
  hotels: Hotel[];

  @Field()
  hasMore: boolean;
}
