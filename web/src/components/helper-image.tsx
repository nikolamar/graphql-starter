import { Box, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";

type HelperImageProps = {
  label?: string;
  src: string;
};

export const HelperImage: FC<HelperImageProps> = ({ label, src }) => {
  return (
    <Tooltip hasArrow aria-label={label} label={label} placement="auto-end">
      <Box marginX={2}>
        <Image src={src} title={label} height={33} width={33} />
      </Box>
    </Tooltip>
  );
};
