import { Box, Button, Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Hotel } from "../components/hotel";
import { config } from "../config";
import { useHotelsQuery } from "../generated/graphql";
import { withApollo } from "../utils/with-apollo";
import { Wrapper } from "../components/wrapper";
// import { isServer } from "../utils/is-server";

const Index: FC<{}> = () => {

  const [order, setOrder] = useState("DESC");

  const { data, loading, fetchMore } = useHotelsQuery({
    // skip: isServer(),
    variables: {
      limit: config.defaultLimit,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleLoadMoreHotels = () => {
    fetchMore({
      variables: {
        limit: config.defaultLimit,
        cursor: data?.hotels.hotels[data?.hotels.hotels.length - 1].createdAt,
        order
      }
    });
  }

  return (
    <Wrapper minHeight="100vh" my={20}>
      <Box w="full">
        {!data ? null : data?.hotels?.hotels?.map(hotel => <Hotel key={hotel.id}>{hotel}</Hotel>)}
      </Box>
      {data && data.hotels.hasMore ? <Flex>
        <Button m="auto" my="8" isLoading={loading} onClick={handleLoadMoreHotels}>
          Load More
        </Button>
      </Flex> : null}
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Index);