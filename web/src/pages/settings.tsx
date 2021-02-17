import { FormControl, FormLabel, Switch, useColorMode } from '@chakra-ui/react';
import * as React from 'react';
import { Layout } from "../components/layout";
import { Wrapper } from '../components/wrapper';
import { withApollo } from "../utils/with-apollo";

const Settings: React.FC<{}> = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Layout>
      <Wrapper minHeight="100vh">
        <FormControl display="flex" alignItems="center" mt={20}>
          <FormLabel htmlFor="email-alerts" mb="0">
            Turn {colorMode === "dark" ? "off" : "on"} dark mode?
          </FormLabel>
          <Switch id="color-theme" onChange={toggleColorMode} isChecked={colorMode === "dark"} colorScheme="teal"/>
        </FormControl>
      </Wrapper>
    </Layout>
  );
}

export default withApollo({ ssr: false })(Settings);