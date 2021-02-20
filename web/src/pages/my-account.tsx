import { Avatar, Box, Button, Divider, HStack, Text, Flex, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import { InputField } from "../components/input-field";
import { Layout } from "../components/layout";
import { Wrapper } from "../components/wrapper";
import { config } from "../config";
import { useMeQuery, useUpdateProfileMutation } from "../generated/graphql";
import { useIsAuthenticated } from "../utils/use-is-authenticated";
import { withApollo } from "../utils/with-apollo";

const MyAccount: FC<{}> = () => {

  useIsAuthenticated();
  const { data } = useMeQuery();
  const router = useRouter();
  const [updateProfile, { loading }] = useUpdateProfileMutation();
  const toast = useToast();

  if (!data) {
    return <Wrapper minHeight="100vh" />;
  }

  return (
    <Layout>
      <Wrapper minHeight="100vh">
        <Formik
          validateOnBlur={false}
          initialValues={{
            username: data?.me?.username || "",
            email: data?.me?.email || "",
            gender: data?.me?.profile.gender || "",
            firstName: data?.me?.profile.firstName || "",
            middleName: data?.me?.profile.middleName || "",
            lastName: data?.me?.profile.lastName || "",
            city: data?.me?.profile.city || "",
            country: data?.me?.profile.country || "",
            birthDate: data?.me?.profile.birthDate || "",
            phone: data?.me?.profile.phone || "",
          }}
          onSubmit={async (values) => {
            if (!data?.me?.profile?.id) {
              return;
            }

            let { email, ...rest } = values;
            let profileVariables = { id: data?.me?.profile?.id, ...rest as any };

            // if (image) {
            //   const response = await updateProfile({ variables: { file: image } });
            //   profileVariables.image = response.data?.imageUpload.url as string;
            // }

            const response = await updateProfile({ variables: profileVariables });

            console.log(response);

            if (response.errors) {
              toast({
                title: "Profile has not been updated.",
                description: `We've couldn't update your profile due to the error: ${response.errors}`,
                status: "error",
                duration: config.defaultToastDuration,
                isClosable: true,
                position: "top-right"
              });
            }

            if (response.data?.updateProfile?.id) {
              router.back();
              toast({
                title: "Profile updated.",
                description: "We've successfully updated your profile.",
                status: "success",
                duration: config.defaultToastDuration,
                isClosable: true,
                position: "top-right"
              });
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form style={{margin: "50px 0"}}>
              <HStack spacing="10">
                <Avatar name={data?.me?.profile?.fullName || undefined} src={data.me?.profile?.image?.url || undefined} width="200px" height="200px" />
                <Box>
                  <Text fontSize={45}>{values.firstName}</Text>
                  <Text fontSize={45}>{values.middleName}</Text>
                  <Text fontSize={45}>{values.lastName}</Text>
                </Box>
              </HStack>
              <Box mt={4}/>
              <Divider/>
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="firstName"
                placeholder="first name"
                label="First Name"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="middleName"
                placeholder="middle name"
                label="Middle Name"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="lastName"
                placeholder="last name"
                label="Last Name"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="username"
                placeholder="username"
                label="Username"
                disabled={true}
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="email"
                placeholder="email"
                label="Email"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="gender"
                placeholder="gender"
                label="Gender"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="city"
                placeholder="city"
                label="City"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="country"
                placeholder="country"
                label="Country"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="birthDate"
                placeholder="birth date"
                label="Birth Date"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="phone"
                placeholder="phone"
                label="Phone"
                spellCheck={false}
              />
              <Button
                mt={10}
                isFullWidth={true}
                type="submit"
                isLoading={loading || isSubmitting}
                colorScheme="teal"
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
}

export default withApollo({ ssr: false })(MyAccount);
