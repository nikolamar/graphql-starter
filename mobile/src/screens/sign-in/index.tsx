import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {FC} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FormButton} from '../../components/form-button';
import {FormInput} from '../../components/form-input';
import * as schemas from '../../schemas';
import {SignInProps} from '../../types';
import {styles} from './styles';
import {useLoginMutation} from '../../generated/graphql';

const defaults = {
  usernameoremail: 'admin@mail.com',
  password: 'admin',
};

export const SignIn: FC<SignInProps> = ({navigation}) => {
  const {colors} = useTheme();

  const [login, {loading}] = useLoginMutation();

  const handleOnSubmit = async (values: any) => {
    let response;
    try {
      response = await login({variables: {...values}});
    } catch (err) {
      console.log(err);
    }

    if (!response?.data?.login?.errors) {
      navigation.navigate('MainTabs');
      console.log('sucess');
    } else {
      console.log(response.data?.login.errors);
    }
  };

  const handleSignUpLink = () => navigation.navigate('SignUp');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome!</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={[styles.footer, {backgroundColor: colors.background}]}>
        <Formik
          validationSchema={schemas.verifySignIn}
          initialValues={defaults}
          onSubmit={handleOnSubmit}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <FormInput
                autoCapitalize="none"
                placeholder="Username or Email"
                placeholderTextColor="#666666"
                onChangeText={handleChange('usernameoremail')}
                onBlur={handleBlur('usernameoremail')}
                value={values.usernameoremail}
                icon={
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                }>
                Username or Email
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

              <TouchableOpacity>
                <Text style={{color: colors.text, marginTop: 15}}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <View style={styles.buttonGroup}>
                <FormButton onPress={handleSubmit} loading={loading}>
                  Sign In
                </FormButton>
                <FormButton outlined={true} onPress={handleSignUpLink}>
                  Sign Up
                </FormButton>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};
