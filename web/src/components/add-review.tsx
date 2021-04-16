import { Avatar, Button, HStack, Textarea } from "@chakra-ui/react";
import { FC } from "react";
import { defaults } from "../configs/defaults";

export const AddReview: FC<{}> = () => {
  return (
    <HStack mb={defaults.margin} align="flex-start">
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <Textarea placeholder="write a review" />
      <Button>Send</Button>
    </HStack>
  );
};
