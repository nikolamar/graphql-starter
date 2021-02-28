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
export class ProfileInput {
  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  birthDate: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  image: string;
}

@InputType()
export class ImageFilterInput {
  @Field({ nullable: true })
  url: string;

  @Field(() => Int, { nullable: true })
  userId: number;

  @Field(() => Int, { nullable: true })
  hotelId: number;
}

@InputType()
export class ReviewFilterInput {
  @Field({ nullable: true })
  message: string;

  @Field(() => Int, { nullable: true })
  likes: number;

  @Field(() => Int, { nullable: true })
  dislikes: number;

  @Field(() => Int, { nullable: true })
  hotelId: number;
}

@InputType()
export class UserFilterInput {
  @Field(() => Int, { nullable: true })
  count: number;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  email: string;

  @Field(() => Int, { nullable: true })
  profileId: number;

  @Field(() => Int, { nullable: true })
  imageId: number;
}