import { ArgsType, Field, Int } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { UserInput } from "./inputs";

@ArgsType()
export class UsersArgs extends PaginatedArgs {
  @Field(() => UserInput, { nullable: true })
  filter: UserInput;
}

@ArgsType()
export class UserArgs {
  @Field(() => Int)
  id: number;
}

@ArgsType()
export class DeleteUserArgs {
  @Field(() => Int)
  id: number;
}
