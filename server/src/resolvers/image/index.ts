import {
  Arg,
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { defaults } from "../../configs/defaults";
import { Image } from "../../entities/image";
import { isAuthenticated } from "../../middlewares/is-authenticated";
import { parseCookies } from "../../middlewares/parse-cookies";
import { createPaginatedQuery } from "../../utils/create-paginated-query";
import { PaginatedArgs } from "../args";
import { ImageInput } from "./inputs";
import { PaginatedImages } from "./objects";

@Resolver(Image)
export class ImageResolver {
  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Query(() => PaginatedImages)
  async images(@Args() { limit, cursor, order, filter }: PaginatedArgs<ImageInput>): Promise<PaginatedImages> {
    const dbLimit = Math.min(defaults.pageLimit, limit);
    const query = createPaginatedQuery("images", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      images: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
    };
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Image)
  createImage(
    @Arg("url", () => String) url: string
  ): Promise<Image> {
    return Image.create({ url }).save();
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Image)
  async updateImage(
    @Arg("id", () => Int) id: number,
    @Arg("url", () => String) url: string
  ): Promise<Image | undefined> {
    await Image.update({ id }, { url });
    const image = await Image.findOne(id);
    return image;
  }

  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteImage(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await Image.delete(id);
    return true;
  }
}
