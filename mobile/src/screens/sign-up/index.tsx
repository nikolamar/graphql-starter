import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {FC} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AgreeTerms} from '../../components/agree-terms';
import {FormButton} from '../../components/form-button';
import {FormInput} from '../../components/form-input';
import {useRegisterMutation} from '../../generated/graphql';
import * as schemas from '../../schemas';
import {SignUpProps} from '../../types';
import {styles} from './styles';

const defaults = {
  username: '',
  email: '',
  password: '',
};

export const SignUp: FC<SignUpProps> = ({navigation}) => {
  const {colors} = useTheme();

  const [register, {loading}] = useRegisterMutation();

  const handleOnSubmit = async (values: any) => {
    let response;
    try {
      response = await register({variables: {...values}});
    } catch (err) {
      console.log(err);
    }

    if (response?.data?.register?.errors) {
      console.log(response.data.register.errors);
    } else {
      console.log('sucess');
    }
  };

  const handleSignInLink = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Register Now!</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={[styles.footer, {backgroundColor: colors.background}]}>
        <Formik
          validationSchema={schemas.verifySignIn}
          initialValues={defaults}
          onSubmit={handleOnSubmit}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <ScrollView>
              <FormInput
                autoCapitalize="none"
                placeholder="Username"
                placeholderTextColor="#666666"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                icon={
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                }>
                Username
              </FormInput>

              <FormInput
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor="#666666"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                icon={
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                }>
                Email
              </FormInput>

              <FormInput
                autoCapitalize="none"
                secureTextEntry={true}
                style={{marginTop: 15}}
                placeholder="Your Password"
                placeholderTextColor="#666666"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                icon={<Feather name="lock" color={colors.text} size={20} />}>
                Password
              </FormInput>

              <AgreeTerms />

              <View style={styles.buttonGroup}>
                <FormButton onPress={handleSubmit} loading={loading}>
                  Sign Up
                </FormButton>
                <FormButton outlined={true} onPress={handleSignInLink}>
                  Sign In
                </FormButton>
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};
