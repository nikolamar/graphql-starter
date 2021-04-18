import DataLoader from "dataloader";
import { In } from "typeorm";
import { Image } from "../entities/image";

// [1, 78, 8, 9]
// [[{id: 1, url: 'http...'}], ...]
export const createProfileImagesLoader = (): DataLoader<number, Image[]> =>
  new DataLoader<number, Image[]>(async (profileIds) => {
    const images = await Image.find({
      where: { profileId: In([...profileIds]) },
    });
    const profileIdToImages: Record<number, Image[]> = {};
    images.forEach((i) => {
      profileIdToImages[i.profileId] = [
        ...(profileIdToImages[i.profileId] || []),
        i,
      ];
    });
    const sortedImages = profileIds.map((id) => profileIdToImages[id]);
    return sortedImages;
  });
