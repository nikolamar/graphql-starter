import cookie from "cookie";
import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import {
  ACCESS_TOKEN_SECRET,
  COOKIE_NAME,
  REFRESH_TOKEN_SECRET
} from "../constants";
import { User } from "../entities/user";
import { Context } from "../types";
import { createCookies } from "../utils/create-cookies";
import { createTokens } from "../utils/create-tokens";

export const refreshTokens: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.req.headers.cookie!) {
    return next();
  }

  const { [`${COOKIE_NAME}-access-token`]: accessToken } = cookie.parse(context.req.headers.cookie!);

  if (!accessToken) {
    return next();
  }

  // check if access token valid and return
  try {
    const result = verify(accessToken, ACCESS_TOKEN_SECRET as string) as any;
    context.req.userId = result.userId;
    context.req.type = result.type;
    return next();
  } catch {}

  // const refreshToken = req.cookies[`${COOKIE_NAME}-refresh-token`];
  const { [`${COOKIE_NAME}-refresh-token`]: refreshToken } = cookie.parse(context.req.headers.cookie!);
  if (!refreshToken) {
    return;
  }

  let data;

  // access token 15min expired check refresh token then
  try {
    data = verify(refreshToken, REFRESH_TOKEN_SECRET as string) as any;
  } catch {
    return next();
  }

  // check is token invalidated by forgot or change password
  const user = await User.findOne(data.userId);
  if (!user || user.count !== data.count) {
    return next();
  }

  const tokens = createTokens(user);
  createCookies(context.res, tokens.accessToken, tokens.refreshToken);
  context.req.userId = user.id;

  return next();
};
