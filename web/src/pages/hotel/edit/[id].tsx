import { Box, Button, IconButton, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { InputField } from "../../../components/input-field";
import { InputNumField } from "../../../components/input-num-field";
import { InputNumSliderField } from "../../../components/input-num-slider-field";
import { PickFileButton } from "../../../components/pick-file-button";
import { Thumb } from "../../../components/thumb";
import { Wrapper } from '../../../components/wrapper';
import { config } from "../../../config";
import { useImageUploadMutation, useUpdateHotelMutation } from "../../../generated/graphql";
import { isImage } from "../../../utils/is-image";
import { useGetHotelFromUrl } from "../../../utils/use-get-hotel-from-url";
import { useIsAuthenticated } from "../../../utils/use-is-authenticated";
import { withApollo } from "../../../utils/with-apollo";
import * as schemas from "../../../yup-schemas";

const EditHotel: FC<{}> = ({}) => {

  useIsAuthenticated();
  const [updateHotel, { loading }] = useUpdateHotelMutation();
  const { data } = useGetHotelFromUrl();
  const router = useRouter();
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
  
  if (!data) {
    return <Wrapper minHeight="100vh" />;
  }

  return (
    <Wrapper minHeight="100vh">
      <Formik
        validateOnBlur={false}
        validationSchema={schemas.hotel}
        initialValues={{
          name: data?.hotel?.name,
          city: data?.hotel?.city,
          country: data?.hotel?.country,
          description: data?.hotel?.description,
          image: data?.hotel?.image,
          location: data?.hotel?.location,
          stars: data?.hotel?.stars,
          price: data?.hotel?.price
        }}
        onSubmit={async (values) => {
          if (!data?.hotel?.id) {
            return;
          }

          let hotelVariables = { id: data?.hotel?.id, ...values as any };

          if (image) {
            const response = await imageUpload({ variables: { file: image } });
            hotelVariables.image = response.data?.imageUpload.url as string;
          }

          const response = await updateHotel({ variables: hotelVariables });
          
          if (response.errors) {
            toast({
              title: "Hotel has not been updated.",
              description: `We've couldn't update hotel data due to the error: ${response.errors}`,
              status: "error",
              duration: config.defaultToastDuration,
              isClosable: true,
              position: "top-right"
            });
          }

          if (response.data?.updateHotel?.id) {
            router.back();
            toast({
              title: "Hotel updated.",
              description: "We've successfully updated hotel data.",
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
              name="name"
              placeholder="name"
              label="Name"
              spellCheck={false}
            />
            <Box mt={4}/>
            <InputField
              name="city"
              placeholder="city"
              label="City"
              spellCheck={false}
            />
            <Box mt={4}/>
            <InputField
              name="country"
              placeholder="country"
              label="Country"
              spellCheck={false}
            />
            <Box mt={4}/>
            <InputField
              textarea
              name="description"
              placeholder="description"
              label="Description"
              spellCheck={false}
            />
            <Box mt={4}/>
            <InputField
              name="image"
              placeholder={image ? image.name : "image"}
              label="Pick image or add url"
              spellCheck={false}
              disabled={image}
            >
              <PickFileButton onChange={handlePickImage}/>
              {!image ? null : (
                <IconButton
                  aria-label="delete hotel"
                  icon={<RiDeleteBinLine/>}
                  onClick={handleRemoveImage}
                  colorScheme="red"
                />)}
            </InputField>
            <Box display="flex" justifyContent="center">
              <Thumb file={image} />
            </Box>
            <Box mt={4}/>
            <InputField
              name="location"
              placeholder="location"
              label="Location"
              spellCheck={false}
            />
              <Box mt={4}/>
            <InputNumSliderField
              name="stars"
              placeholder="stars"
              label="Stars"
              min={0}
              max={5}
              step={1}
            />
            <Box mt={4}/>
            <InputNumField
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
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(EditHotel);