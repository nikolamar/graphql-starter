import { gql } from "@apollo/client";
import { Avatar, Box, HStack, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import moment from "moment";
import { FC } from "react";
import { Dislikes } from "../components/dislikes";
import { Likes } from "../components/likes";
import { defaults } from "../configs/defaults";
import { ReviewSnippetFragment, useVoteMutation } from "../generated/graphql";

interface ReviewListItemProps {
  children: ReviewSnippetFragment;
}

export const Review: FC<ReviewListItemProps> = ({ children: review }) => {

  const color = useColorModeValue("gray.200", "gray.700");
  const [vote] = useVoteMutation();

  const handleVote = (value: 1 | -1) => {
    vote({ variables: { reviewId: review.id, value }, update: (cache) => {
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

      // if it is change of vote
      if (data && data.voteStatus !== value) {
        let likes = data.likes;
        let dislikes = data.dislikes;

        if (value === 1) {
          likes++;
          // if voteStatus is not undefined
          !!data.voteStatus && dislikes--;
        } else {
          likes--;
          // if voteStatus is not undefined
          !!data.voteStatus && dislikes++;
        }

        cache.writeFragment({
          id: reviewId,
          fragment: gql`
            fragment __ on Review {
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
    <Box mb={defaults.margin}>
      <HStack align="flex-start">
        <Avatar name={review.user?.profile.fullName || undefined} src={review.user?.profile.image?.url || undefined} />
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
              mb={defaults.margin}
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