import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps extends BoxProps {
  variant?: WrapperVariant;
}

export const Wrapper: FC<WrapperProps> = ({
  children,
  variant = "regular",
  ...rest
}) => {
  return (
    <Box
      {...rest}
      w="100%"
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
    >
      {children}
    </Box>
  );
};