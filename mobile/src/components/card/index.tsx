import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {styles} from '../../screens/splash/styles';

type CardProps = {
  source: object;
};

export const Card: FC<CardProps> = ({source}) => {
  return (
    <View style={styles.container}>
      <Image source={source} />
    </View>
  );
};
