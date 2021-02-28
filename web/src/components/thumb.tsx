import { Box, BoxProps, Image } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

type ThumbProps = BoxProps & {
  file: File | null;
}

export const Thumb: FC<ThumbProps> = ({ file, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState();

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    let reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      setThumb(reader.result as any);
    };
    reader.readAsDataURL(file);
  }, [file]);

  if (!file) { return null; }

  if (loading) { return <p>Loading image...</p>; }

  return (
    <Box {...rest}>
      <Image src={thumb} alt={file.name} objectFit="cover" w="100%" h="100%"/>
    </Box>
  );
}