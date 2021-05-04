import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  Home: undefined;
  Settings: undefined;
  Details: undefined;
};

export type SplashProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

export type SignInProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
};

export type SignUpProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

export type MainTabsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'MainTabs'>;
};

export type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export type SettingsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Settings'>;
};

export type DetailsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
};

export type ListItemType = {
  title: string;
  icon: string;
};
