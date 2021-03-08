import {
  Field,
  InputType,
  Int
} from "type-graphql";

@InputType()
export class ImageFilterInput {
  @Field({ nullable: true })
  url: string;

  @Field(() => Int, { nullable: true })
  userId: number;

  @Field(() => Int, { nullable: true })
  hotelId: number;
}