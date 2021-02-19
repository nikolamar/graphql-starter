import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { config } from "../config";
import { useMeQuery } from "../generated/graphql";

export const useIsAuthenticated = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!loading && !data?.me) {
      toast({
        title: "User needs to be authenticated.",
        description: `You are not authenticated, if you want to open page ${router.pathname} you need to login first.`,
        status: "error",
        duration: config.defaultToastDuration,
        isClosable: true,
        position: "top-right"
      });
      router.replace("/login?next=" + router.asPath);
    }
  }, [loading, data, router]);
};
