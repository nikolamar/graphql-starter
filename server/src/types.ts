import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Stream } from "stream";
import { Hotel } from "./entities/hotel";
import { createHotelImagesLoader } from "./utils/create-hotel-images-loader";
import { createImageLoader } from "./utils/create-image-loader";
import { createProfileImagesLoader } from "./utils/create-profile-images-loader";
import { createProfileLoader } from "./utils/create-profile-loader";
import { createReviewsLoader } from "./utils/create-reviews-loader";
import { createUserLoader } from "./utils/create-user-loader";
import { createVoteStatusLoader } from "./utils/create-vote-status-loader";

export type Context = {
  req: Request & { userId: any, type: any };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  profileLoader: ReturnType<typeof createProfileLoader>;
  voteStatusLoader: ReturnType<typeof createVoteStatusLoader>;
  reviewsLoader: ReturnType<typeof createReviewsLoader>;
  imageLoader: ReturnType<typeof createImageLoader>;
  profileImagesLoader: ReturnType<typeof createProfileImagesLoader>;
  hotelImagesLoader: ReturnType<typeof createHotelImagesLoader>;
};

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): Stream;
}

export type Order = "ASC" | "DESC";

export interface NewHotelPayload {
  hotel: Hotel;
  dateString: string;
}
