import { Box, HStack, Link, LinkProps, Text } from "@chakra-ui/react";
import { FC } from "react";
import { BiChevronsUp } from "react-icons/bi";

type ShowMoreProps = Omit<LinkProps, 'children'> & {
  children: any;
};

export const LinkHideReviews: FC<ShowMoreProps> = ({
  children,
  ...rest
}) => (
  <Link {...rest}>
    <HStack>
      <Box><BiChevronsUp/></Box>
      <Text fontSize={12}>{children}</Text>
    </HStack>
  </Link>
);