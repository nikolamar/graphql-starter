import { User } from "../entities/user";

export const invalidateTokens = async (user: User): Promise<boolean> => {
  user.count += 1;
  await user.save();
  return true;
};
