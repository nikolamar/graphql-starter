import { Field, ObjectType } from "type-graphql";
import { Image } from "../../entities/image";

@ObjectType()
export class ImageUrl {
  @Field()
  url: string;
}

@ObjectType()
export class ImageResponse {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: false })
  url: string;
}

@ObjectType()
export class PaginatedImages {
  @Field(() => [Image])
  images: Image[];

  @Field()
  hasMore: boolean;
}
