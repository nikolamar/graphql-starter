import { ArgsType, Field } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { ImageInput } from "./inputs";

@ArgsType()
export class ImagesArgs extends PaginatedArgs {
  @Field(() => ImageInput, { nullable: true })
  filter: ImageInput;
}
