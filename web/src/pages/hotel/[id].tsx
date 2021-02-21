import { FC, useState } from 'react';
import { Hotel } from "../../components/hotel";
import { HotelSkeleton } from "../../components/hotel-skeleton";
import { Layout } from "../../components/layout";
import { NotFound } from "../../components/not-found";
import { Wrapper } from "../../components/wrapper";
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
      <Layout>
        <Wrapper minHeight="100vh">
          <HotelSkeleton/>
        </Wrapper>
      </Layout>
    );
  }

  if (!data?.hotel) {
    return (
      <NotFound>Hotel not Found.</NotFound>
    );
  }

  return (
    <Layout>
      <Wrapper minHeight="100vh">
        <Hotel>{data?.hotel}</Hotel>
      </Wrapper>
    </Layout>
  );
}

export default withApollo({ ssr: true })(HotelById);