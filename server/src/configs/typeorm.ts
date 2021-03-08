import path from "path";
import { DATABASE_URL, PROD } from "../constants";
import { Hotel } from "../entities/hotel";
import { Image } from "../entities/image";
import { Profile } from "../entities/profile";
import { Review } from "../entities/review";
import { User } from "../entities/user";
import { Vote } from "../entities/vote";

export const typeormConfig = {
  type: "postgres",
  url: DATABASE_URL,
  logging: true,
  synchronize: PROD ? false : true,
  migrations: [path.join(__dirname, "./migrations/*")], // path to folder with migration files
  entities: [User, Image, Profile, Hotel, Review, Vote],
};
