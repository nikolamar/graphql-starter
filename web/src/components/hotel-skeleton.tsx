import { FC } from "react";
import { Box, HStack, Skeleton, SkeletonText } from '@chakra-ui/react';
import { defaults } from "../configs/defaults";

export const HotelSkeleton: FC<{}> = () => {
  return (
    <Box w="full">
      <Box mb={defaults.margin} p={defaults.padding} shadow="base" borderWidth="1px" borderRadius={5}>
        <HStack align="flex-start">
          <Skeleton
            mr={1}
            width={200}
            height={230}
            borderRadius={3}
          />
          <Box flex={1}>
            <Skeleton height="20px" />
            <Skeleton mt="5" height="2" width="20%" />
            <SkeletonText mt="10" noOfLines={6} spacing="4" />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}