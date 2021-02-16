import { Box, HStack, Link, LinkProps, Text } from "@chakra-ui/react";
import { FC } from "react";
import { BiChevronsDown } from "react-icons/bi";

type ShowMoreProps = Omit<LinkProps, 'children'> & {
  children: any;
};

export const LinkShowReviews: FC<ShowMoreProps> = ({
  children,
  ...rest
}) => (
  <Link {...rest}>
    <HStack>
      <Box><BiChevronsDown/></Box>
      <Text fontSize={12}>{children}</Text>
    </HStack>
  </Link>
);