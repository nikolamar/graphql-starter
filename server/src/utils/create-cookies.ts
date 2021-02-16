import { Response } from "express";
import { COOKIE_NAME } from "../constants";

export const createCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie(`${COOKIE_NAME}-access-token`, accessToken, { expires: (new Date(Date.now() + 1000 * 60 * 15)) });
  res.cookie(`${COOKIE_NAME}-refresh-token`, refreshToken, { expires: (new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)) });
}