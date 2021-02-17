import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, ReactChild, useMemo } from "react";
import Footer from "./footer";
import Meta from "./meta";
import { NavBar } from "./nav-bar";

const routesWithoutNavBar = new Set([
  "/register",
  "/login",
  "/forgot-password",
  "/change-password/[token]",
]);

interface LayoutProps {
  children: ReactChild;
}

const Layout: FC<LayoutProps> = ({ children }) => {

  const router = useRouter();
  const isFooterHeaderVisible = useMemo(() => !routesWithoutNavBar.has(router.pathname), [router.pathname]);

  return (
    <Box>
      <Meta/>
      {isFooterHeaderVisible ? <NavBar /> : null}
      {children}
      <Footer/>
    </Box>
  );
};

export default Layout;
