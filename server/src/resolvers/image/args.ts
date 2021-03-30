import { ArgsType, Field, Int } from "type-graphql";
import { PaginatedArgs } from "../common-args";
import { ImageInput } from "./inputs";

@ArgsType()
export class ImagesArgs extends PaginatedArgs {
  @Field(() => ImageInput, { nullable: true })
  filter: ImageInput;
}

@ArgsType()
export class CreateImageArgs {
  @Field()
  url: string;
}

@ArgsType()
export class UpdateImageArgs {
  @Field(() => Int)
  id: number;

  @Field()
  url: string;
}

@ArgsType()
export class DeleteImageArgs {
  @Field(() => Int)
  id: number;
}