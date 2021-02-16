import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Hotel } from "../../components/hotel";
import { HotelSkeleton } from "../../components/hotel-skeleton";
import { NotFound } from "../../components/not-found";
import { config } from "../../config";
import { useGetHotelFromUrl } from '../../utils/use-get-hotel-from-url';
import { withApollo } from '../../utils/with-apollo';

const HotelById: FC<{}> = () => {
  
  const [sliceIdx, setSliceIdx] = useState(Infinity);

  const {data, loading} = useGetHotelFromUrl();

  const handleLoadMoreReviews = () => {
    setSliceIdx(config.defaultLimit);
  }

  const handleHideReviews = () => {
    setSliceIdx(1);
  }

  if (loading) {
    return (
      <HotelSkeleton/>
    );
  }

  if (!data?.hotel) {
    return (
      <NotFound>Hotel not Found.</NotFound>
    );
  }

  return (
    <Box w="full">
      <Hotel>{data?.hotel}</Hotel>
    </Box>
  );
}

export default withApollo({ ssr: true })(HotelById);