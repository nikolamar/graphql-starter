import { Field, InputType, Int } from "type-graphql";

@InputType()
export class ReviewInput {
  @Field({ nullable: true })
  message: string;

  @Field(() => Int, { nullable: true })
  likes: number;

  @Field(() => Int, { nullable: true })
  dislikes: number;

  @Field(() => Int, { nullable: true })
  hotelId: number;
}
