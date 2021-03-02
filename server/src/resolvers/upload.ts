import { GraphQLUpload } from "apollo-server-express";
import sharp from "sharp";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { v4 } from "uuid";
import { DOMAIN, PORT, PROD } from "../constants";
import { isAuthenticated } from "../middlewares/is-authenticated";
import { parseCookies } from "../middlewares/parse-cookies";
import { ImageUrl } from "../objects";
import { FileUpload } from "../types";

@Resolver()
export class UploadResolver {
  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => ImageUrl)
  async imageUpload(
    // @ts-ignore
    @Arg("file", () => GraphQLUpload) file: any,
  ): Promise<ImageUrl> {
    const { createReadStream } = await file;
    const getBuffer = (_: FileUpload) => {
      const stream = createReadStream();
      return new Promise<Buffer>((resolve, reject) => {
        const buffers: Buffer[] = [];
        stream.on("error", (error: any) => reject(error));
        stream.on("data", (data: Buffer) => buffers.push(data));
        stream.on("end", () => resolve(Buffer.concat(buffers)));
      });
    };

    const imageName = `${v4()}_${file.filename}`;
    const path = __dirname + `/../../public/images/${imageName}`;
    const imageBuffer = await getBuffer(file);

    await sharp(imageBuffer).toFile(path);

    const domain = PROD ? `https://${DOMAIN}` : `http://localhost:${PORT}`;

    return { url: `${domain}/images/${imageName}` };
  }
}