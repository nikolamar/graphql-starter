import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { HelperImage } from "./helper-image";

export const SomeText: FC<{}> = () => {
  const color = useColorModeValue("gray.200", "gray.500");

  return (
    <>
      <Heading as="h2" fontSize="3xl">
        Hello
      </Heading>

      <Box padding={4} borderRadius={4} bgColor={color}>
        <Text d="flex" alignItems="center" fontSize="sm">
          This is a
          <HelperImage src="/nextjs-black-logo.svg" label="NextJS" />
          app with
          <HelperImage
            src="/chakra-ui-logomark-colored.svg"
            label="Chakra UI"
          />
          and
          <HelperImage src="/ts-logo-512.svg" label="TypeScript" />
          setup.
        </Text>
      </Box>
    </>
  );
};
