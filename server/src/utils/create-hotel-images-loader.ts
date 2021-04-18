import DataLoader from "dataloader";
import { In } from "typeorm";
import { Image } from "../entities/image";

// [1, 78, 8, 9]
// [[{id: 1, url: 'http...'}], ...]
export const createHotelImagesLoader = (): DataLoader<number, Image[]> =>
  new DataLoader<number, Image[]>(async (hotelIds) => {
    const images = await Image.find({
      where: { hotelId: In([...hotelIds]) },
    });
    const hotelIdToImages: Record<number, Image[]> = {};
    images.forEach((i) => {
      hotelIdToImages[i.hotelId] = [...(hotelIdToImages[i.hotelId] || []), i];
    });
    const sortedImages = hotelIds.map((id) => hotelIdToImages[id]);
    return sortedImages;
  });
