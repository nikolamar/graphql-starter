import { gql } from "@apollo/client";
import { Avatar, Box, HStack, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import moment from "moment";
import { FC } from "react";
import { Dislikes } from "../components/dislikes";
import { Likes } from "../components/likes";
import { config } from "../config";
import { ReviewSnippetFragment, useVoteMutation } from "../generated/graphql";

interface ReviewListItemProps {
  children: ReviewSnippetFragment;
}

export const Review: FC<ReviewListItemProps> = ({ children: review }) => {

  const color = useColorModeValue("gray.200", "gray.700");
  const [vote] = useVoteMutation();

  const handleVote = (value: 1 | -1) => {
    vote({ variables: { reviewId: review.id, value }, update: (cache) => {
      // const { reviewId, value } = args as VoteMutationVariables;
      const reviewId = "Review:" + review.id;
      const data = cache.readFragment<ReviewSnippetFragment>({
        id: reviewId,
        fragment: gql`
          fragment _ on Review {
            id
            likes
            dislikes
            voteStatus
          }
        `,
      });
      if (data) {
        // vote is new
        if (data.voteStatus === null) {
          return;
        }

        let likes = data.likes;
        let dislikes = data.dislikes;

        // it is change of vote
        if (data.voteStatus !== value) {
          if (value === 1) {
            likes++;
            dislikes--;
          } else {
            likes--;
            dislikes++;
          }
        }
        cache.writeFragment({
          id: reviewId,
          fragment: gql`
            fragment _ on Review {
              id
              likes
              dislikes
              voteStatus
            }
          `,
          data: { likes, dislikes, voteStatus: value }
        });
      }
    }});
  }

  return (
    <Box mb={config.defaultMargin}>
      <HStack align="flex-start">
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <VStack align="flex-start" spacing={1}>
          <Text fontSize={14}>Firstname Lastname</Text>
          <Text fontSize={12}>{moment(review.createdAt).startOf('day').fromNow()}</Text>
          <VStack
            p={2}
            spacing={0}
            align="flex-end"
            borderRadius={5}
            bgColor={color}
          >
            <Text
              mb={config.defaultMargin}
              textAlign="justify"
              fontSize={14}
            >
              {review.message}
            </Text>
            <HStack spacing={1}>
              {!review.likes ? null : <Likes>{review.likes}</Likes>}
              {!review.dislikes ? null: <Dislikes>{review.dislikes}</Dislikes>}
            </HStack>
          </VStack>
          <HStack pl={2}>
            <Link><Text fontSize={10} onClick={() => handleVote(1)}>Like</Text></Link>
            <Link><Text fontSize={10} onClick={() => handleVote(-1)}>Dislike</Text></Link>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}