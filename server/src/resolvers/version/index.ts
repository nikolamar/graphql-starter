import { Query, Resolver } from "type-graphql";
import * as config from "../../../package.json";

@Resolver(() => String)
export class VersionResolver {
  @Query(() => String) version() {
    return config.description + " " + config.version;
  }
}
