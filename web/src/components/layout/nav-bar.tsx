import { useApolloClient } from "@apollo/client";
import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { config } from "../../config";
import { MeDocument, MeQuery, useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from "../../utils/is-server";
import { AccessibleLink } from "../accessible-link";

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
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    if (!isServer()) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = () => {
    let position = window.pageYOffset || 0;
    setInRange(position > 50);
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
    <Flex zIndex={1000} position="sticky" top={0} height={inRange ? 55 : 100} bg={color} mt="2rem" shadow={inRange ? "md" : undefined} transition="height 200ms">
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
                <Avatar as={MenuButton} width={inRange ? "40px" : "50px"} height={inRange ? "40px" : "50px"} name={data?.me?.profile?.fullName || undefined} src={data.me?.image?.url || undefined} />
                <MenuList>
                  <MenuItem onClick={() => router.push("my-account")}>My Account</MenuItem>
                  <MenuItem onClick={() => router.push("settings")}>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          )}
        </Box>
      </Flex>
    </Flex>
  );
});