import React, {FC, ReactNode, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import {useTheme} from '@react-navigation/native';

type FormInputProps = TextInputProps & {
  icon?: ReactNode;
  children?: string;
  secureTextEntry?: boolean;
};

export const FormInput: FC<FormInputProps> = ({
  style,
  icon,
  children,
  secureTextEntry,
  ...props
}) => {
  const {colors} = useTheme();

  const [secure, setSecure] = useState(secureTextEntry);

  let secureToggle;

  if (secureTextEntry) {
    if (secure) {
      secureToggle = <Feather name="eye-off" color="grey" size={20} />;
    } else {
      secureToggle = <Feather name="eye" color="grey" size={20} />;
    }
  }

  return (
    <View style={style}>
      {children && (
        <Text style={[styles.textFooter, {color: colors.text}]}>
          {children}
        </Text>
      )}
      <View style={styles.action}>
        {icon}
        <TextInput
          secureTextEntry={secure}
          style={[styles.textInput, {color: colors.text}]}
          {...props}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          {secureToggle}
        </TouchableOpacity>
      </View>
    </View>
  );
};
