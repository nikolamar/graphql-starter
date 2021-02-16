import { MiddlewareFn } from "type-graphql";
import { Context } from "../types";

export const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.userId) {
    throw new Error("not authenticated");
  }

  return next();
};
