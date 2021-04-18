import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { defaults } from "../configs/defaults";
import { useMeQuery } from "../generated/graphql";

export const useIsAuthenticated = (): void => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!loading && !data?.me) {
      toast({
        title: "User needs to be authenticated.",
        description: `You are not authenticated, if you want to open page ${router.pathname} you need to login first.`,
        status: "error",
        duration: defaults.toastDuration,
        isClosable: true,
        position: "top-right",
      });
      void router.replace("/login?next=" + router.asPath);
    }
  }, [loading, data, router]);
};
