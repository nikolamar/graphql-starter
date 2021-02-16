import { Box, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";

export const SomeImage: FC<{}> = () => {
  return (
    <>
      <Box marginY={8} maxWidth={400} marginX="auto">
        <Image src="/Launching-amico.svg" width={400} height={400} />
      </Box>
      <Text textAlign="center" fontSize="xs">
        <Link href="https://stories.freepik.com/web" isExternal>
          Illustration by Freepik Stories
        </Link>
      </Text>
    </>
  );
};
