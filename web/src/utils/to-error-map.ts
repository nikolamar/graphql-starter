import { FieldError } from "../generated/graphql";

/**
 *
 * [{ field: "username", message: "something wrong" }]
 *
 * converts to
 *
 * { username: "something wrong" }
 *
 */

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
