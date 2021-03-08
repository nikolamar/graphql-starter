import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { RedisPubSub } from "graphql-redis-subscriptions";
import http from "http";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { redisConfig } from "./configs/redis";
import { typeormConfig } from "./configs/typeorm";
import {
  CORS_ORIGIN,
  PORT,
  PROD,
  REDIS_URL
} from "./constants";
import { AuthResolver } from "./resolvers/auth";
import { HotelResolver } from "./resolvers/hotel";
import { ImageResolver } from "./resolvers/image";
import { ProfileResolver } from "./resolvers/profile";
import { ReviewResolver } from "./resolvers/review";
import { UploadResolver } from "./resolvers/upload";
import { UserResolver } from "./resolvers/user";
import { VersionResolver } from "./resolvers/version";
import { createHotelImagesLoader } from "./utils/create-hotel-images-loader";
import { createImageLoader } from "./utils/create-image-loader";
import { createProfileImagesLoader } from "./utils/create-profile-images-loader";
import { createProfileLoader } from "./utils/create-profile-loader";
import { createReviewsLoader } from "./utils/create-reviews-loader";
import { createUserLoader } from "./utils/create-user-loader";
import { createVoteStatusLoader } from "./utils/create-vote-status-loader";

const main = async () => {
  const conn = await createConnection(typeormConfig as any);
  console.log("typeorm connection status:", conn.isConnected);

  if (PROD) {
    await conn.runMigrations();
  }

  const app = express();

  const redis = new Redis(REDIS_URL, redisConfig);

  app.set("trust proxy", 1); // if the server is behind proxy

  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(express.static("public"));

  const pubSub = new RedisPubSub({
    publisher: new Redis(REDIS_URL, redisConfig),
    subscriber: new Redis(REDIS_URL, redisConfig),
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      pubSub,
      validate: false,
      resolvers: [
        VersionResolver,
        AuthResolver,
        UserResolver,
        ProfileResolver,
        ImageResolver,
        HotelResolver,
        ReviewResolver,
        UploadResolver
      ],
    }),
    // context is created on every request
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      profileLoader: createProfileLoader(),
      voteStatusLoader: createVoteStatusLoader(),
      reviewsLoader: createReviewsLoader(),
      imageLoader: createImageLoader(),
      profileImagesLoader: createProfileImagesLoader(),
      hotelImagesLoader: createHotelImagesLoader()
    }),
    subscriptions: {
      onConnect: () => console.log("Connected to websocket"),
    }
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(parseInt(PORT!), () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

main().catch((error) => console.log(error));
