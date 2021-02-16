import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

type AccessibleLinkProps = Omit<ChakraLinkProps, "as"> & Omit<LinkProps, "as"> & {
  as?: string;
};

export const AccessibleLink: FC<AccessibleLinkProps> = ({
  href,
  isExternal,
  children,
  as,
  onClick,
  ...props
}) => {
  return (
    <Link href={href} as={as} passHref>
      <ChakraLink {...props} isExternal={isExternal} onClick={onClick}>{children}</ChakraLink>
    </Link>
  );
};
