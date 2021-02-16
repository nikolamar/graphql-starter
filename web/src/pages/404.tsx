import { FC } from "react";
import { NotFound } from "../components/not-found";
import { Wrapper } from "../components/wrapper";

const Page404: FC<{}> = () => (
  <Wrapper minHeight="100vh">
    <NotFound>Page not Found.</NotFound>
  </Wrapper>
);

export default Page404;
