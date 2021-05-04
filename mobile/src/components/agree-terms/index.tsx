import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

export const AgreeTerms: FC<{}> = () => (
  <View style={styles.textPrivate}>
    <Text style={styles.colorTextPrivate}>By signing up you agree to our</Text>
    <Text style={[styles.colorTextPrivate, {fontWeight: 'bold'}]}>
      Terms of service
    </Text>
    <Text style={styles.colorTextPrivate}> and </Text>
    <Text style={[styles.colorTextPrivate, {fontWeight: 'bold'}]}>
      Privacy policy
    </Text>
  </View>
);
