import {
  Field,
  InputType,
  Int
} from "type-graphql";

@InputType()
export class UserInput {
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