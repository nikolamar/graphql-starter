import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { AccessibleLink } from "../accessible-link";
import ThemeToggle from "./theme-toggle";

const Header: FC<{}> = () => {
  return (
    <Flex as="header" width="full" align="center">
      <AccessibleLink href="/">
        <Heading as="h1">Hotels</Heading>
      </AccessibleLink>

      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
