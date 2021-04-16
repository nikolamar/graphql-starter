import {
  Box,
  Button,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

interface NotFoundProps {
  children: string;
}

export const NotFound: FC<NotFoundProps> = ({ children }) => {
  const color = useColorModeValue("gray.300", "teal.500");

  return (
    <>
      <Box width={["100%", "70%", "60%", "60%"]} margin="0 auto">
        <Image src="/404 Error-pana.svg" />
      </Box>
      <Text textAlign="center" fontSize="xs">
        <ChakraLink href="https://stories.freepik.com/web" isExternal>
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center">{children}</Heading>

        <Box textAlign="center" marginTop={4}>
          <Text>It's Okay!</Text>
          <Link href="/" passHref>
            <Button bgColor={color}>Let's Head Back</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};
