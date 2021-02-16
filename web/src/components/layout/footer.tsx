import { Flex, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC<{}> = () => {

  const color = useColorModeValue("teal.500", "gray.800");

  return (
    <Flex as="footer" width="full" align="center" height="500px" bgColor={color}>
      <Text textAlign="center" width="100%" color="white">
        2020 Nikola's template -{" "}
        <Link href="https://nikolatec.com" isExternal>
          more info
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
