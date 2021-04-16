import { Box, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import { AccessibleLink } from "../components/accessible-link";
import { InputField } from "../components/input-field";
import { Wrapper } from "../components/wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/to-error-map";
import { withApollo } from "../utils/with-apollo";
import * as schemas from "../yup-schemas";

const Register: FC<{}> = ({}) => {
  const router = useRouter();
  const [register, { loading }] = useRegisterMutation();
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
        <Box
          bgColor={color}
          padding="5"
          borderRadius="10px"
          shadow="2xl"
          w="100%"
        >
          <Formik
            validateOnBlur={false}
            validationSchema={schemas.registerStep1}
            initialValues={{ username: "", password: "", email: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: { ...values },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.register.user,
                    },
                  });
                },
              });
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else if (response.data?.register.user) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form-flex">
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                  spellCheck={false}
                />
                <Box mt={4} />
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  spellCheck={false}
                />
                <Box mt={4} />
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
                  Register
                </Button>
                <Box mt={2} textAlign="center">
                  <AccessibleLink href="/login">
                    Already have an account?
                  </AccessibleLink>
                </Box>
                <Box mt={2} textAlign="center" fontSize={10}>
                  By registering or logging in, you agree to the OfferUp{" "}
                  <AccessibleLink href="/">Terms of Services</AccessibleLink>{" "}
                  and <AccessibleLink href="/">Privacy Policy</AccessibleLink>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Box>
  );
};

export default withApollo({ ssr: false })(Register);
