import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { FC } from "react";
import Layout from "../components/layout";
import "../styles.css";
import { customTheme } from "../styles/custom-theme";
import "../styles/globals.css";
import { client } from "../utils/with-apollo";

interface MyAppProps {
  Component: any;
  pageProps: any;
}

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={customTheme}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
