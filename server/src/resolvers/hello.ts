import { Query, Resolver } from "type-graphql";

@Resolver(() => String)
export class HelloResolver {
  @Query(() => String) helloWorld() {
    return "Hello World!";
  }
}
