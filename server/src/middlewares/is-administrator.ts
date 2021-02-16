import { MiddlewareFn } from "type-graphql";
import { ADMIN } from "../constants";
import { Context } from "../types";

export const isAdministrator: MiddlewareFn<Context> = ({ context }, next) => {
  if (context.req.type !== ADMIN) {
    throw new Error("not authorized");
  }

  return next();
};
