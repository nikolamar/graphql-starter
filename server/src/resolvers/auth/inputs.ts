import { Field, InputType } from "type-graphql";

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
