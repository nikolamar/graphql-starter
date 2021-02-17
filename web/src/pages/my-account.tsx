import { Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC } from "react";
import { InputField } from "../components/input-field";
import { Layout } from "../components/layout";
import { Wrapper } from "../components/wrapper";
import { useMeQuery } from "../generated/graphql";
import { withApollo } from "../utils/with-apollo";

const MyAccount: FC<{}> = () => {

  const { data } = useMeQuery({
    // cookie is passed even with ssr: true in create client
    // skip: isServer() // don't run on server
  });

  return (
    <Layout>
      <Wrapper minHeight="100vh">
        <Formik
          validateOnBlur={false}
          initialValues={{
            firstName: data?.me?.profile.firstName,
            middleName: data?.me?.profile.middleName,
            lastName: data?.me?.profile.lastName,
            city: data?.me?.profile.city,
            country: data?.me?.profile.country,
            birthDate: data?.me?.profile.birthDate,
            phone: data?.me?.profile.phone,
          }}
          onSubmit={() => {}}
        >
          <Form style={{margin: "50px 0"}}>
            <InputField
              layout="horizontal"
              name="firstName"
              placeholder="firstName"
              label="First Name"
              spellCheck={false}
            />
            <Box mt={4}/>
            <InputField
              layout="horizontal"
              name="middleName"
              placeholder="middleName"
              label="Middle Name"
              spellCheck={false}
            />
            <Box mt={4}/>
            <InputField
              layout="horizontal"
              name="lastName"
              placeholder="lastName"
              label="Last Name"
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
              placeholder="birthDate"
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
          </Form>
        </Formik>
      </Wrapper>
    </Layout>
  );
}

export default withApollo({ ssr: false })(MyAccount);
