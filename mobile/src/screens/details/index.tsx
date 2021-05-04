import {useTheme} from '@react-navigation/native';
import React, {FC} from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import {HomeProps} from '../../types';
import {styles} from './styles';
import {FormButton} from '../../components/form-button';

export const Details: FC<HomeProps> = ({navigation}) => {
  const {colors, dark} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={[styles.screenTitle, {color: colors.text}]}>
          Details Screen
        </Text>
      </View>
      <FormButton onPress={() => navigation.navigate('Home')}>Home</FormButton>
    </SafeAreaView>
  );
};
