import { Avatar, Box, Button, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { FilePicker } from "../components/file-picker";
import { InputField } from "../components/input-field";
import { Layout } from "../components/layout";
import { Thumb } from "../components/thumb";
import { Wrapper } from "../components/wrapper";
import { defaults } from "../configs/defaults";
import { useImageUploadMutation, useMeQuery, useUpdateProfileMutation } from "../generated/graphql";
import { isImage } from "../utils/is-image";
import { useIsAuthenticated } from "../utils/use-is-authenticated";
import { withApollo } from "../utils/with-apollo";

const MyAccount: FC<{}> = () => {

  useIsAuthenticated();
  const toast = useToast();
  const { data } = useMeQuery();
  const [updateProfile, { loading }] = useUpdateProfileMutation();
  const [image, setImage] = useState(null as any);
  const [imageUpload] = useImageUploadMutation();

  if (!data) {
    return <Wrapper minHeight="100vh" />;
  }

  const handlePickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    if (!isImage(e.target.files[0])) {
      alert("Pick image please");
      e.target.value = "";
      return;
    }

    setImage(e.target.files[0]);
    e.target.value = "";
  }

  const isProfileChanged = (values: any) => {
    if (
      data?.me?.profile?.firstName !== values.firstName ||
      data?.me?.profile?.middleName !== values.middleName ||
      data?.me?.profile?.lastName !== values.lastName ||
      data?.me?.profile?.gender !== values.gender ||
      data?.me?.profile?.city !== values.city ||
      data?.me?.profile?.country !== values.country ||
      data?.me?.profile?.birthDate !== values.birthDate ||
      data?.me?.profile?.phone !== values.phone ||
      image !== null
    ) {
      return false;
    }
    return true;
  }

  return (
    <Layout>
      <Wrapper minHeight="100vh">
        <HStack spacing="10">
          <Menu>
            {image ? (
                <MenuButton>
                  <Thumb file={image} w="128px" h="128px" borderRadius="64px" overflow="hidden" />
                </MenuButton>
              ) : (
                <MenuButton>
                  <Avatar name={data?.me?.profile?.fullName || undefined} src={data?.me?.profile?.image?.url || undefined} size="2xl" />
                </MenuButton>
              )}
            <div>
              <MenuList>
                <MenuItem>View Profile Picture</MenuItem>
                <MenuItem p={0}>
                  <FilePicker paddingX={3} paddingY={2} w="230px" onChange={handlePickImage}>Pick Profile Picture</FilePicker>
                </MenuItem>
              </MenuList>
            </div>
          </Menu>
          <Box>
            <Text fontSize={30}>{data?.me?.profile?.firstName}</Text>
            <Text fontSize={30}>{data?.me?.profile?.middleName}</Text>
            <Text fontSize={30}>{data?.me?.profile?.lastName}</Text>
          </Box>
        </HStack>
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

            let { email, username, ...rest } = values;
            let profileVariables = { id: data?.me?.profile?.id, ...rest as any };

            if (image) {
              const response = await imageUpload({ variables: { file: image } });
              profileVariables.image = response?.data?.imageUpload?.url;
              setImage(null);
            }

            const response = await updateProfile({ variables: profileVariables });

            if (response?.errors) {
              return toast({
                title: "Profile has not been updated.",
                description: `We've couldn't update your profile due to the error: ${response.errors}`,
                status: "error",
                duration: defaults.toastDuration,
                isClosable: true,
                position: "top-right"
              });
            }

            toast({
              title: "Profile updated.",
              description: "We've successfully updated your profile.",
              status: "success",
              duration: defaults.toastDuration,
              isClosable: true,
              position: "top-right"
            });
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="form-standard">
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
                disabled={true}
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
                disabled={isProfileChanged(values)}
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
