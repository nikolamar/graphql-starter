import {
  Arg,
  GraphQLISODateTime,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { config } from "../config";
import { Image } from "../entities/image";
import { ImageFilterInput } from "../inputs";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { refreshTokens } from "../middlewares/refresh-tokens";
import { PaginatedImages } from "../objects";
import { Order } from "../types";
import { createPaginatedQuery } from "../utils/create-paginated-query";

@Resolver(Image)
export class ImageResolver {
  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Query(() => PaginatedImages) async images(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => GraphQLISODateTime, { nullable: true }) cursor: Date,
    @Arg("order", () => String, { nullable: true }) order: Order,
    @Arg("filter", () => ImageFilterInput, { nullable: true }) filter: ImageFilterInput
  ): Promise<PaginatedImages> {
    const dbLimit = Math.min(config.defaultPageLimit, limit);
    const query = createPaginatedQuery("images", cursor, order, dbLimit, filter);
    const result = await getConnection().query(query);

    return {
      images: result.slice(0, dbLimit),
      hasMore: result.length === (dbLimit + 1),
    };
  }

  @Query(() => Boolean) async test() {
    return true;
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Image)
  createImage(
    @Arg("url", () => String) url: string
  ): Promise<Image> {
    return Image.create({ url }).save();
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  async updateImage(
    @Arg("id", () => Int) id: number,
    @Arg("url", () => String) url: string
  ): Promise<Image | undefined> {
    await Image.update({ id }, { url });
    const image = await Image.findOne(id);
    return image;
  }

  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteImage(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await Image.delete(id);
    return true;
  }
}
