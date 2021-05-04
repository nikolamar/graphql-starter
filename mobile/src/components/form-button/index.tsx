import {useTheme} from '@react-navigation/native';
import React, {FC, ReactNode} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

type FormButtonProps = {
  loading?: boolean;
  outlined?: boolean;
  children: string | ReactNode;
  onPress: TouchableOpacityProps['onPress'];
};

export const FormButton: FC<FormButtonProps> = ({
  children,
  loading,
  outlined,
  onPress,
}) => {
  const {colors} = useTheme();

  if (outlined) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, styles.buttonOutlined]}>
        <Text style={[styles.text, {color: '#009387'}]}>
          {loading ? <ActivityIndicator size="small" /> : children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.button}>
        <Text style={[styles.text, {color: colors.text}]}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
