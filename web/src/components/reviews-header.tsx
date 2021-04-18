import { Divider, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";

export const ReviewsHeader: FC<{}> = () => (
  <HStack my={1}>
    <Divider />
    <Text fontSize={11}>Reviews</Text>
    <Divider />
  </HStack>
);
