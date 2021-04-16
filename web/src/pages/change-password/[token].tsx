import {
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { AccessibleLink } from "../../components/accessible-link";
import { InputField } from "../../components/input-field";
import { Wrapper } from "../../components/wrapper";
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/to-error-map";
import { withApollo } from "../../utils/with-apollo";
import * as schemas from "../../yup-schemas";

const ChangePassword: FC<{}> = () => {
  const router = useRouter();
  const [changePassword, { loading }] = useChangePasswordMutation();
  const [linkError, setLinkError] = useState("");
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
            validationSchema={schemas.newpassword}
            initialValues={{ newpassword: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await changePassword({
                variables: {
                  token: router.query.token as string,
                  newpassword: values.newpassword,
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.changePassword.user,
                    },
                  });
                },
              });
              if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(
                  response.data.changePassword.errors
                );
                if ("link" in errorMap) {
                  setLinkError(errorMap.link);
                }
                setErrors(errorMap);
              } else if (response.data?.changePassword.user) {
                // worked
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form-flex">
                <InputField
                  name="newpassword"
                  placeholder="new password"
                  label="New Password"
                  type="password"
                  spellCheck={false}
                />
                {linkError ? (
                  <Flex>
                    <Box mr={2} color="red">
                      {linkError}
                    </Box>
                    <AccessibleLink href="/forgot-password">
                      Click here to get a new one
                    </AccessibleLink>
                  </Flex>
                ) : null}
                <Button
                  mt={10}
                  isFullWidth={true}
                  type="submit"
                  isLoading={loading || isSubmitting}
                  colorScheme="teal"
                >
                  Change password
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Box>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
