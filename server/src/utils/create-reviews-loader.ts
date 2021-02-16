import DataLoader from "dataloader";
import { In } from "typeorm";
import { Review } from "../entities/review";

// [1, 78, 8, 9]
// [[{id: 1, message: 'great'}], ...]
export const createReviewsLoader = () =>
  new DataLoader<number, Review[]>(async (hotelIds) => {
    const reviews = await Review.find({
      where: { hotelId: In([...hotelIds]) },
    });
    const hotelIdToReviews: Record<number, Review[]> = {};
    reviews.forEach((r) => {
      hotelIdToReviews[r.hotelId] = [...(hotelIdToReviews[r.hotelId] || []), r];
    });
    const sortedReviews = hotelIds.map((id) => hotelIdToReviews[id]);
    return sortedReviews;
  });
