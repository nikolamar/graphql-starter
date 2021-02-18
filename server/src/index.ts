import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import {
  CORS_ORIGIN,
  PORT,
  PROD,
  REDIS_URL
} from "./constants";
import { HelloResolver } from "./resolvers/hello";
import { HotelResolver } from "./resolvers/hotel";
import { ImageResolver } from "./resolvers/image";
import { ProfileResolver } from "./resolvers/profile";
import { ReviewResolver } from "./resolvers/review";
import { UploadResolver } from "./resolvers/upload";
import { UserResolver } from "./resolvers/user";
import { typeOrmConfig } from "./type-orm.config";
import { createHotelImagesLoader } from "./utils/create-hotel-images-loader";
import { createImageLoader } from "./utils/create-image-loader";
import { createProfileLoader } from "./utils/create-profile-loader";
import { createReviewsLoader } from "./utils/create-reviews-loader";
import { createUserImagesLoader } from "./utils/create-user-images-loader";
import { createUserLoader } from "./utils/create-user-loader";
import { createVoteStatusLoader } from "./utils/create-vote-status-loader";

const main = async () => {
  const conn = await createConnection(typeOrmConfig as any);
  console.log("typeorm connection status:", conn.isConnected);

  if (PROD) {
    await conn.runMigrations();
  }

  const app = express();

  const redis = new Redis(REDIS_URL);

  app.set("trust proxy", 1); // if the server is behind proxy

  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(express.static("public"));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, ProfileResolver, ImageResolver, HotelResolver, ReviewResolver, UploadResolver],
      validate: false,
    }),
    // context is created on every request
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      profileLoader: createProfileLoader(),
      imageLoader: createImageLoader(),
      voteStatusLoader: createVoteStatusLoader(),
      reviewsLoader: createReviewsLoader(),
      userImagesLoader: createUserImagesLoader(),
      hotelImagesLoader: createHotelImagesLoader()
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(PORT!), () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

main().catch((error) => console.log(error));
