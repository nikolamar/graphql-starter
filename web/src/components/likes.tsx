import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { BiLike } from "react-icons/bi";

type LikesProps = { children: number };

export const Likes: FC<LikesProps> = ({ children }) => (
  <>
    <Text fontSize={12}>{children}</Text>
    <BiLike/>
  </>
);