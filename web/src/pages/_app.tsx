import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { FC } from "react";
import { customTheme } from "../styles/custom-theme";
import "../styles/globals.css";

interface MyAppProps {
  Component: any;
  pageProps: any;
}

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
