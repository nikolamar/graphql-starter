import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, ReactChild, useMemo } from "react";
import Footer from "./footer";
import Meta from "./meta";
import { NavBar } from "./nav-bar";

interface LayoutProps {
  children: ReactChild;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Meta/>
      <NavBar />
      {children}
      <Footer/>
    </Box>
  );
};
