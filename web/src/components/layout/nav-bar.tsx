import { useApolloClient } from "@apollo/client";
import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { config } from "../../config";
import { MeDocument, MeQuery, useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from "../../utils/is-server";
import { AccessibleLink } from "../accessible-link";

let lastKnownScrollPosition = 0;
let ticking = false;

export const NavBar: FC<{}> = (() => {

  const toast = useToast();
  const router = useRouter();
  const color = useColorModeValue("white", "gray.800");
  const [logout] = useLogoutMutation();
  const apollo = useApolloClient();
  const { data } = useMeQuery({
    // cookie is passed even with ssr: true in create client
    // skip: isServer() // don't run on server
  });
  const [isSmaller, setNavSmaller] = useState(false);

  useEffect(() => {
    if (!isServer()) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = () => {
    let newScrollPosition = Math.round(window.scrollY / 50) * 50;

    if (newScrollPosition === lastKnownScrollPosition) {
      return;
    }

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (newScrollPosition > lastKnownScrollPosition && newScrollPosition > 100) {
          setNavSmaller(true);
        }
        if (newScrollPosition < lastKnownScrollPosition && newScrollPosition < 100) {
          setNavSmaller(false);
        }
        lastKnownScrollPosition = newScrollPosition;
        ticking = false;
      });
  
      ticking = true;
    }
  }

  const handleLogout = async () => {
    await logout({ update: (cache) => {
      cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: null,
        },
      });
    }}); // redirecting with middleware "use-is-auth.ts"
    await apollo.clearStore();
    toast({
      title: "Logged out.",
      description: "We've successfully logged you out.",
      status: "success",
      duration: config.defaultToastDuration,
      isClosable: true,
      position: "top-right"
    });
  }

  return (
    <Flex zIndex={1000} position="sticky" top={0} height={isSmaller ? 55 : 100} bg={color} mt="2rem" shadow={isSmaller ? "md" : undefined} transition="height 500ms">
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <HStack>
          <AccessibleLink href="/">
            <Text fontSize={16} fontWeight="600">Hotels</Text>
          </AccessibleLink>
          {!data?.me? null : (
            <AccessibleLink href="/create-hotel">
              <Text fontSize={16} fontWeight="600">Create Hotel</Text>
            </AccessibleLink>)}
        </HStack>
        <Box ml="auto">
          {!data?.me ? (
            <HStack>
              <AccessibleLink href="/login">Login</AccessibleLink>
            </HStack>
          ) : (
            <HStack>
              <Text>{data.me.email || data.me.username}</Text>
              <Menu>
                <MenuButton>
                  <Avatar size={isSmaller ? "sm" : "md"} name={data?.me?.profile?.fullName || undefined} src={data.me?.profile?.image?.url || undefined} transition="width 500ms, height 500ms"/>
                </MenuButton>
                <div>
                  <MenuList>
                    <MenuItem onClick={() => router.push("my-account")}><Text>My Account</Text></MenuItem>
                    <MenuItem onClick={() => router.push("settings")}>Settings</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </div>
              </Menu>
            </HStack>
          )}
        </Box>
      </Flex>
    </Flex>
  );
});