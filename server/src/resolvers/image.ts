import moment from "moment";
import {
  Arg,
  GraphQLTimestamp,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { config } from "../config";
import { Image } from "../entities/image";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { refreshTokens } from "../middlewares/refresh-tokens";
import { PaginatedImages } from "../objects";
import { Order } from "../types";

@Resolver(Image)
export class ImageResolver {
  @UseMiddleware(refreshTokens)
  @UseMiddleware(isAuthenticated)
  @Query(() => PaginatedImages) async images(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => GraphQLTimestamp, { nullable: true }) cursor: number,
    @Arg("order", () => String, { nullable: true }) order: Order = "ASC"
  ): Promise<PaginatedImages> {
    const dbLimit = Math.min(config.defaultLimit, limit);
    const dbLimitPlusOne = dbLimit + 1;
    const createdAt = cursor ? `'${moment(cursor).format()}'` : null;
    const whereQuery = createdAt
      ? ` WHERE i."createdAt" ${order === "ASC" ? ">" : "<"} ${createdAt}`
      : "";
    const orderQuery = order ? ` ORDER BY i."createdAt" ${order}` : "";
    const limitQuery = limit ? ` LIMIT ${dbLimitPlusOne}` : "";

    const query =
      "SELECT i.* FROM images AS i" + whereQuery + orderQuery + limitQuery;

    const images = await getConnection().query(query);

    return {
      images: images.slice(0, dbLimit),
      hasMore: images.length === dbLimitPlusOne,
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
