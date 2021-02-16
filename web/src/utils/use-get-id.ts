import { useRouter } from "next/router";
import { isServer } from "./is-server";

export const useGetId = () => {
  const router = useRouter();
  const id =
    !isServer() && typeof router?.query?.id === "string"
      ? parseInt(router?.query?.id)
      : -1;

  return id;
};
