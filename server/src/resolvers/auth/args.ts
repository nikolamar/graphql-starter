import { ArgsType, Field } from "type-graphql";
import { LoginInput, RegisterInput } from "./inputs";

@ArgsType()
export class LoginArgs {
  @Field()
  input: LoginInput;
}

@ArgsType()
export class RegisterArgs {
  @Field()
  input: RegisterInput;
}

@ArgsType()
export class ForgotPasswordArgs {
  @Field()
  usernameoremail: string;
}

@ArgsType()
export class ChangePasswordArgs {
  @Field()
  token: string;

  @Field()
  newpassword: string;
}