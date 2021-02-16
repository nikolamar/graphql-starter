import DataLoader from "dataloader";
import { In } from "typeorm";
import { Image } from "../entities/image";

// [1, 78, 8, 9]
// [[{id: 1, url: 'http...'}], ...]
export const createUserImagesLoader = () =>
  new DataLoader<number, Image[]>(async (userIds) => {
    const images = await Image.find({
      where: { userId: In([...userIds]) },
    });
    const userIdToImages: Record<number, Image[]> = {};
    images.forEach((i) => {
      userIdToImages[i.userId] = [...(userIdToImages[i.userId] || []), i];
    });
    const sortedImages = userIds.map((id) => userIdToImages[id]);
    return sortedImages;
  });
