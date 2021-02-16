import { useHotelQuery } from "../generated/graphql";
import { useGetId } from "./use-get-id";

export const useGetHotelFromUrl = () => {
  const id = useGetId();
  return useHotelQuery({
    skip: id === -1,
    variables: { id },
  });
};
