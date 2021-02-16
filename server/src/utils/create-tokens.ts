import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants";
import { User } from "../entities/user";

export const createTokens = (user: User) => ({
  accessToken: sign({ userId: user.id, type: user.type }, ACCESS_TOKEN_SECRET as string, { expiresIn: "15min" }),
  refreshToken: sign({ userId: user.id, type: user.type, count: user.count }, REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" }),
});