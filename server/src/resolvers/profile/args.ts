import { ArgsType, Field, Int } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { ProfileInput } from "./inputs";

@ArgsType()
export class ProfilesArgs extends PaginatedArgs {
  @Field(() => ProfileInput, { nullable: true })
  filter: ProfileInput;
}

@ArgsType()
export class CreateProfileArgs {
  @Field()
  input: ProfileInput;
}

@ArgsType()
export class UpdateProfileArgs {
  @Field(() => Int)
  id: number;

  @Field()
  input: ProfileInput;
}

@ArgsType()
export class DeleteProfileArgs {
  @Field(() => Int)
  id: number;
}