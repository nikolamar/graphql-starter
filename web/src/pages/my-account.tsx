import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { Layout } from "../components/layout";
import { Wrapper } from "../components/wrapper";
import { withApollo } from "../utils/with-apollo";

const MyAccount: FC<{}> = () => (
  <Layout>
    <Wrapper minHeight="100vh">
      <Text>My Account</Text>
    </Wrapper>
  </Layout>
);

export default withApollo({ ssr: false })(MyAccount);
