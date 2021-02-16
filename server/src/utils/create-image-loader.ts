import DataLoader from "dataloader";
import { Image } from "../entities/image";

// [1, 78, 8, 9]
// [{id: 1, url: 'http...'}, {}, {}, {}]
export const createImageLoader = () =>
  new DataLoader<number, Image>(async (imageIds) => {
    const images = await Image.findByIds(imageIds as number[]);
    const imageIdToImage: Record<number, Image> = {};
    images.forEach((i) => {
      imageIdToImage[i.id] = i;
    });

    const sortedImages = imageIds.map((id) => imageIdToImage[id]);
    return sortedImages;
  });
