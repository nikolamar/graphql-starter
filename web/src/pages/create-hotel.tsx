import { Box, Button, HStack, IconButton, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { InputField } from "../components/input-field";
import { InputNumField } from "../components/input-num-field";
import { InputNumSliderField } from "../components/input-num-slider-field";
import { Layout } from "../components/layout";
import { PickFileButton } from "../components/pick-file-button";
import { Thumb } from "../components/thumb";
import { Wrapper } from '../components/wrapper';
import { config } from "../config";
import { useCreateHotelMutation, useImageUploadMutation } from "../generated/graphql";
import { isImage } from "../utils/is-image";
import { useIsAuthenticated } from "../utils/use-is-authenticated";
import { withApollo } from "../utils/with-apollo";
import * as schemas from "../yup-schemas";

const CreateHotel: FC<{}> = ({}) => {

  useIsAuthenticated();
  const router = useRouter();
  const [createHotel, { loading }] = useCreateHotelMutation();
  const toast = useToast();
  const [image, setImage] = useState(null as any);
  const [imageUpload] = useImageUploadMutation();

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

  const handleRemoveImage = () => {
    setImage(null);
  }

  return (
    <Layout>
      <Wrapper minHeight="100vh">
        <Formik
          validateOnBlur={false}
          validationSchema={schemas.hotel}
          initialValues={{
            name: "",
            city: "",
            country: "",
            description: "",
            image: "",
            location: "",
            stars: 0,
            price: 0
          }}
          onSubmit={async (values) => {
            let hotelVariables = { ...values };

            if (image) {
              const response = await imageUpload({ variables: { file: image } });
              hotelVariables.image = response.data?.imageUpload.url as string;
            }

            const response = await createHotel({ variables: hotelVariables , update: (cache) => {
              cache.evict({ fieldName: "hotels" });
            }});

            if (response.errors) {
              toast({
                title: "Hotel has not been created.",
                description: `We've couldn't create hotel due to the error: ${response.errors}`,
                status: "error",
                duration: config.defaultToastDuration,
                isClosable: true,
                position: "top-right"
              });
            }

            if (response.data?.createHotel?.id) {
              router.push("/");
              toast({
                title: "Hotel created.",
                description: "We've successfully created hotel.",
                status: "success",
                duration: config.defaultToastDuration,
                isClosable: true,
                position: "top-right"
              });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{margin: "50px 0"}}>
              <InputField
                layout="horizontal"
                name="name"
                placeholder="name"
                label="Name"
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
                textarea
                name="description"
                placeholder="description"
                label="Description"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="image"
                placeholder={image ? image.name : "pick image or paste url"}
                label="Pick image"
                spellCheck={false}
                disabled={image}
              >
                <HStack mr={2}>
                  <PickFileButton onChange={handlePickImage}/>
                  {!image ? null : (
                    <IconButton
                      aria-label="delete hotel"
                      icon={<RiDeleteBinLine/>}
                      onClick={handleRemoveImage}
                      colorScheme="red"
                    />)}
                </HStack>
              </InputField>
              <Box display="flex" justifyContent="center">
                <Thumb file={image} />
              </Box>
              <Box mt={4}/>
              <InputField
                layout="horizontal"
                name="location"
                placeholder="location"
                label="Location"
                spellCheck={false}
              />
              <Box mt={4}/>
              <InputNumSliderField
                layout="horizontal"
                name="stars"
                placeholder="stars"
                label="Stars"
                min={0}
                max={5}
                step={1}
              />
              <Box mt={4}/>
              <InputNumField
                layout="horizontal"
                name="price"
                placeholder="price"
                label="Price"
                min={0}
                max={5000}
                step={0.2}
              />
              <Button
                mt={10}
                isFullWidth={true}
                type="submit"
                isLoading={loading || isSubmitting}
                colorScheme="teal"
              >
                Create hotel
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateHotel);