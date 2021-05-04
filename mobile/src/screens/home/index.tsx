import {useTheme} from '@react-navigation/native';
import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {HomeProps} from '../../types';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from '../../components/card';

export const Home: FC<HomeProps> = () => {
  const {dark} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <Card source={require('../../../assets/image01.jpg')} />
    </SafeAreaView>
  );
};
