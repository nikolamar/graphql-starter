export const createError = (field: string, message: string) => ({
  errors: [{ field, message }],
});
