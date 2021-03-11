import { ArgsType, Field } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { UserInput } from "./inputs";

@ArgsType()
export class UsersArgs extends PaginatedArgs {
  @Field(() => UserInput, { nullable: true })
  filter: UserInput;
}
