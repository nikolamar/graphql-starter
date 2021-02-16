import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Stream } from "stream";
import { createHotelImagesLoader } from "./utils/create-hotel-images-loader";
import { createImageLoader } from "./utils/create-image-loader";
import { createProfileLoader } from "./utils/create-profile-loader";
import { createReviewsLoader } from "./utils/create-reviews-loader";
import { createUserImagesLoader } from "./utils/create-user-images-loader";
import { createUserLoader } from "./utils/create-user-loader";
import { createVoteStatusLoader } from "./utils/create-vote-status-loader";

export type Context = {
  req: Request & { userId: any, type: any };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  profileLoader: ReturnType<typeof createProfileLoader>;
  imageLoader: ReturnType<typeof createImageLoader>;
  userImagesLoader: ReturnType<typeof createUserImagesLoader>;
  hotelImagesLoader: ReturnType<typeof createHotelImagesLoader>;
  voteStatusLoader: ReturnType<typeof createVoteStatusLoader>;
  reviewsLoader: ReturnType<typeof createReviewsLoader>;
};

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): Stream;
}

export type Order = "ASC" | "DESC";
