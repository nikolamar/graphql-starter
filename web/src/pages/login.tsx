import {
  Box,
  Button,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import { AccessibleLink } from '../components/accessible-link';
import { InputField } from "../components/input-field";
import { Wrapper } from "../components/wrapper";
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from "../utils/to-error-map";
import { withApollo } from "../utils/with-apollo";
import * as schemas from "../yup-schemas";

const Login: FC<{}> = () => {

  const router = useRouter();
  const [login, { loading }] = useLoginMutation();
  const { colorMode } = useColorMode();
  const color = useColorModeValue("white", "gray.800");

  return (
    <Box className={`tornado-background-${colorMode}`}>
      <Wrapper
        as="main"
        variant="small"
        minHeight="100vh"
        flexDirection="row"
        alignItems="center"
        display="flex"
      >
        <Box bgColor={color} padding="5" borderRadius="10px" shadow="2xl" w="100%">
          <Formik
            validateOnBlur={false}
            validationSchema={schemas.login}
            initialValues={{ usernameoremail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({ variables: { ...values }, update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.login.user,
                  },
                });
                cache.evict({ fieldName: "hotels" });
              }});
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data?.login.errors));
              } else if (response.data?.login.user) {
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form-flex">
                <InputField
                  name="usernameoremail"
                  placeholder="username or email"
                  label="Username or email"
                  spellCheck={false}
                />
                <Box mt={4}/>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                  spellCheck={false}
                />
                <Button
                  mt={10}
                  isFullWidth={true}
                  type="submit"
                  isLoading={loading || isSubmitting}
                  colorScheme="teal"
                >
                  Login
                </Button>
                <Box textAlign="center" mt={2}>
                  <AccessibleLink href="/register">
                    Don't have an account?
                  </AccessibleLink>
                  <Text>or</Text>
                  <AccessibleLink href="/forgot-password">
                    You forgot password?
                  </AccessibleLink>
                </Box>
                <Box mt={2} textAlign="center" fontSize={10}>
                  By logging in or registering, you agree to the OfferUp <AccessibleLink href="/">Terms of Services</AccessibleLink> and <AccessibleLink href="/">Privacy Policy</AccessibleLink>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Box>
  );
}

export default withApollo({ ssr: false })(Login);