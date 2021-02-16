import {
  Field,
  ObjectType
} from "type-graphql";
import { Hotel } from "./entities/hotel";
import { Image } from "./entities/image";
import { Review } from "./entities/review";
import { User } from "./entities/user";

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  users: User[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class PaginatedReviews {
  @Field(() => [Review])
  reviews: Review[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
export class PaginatedImages {
  @Field(() => [Image])
  images: Image[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
export class PaginatedHotels {
  @Field(() => [Hotel])
  hotels: Hotel[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
export class ImageUrl {
  @Field()
  url: string;
}