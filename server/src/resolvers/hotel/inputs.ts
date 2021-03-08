import {
  Field,
  InputType,
  Int
} from "type-graphql";

@InputType()
export class HotelInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  location: string;

  @Field(() => Int, { nullable: true })
  stars: number;

  @Field(() => Int, { nullable: true })
  price: number;
}