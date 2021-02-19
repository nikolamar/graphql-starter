import { Box, Button, Collapse, Flex, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { FC, useState } from "react";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { Review } from "../components/review";
import { ReviewsHeader } from "../components/reviews-header";
import { config } from "../config";
import { HotelSnippetFragment, useDeleteHotelMutation, useMeQuery, useReviewsQuery } from "../generated/graphql";
import { AccessibleLink } from "./accessible-link";
import { Rate } from "./rate";

interface HotelProps {
  children: HotelSnippetFragment;
}

export const Hotel: FC<HotelProps> = ({ children: hotel }) => {

  const [order, setOrder] = useState("DESC");
  const [isReviewsVisible, setReviewsVisible] = useState(false);
  const { data: dataMe } = useMeQuery();
  const [deleteHotel] = useDeleteHotelMutation();

  const { data, loading, fetchMore } = useReviewsQuery({
    skip: !isReviewsVisible,
    variables: {
      order,
      limit: config.defaultLimit,
      cursor: null,
      hotelId: hotel.id
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleDelete = () => {
    deleteHotel({ variables: { id: hotel.id }, update: (cache) => {
      cache.evict({ id: "Hotel:" + hotel.id });
    }});
  }

  const handleLoadMoreReviews = () => {
    fetchMore({
      variables: {
        order,
        limit: config.defaultLimit,
        cursor: data?.reviews.reviews[data?.reviews.reviews.length - 1].createdAt,
        hotelId: hotel.id
      },
    });
  }

  const handleShowReviewsButton = () => {
    setReviewsVisible(!isReviewsVisible);
  }

  let tools = null;

  if (dataMe?.me?.id === hotel?.userId) {
    tools = (
      <>
        <AccessibleLink href="/hotel/edit/[id]" as={`/hotel/edit/${hotel.id}`}>
          <IconButton
            size="xs"
            aria-label="update hotel"
            icon={<RiEdit2Line/>}
          />
        </AccessibleLink>
        <IconButton
          size="xs"
          aria-label="delete hotel"
          icon={<RiDeleteBinLine/>}
          onClick={handleDelete}
        />
      </>
    );
  }

  return (
    <Box key={hotel.id} mb={config.defaultMargin} p={config.deafaultPadding} shadow="base" borderWidth="1px" borderRadius={5}>
      <HStack align="flex-start">
        <Image
          mr={1}
          width={220}
          height={270}
          borderRadius={3}
          objectFit="cover"
          src={hotel.image?.url || undefined}
        />
        <Box flex={1}>
          <HStack>
            <AccessibleLink href="/hotel/[id]" as={`/hotel/${hotel.id}`} flex={1} height={10}>
              <Heading fontSize="l" noOfLines={1}>{hotel.name}</Heading>
            </AccessibleLink>
            <Rate readonly={true} defaultValue={hotel.stars}/>
            {tools}
          </HStack>
          <Text fontSize={12}>Created by {hotel.user.username}</Text>
          <Flex align="flex-start" minHeight={120}>
            <Text flex={1} mt={4} fontSize={14} noOfLines={5} textAlign="justify">
              {hotel.description}
            </Text>
          </Flex>
          <Box mt={2}>
            <Text fontSize={24} textAlign="right">{hotel.price} €</Text>
            <Flex alignItems="flex-end">
              <Text fontSize={12}>{moment(hotel.createdAt).format('LL')}</Text>
              <Button
                mt={2}
                minW={170}
                ml="auto"
                leftIcon={isReviewsVisible ? <IoIosArrowDropupCircle/> : <IoIosArrowDropdownCircle />}
                onClick={handleShowReviewsButton}
                isLoading={loading}
                colorScheme="teal"
              >
                {isReviewsVisible ? "Hide Reviews" : "Show Reviews"}
              </Button>
            </Flex>
          </Box>
        </Box>
      </HStack>
      <Collapse in={isReviewsVisible} animateOpacity>
        <ReviewsHeader/>
        {data?.reviews?.reviews?.map((review) => <Review key={review.id}>{review}</Review>)}
        {data && data.reviews.hasMore ? <Flex>
          <Button m="auto" my="8" isLoading={loading} onClick={handleLoadMoreReviews}>
            Load More
          </Button>
        </Flex> : <Text textAlign="center">No reviews yet!</Text>}
      </Collapse>
    </Box>
  );
}