import { Box, Button, Collapse, Flex, Heading, HStack, IconButton, Image, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { InputField } from "../components/input-field";
import { Review } from "../components/review";
import { ReviewsHeader } from "../components/reviews-header";
import { defaults } from "../configs/defaults";
import { HotelSnippetFragment, useCreateReviewMutation, useDeleteHotelMutation, useMeQuery, useReviewsQuery } from "../generated/graphql";
import * as schemas from "../yup-schemas";
import { AccessibleLink } from "./accessible-link";
import { Rate } from "./rate";

interface HotelProps {
  children: HotelSnippetFragment;
}

export const Hotel: FC<HotelProps> = ({ children: hotel }) => {

  const toast = useToast();
  const router = useRouter();
  const { data: dataMe } = useMeQuery();
  const [deleteHotel] = useDeleteHotelMutation();
  const [createReview] = useCreateReviewMutation();
  const [order, setOrder] = useState(defaults.order);
  const [isReviewsVisible, setReviewsVisible] = useState(false);

  const { data, loading, fetchMore } = useReviewsQuery({
    skip: !isReviewsVisible,
    variables: {
      order,
      hotelId: hotel.id,
      limit: defaults.pageLimit,
      cursor: null
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
        hotelId: hotel.id,
        limit: defaults.pageLimit,
        cursor: data?.reviews.reviews[data?.reviews.reviews.length - 1].createdAt
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
    <Box key={hotel.id} mb={defaults.margin} p={defaults.padding} shadow="base" borderWidth="1px" borderRadius={5}>
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
        <Formik
          validateOnBlur={false}
          validationSchema={schemas.review}
          initialValues={{ review: "" }}
          onSubmit={async (values) => {
            if (!dataMe?.me?.id) {
              toast({
                title: "Review has not been created.",
                description: `You need to login before you review it!`,
                status: "error",
                duration: defaults.toastDuration,
                isClosable: true,
                position: "top-right"
              });
              router.replace("/login?next=" + router.asPath);
              return;
            }

            const response = await createReview({ variables: { hotelId: hotel.id, message: values.review }, update: (cache) => {
              cache.evict({ fieldName: "reviews" });
            }});

            if (response.errors) {
              toast({
                title: "Review has not been created.",
                description: `We've couldn't create review due to the error: ${response.errors}`,
                status: "error",
                duration: defaults.toastDuration,
                isClosable: true,
                position: "top-right"
              });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form-flex">
              <Box mb={4}>
                <InputField
                  name="review"
                  placeholder="write review"
                  label="Write review"
                  type="review"
                  spellCheck={false}
                >
                  <Button
                    type="submit"
                    isLoading={loading || isSubmitting}
                    colorScheme="teal"
                  >
                    Save
                  </Button>
                </InputField>
              </Box>
            </Form>
          )}
        </Formik>
        {data?.reviews?.reviews?.map((review) => <Review key={review.id}>{review}</Review>)}
        {!data?.reviews?.hasMore ? null : <Flex>
          <Button m="auto" my="8" isLoading={loading} onClick={handleLoadMoreReviews}>
            Load More
          </Button>
        </Flex>}
        {data?.reviews?.reviews?.length ? null : <Text textAlign="center">No reviews yet, be first to review it!</Text>}
      </Collapse>
    </Box>
  );
}