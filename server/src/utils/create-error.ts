import { UserResponse } from "src/resolvers/auth/objects";

export const createError = (field: string, message: string): UserResponse => ({
  errors: [{ field, message }],
});
