import {
  Box,
  Button,
  Select,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { InputField } from "../components/input-field";
import { Wrapper } from "../components/wrapper";
import countriesData from "../countries-data";
import * as schemas from "../yup-schemas";

export const LoginWithPhoneNumber = () => {
  const [regionIdx, setRegionIdx] = useState(0);
  const { colorMode } = useColorMode();
  const color = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const region = navigator.language.split("-")[1];
    const idx = countriesData
      .map((region) => region.countryCode)
      .indexOf(region);
    if (idx) {
      setRegionIdx(idx);
    }
  }, []);

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
            validationSchema={schemas.phoneLogin}
            initialValues={{ usernameoremail: "", password: "" }}
            onSubmit={() => {}}
          >
            {({ isSubmitting }) => (
              <Form>
                <Select
                  placeholder="country / region"
                  spellCheck={false}
                  value={regionIdx}
                  onChange={(e) => setRegionIdx(parseInt(e.target.value))}
                >
                  {countriesData.map((country, idx) => (
                    <option
                      key={country.countryCode}
                      value={idx}
                    >{`${country.countryNameEn} (+${country.countryCallingCode})`}</option>
                  ))}
                </Select>
                <Box mt={4} />
                <InputField
                  name="phonenumber"
                  placeholder="phone number"
                  label="Phone number"
                  type="string"
                  spellCheck={false}
                />
                <Button
                  mt={4}
                  isFullWidth={true}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  Login
                </Button>
                <Button
                  mt={4}
                  isFullWidth={true}
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                >
                  Facebook
                </Button>
                <Button
                  mt={4}
                  isFullWidth={true}
                  colorScheme="twitter"
                  leftIcon={<FaTwitter />}
                >
                  Twitter
                </Button>
                <Button
                  mt={4}
                  isFullWidth={true}
                  colorScheme="red"
                  leftIcon={<FaGoogle />}
                >
                  Google
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Box>
  );
};
