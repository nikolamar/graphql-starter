import { Avatar, Button, HStack, Textarea } from '@chakra-ui/react';
import { FC } from "react";
import { config } from '../config';

export const AddReview: FC<{}> = () => {
  return (
    <HStack mb={config.defaultMargin} align="flex-start">
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <Textarea placeholder="write a review"/>
      <Button>Send</Button>
    </HStack>
  );
}