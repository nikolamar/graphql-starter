import {
  Field,
  InputType,
  Int
} from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  type: string;
}

@InputType()
export class LoginInput {
  @Field()
  usernameoremail: string;

  @Field()
  password: string;
}

@InputType()
export class HotelInput {
  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  image: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field(() => Int, { defaultValue: 0 })
  stars: number;

  @Field(() => Int, { defaultValue: 0 })
  price: number;
}

@InputType()
export class HotelUpdateInput {
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

@InputType()
export class ReviewFilterInput {
  @Field(() => Int, { nullable: true })
  hotelId: number;
}