import { Field, ObjectType } from "type-graphql";
import { Profile } from "../../entities/profile";

@ObjectType()
export class PaginatedProfiles {
  @Field(() => [Profile])
  profiles: Profile[];

  @Field()
  hasMore: boolean;
}
