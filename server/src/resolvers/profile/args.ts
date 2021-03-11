import { ArgsType, Field } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { ProfileInput } from "./inputs";

@ArgsType()
export class ProfilesArgs extends PaginatedArgs {
  @Field(() => ProfileInput, { nullable: true })
  filter: ProfileInput;
}
