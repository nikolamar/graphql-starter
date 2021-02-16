import { Vote } from "../entities/vote";
import DataLoader from "dataloader";

// [{reviewId: 5, userId: 10}]
// [{reviewId: 5, userId: 10, value: 1}]
export const createVoteStatusLoader = () =>
  new DataLoader<{ reviewId: number; userId: number }, Vote | null>(
    async (keys) => {
      const votes = await Vote.findByIds(keys as any);
      const votesIdsToVote: Record<string, Vote> = {};
      votes.forEach((vote) => {
        votesIdsToVote[`${vote.userId}|${vote.reviewId}`] = vote;
      });

      return keys.map((key) => votesIdsToVote[`${key.userId}|${key.reviewId}`]);
    }
  );
