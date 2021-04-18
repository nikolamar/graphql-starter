import { sign } from "jsonwebtoken";
import { Tokens } from "src/types";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants";
import { User } from "../entities/user";

export const createTokens = (user: User): Tokens => ({
  accessToken: sign({ userId: user.id, type: user.type }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15min",
  }),
  refreshToken: sign(
    { userId: user.id, type: user.type, count: user.count },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  ),
});
