import { Box, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { AccessibleLink } from '../components/accessible-link';
import { InputField } from "../components/input-field";
import { Wrapper } from "../components/wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/to-error-map";
import { withApollo } from "../utils/with-apollo";
import * as schemas from "../yup-schemas";

const ForgotPassword: FC<{}> = ({}) => {

  const [complete, setComplete] = useState(false);
  const [forgotPassword, { loading }] = useForgotPasswordMutation();
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
            validationSchema={schemas.usernameOrEmail}
            initialValues={{ usernameoremail: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await forgotPassword({ variables: { ...values } });
              if (response.data?.forgotPassword.errors) {
                setErrors(toErrorMap(response.data.forgotPassword.errors));
              } else {
                setComplete(true);
              }
            }}
          >
            {({ isSubmitting }) => {
              if (complete) {
                return (
                  <Box mt={2} textAlign="center">
                    We sent you an email with link. Please follow the link to change your password.
                  </Box>
                );
              }
              return (
                <Form style={{flex: 1}}>
                  <InputField
                    name="usernameoremail"
                    placeholder="username or email"
                    label="Username or Email"
                    spellCheck={false}
                  />
                  <Button
                    mt={10}
                    isFullWidth={true}
                    type="submit"
                    isLoading={loading || isSubmitting}
                    colorScheme="teal"
                  >
                    Forgot password
                  </Button>
                  <Box mt={2} textAlign="center">
                    <AccessibleLink href="/login">Already changed password?</AccessibleLink>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Wrapper>
    </Box>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);