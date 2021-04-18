import sharp from "sharp";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { v4 } from "uuid";
import { DOMAIN, PORT, PROD } from "../../constants";
import { isAuthenticated } from "../../middlewares/is-authenticated";
import { parseCookies } from "../../middlewares/parse-cookies";
import { ImageUrl } from "../image/objects";
import { FileUpload } from "../../types";
import { GraphQLUpload } from "graphql-upload";

@Resolver()
export class UploadResolver {
  @UseMiddleware(parseCookies)
  @UseMiddleware(isAuthenticated)
  @Mutation(() => ImageUrl)
  async imageUpload(
    @Arg("file", () => GraphQLUpload) file: FileUpload
  ): Promise<ImageUrl> {
    const { createReadStream } = (await file) as any;

    const getBuffer = () => {
      const stream = createReadStream();

      return new Promise<Buffer>((resolve, reject) => {
        const buffers: Buffer[] = [];
        stream.on("error", (error: any) => reject(error));
        stream.on("data", (data: Buffer) => buffers.push(data));
        stream.on("end", () => resolve(Buffer.concat(buffers)));
      });
    };

    const imageName = `${v4()}_${(file as any).filename}`;

    const path = __dirname + `/../../../public/images/${imageName}`;

    const imageBuffer = await getBuffer();

    await sharp(imageBuffer).toFile(path);

    const domain = PROD ? `https://${DOMAIN}` : `http://localhost:${PORT}`;

    return { url: `${domain}/images/${imageName}` };
  }
}
