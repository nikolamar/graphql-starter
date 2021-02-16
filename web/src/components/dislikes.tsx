import { FC } from "react";
import { Text } from "@chakra-ui/react";
import { BiDislike } from "react-icons/bi"

type DislikesProps = { children: number };

export const Dislikes: FC<DislikesProps> = ({ children }) => (
  <>
    <Text fontSize={12}>{children}</Text>
    <BiDislike/>
  </>
);