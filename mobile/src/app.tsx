import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Splash} from './screens/splash';
import {SignIn} from './screens/sign-in';
import {SignUp} from './screens/sign-up';
import {MainTabs} from './screens/maintabs';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

export const App: FC<{}> = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    dark: isDarkMode,
    colors: {
      primary: isDarkMode ? Colors.light : Colors.dark,
      background: isDarkMode ? Colors.black : Colors.white,
      card: isDarkMode ? Colors.black : Colors.white,
      border: isDarkMode ? Colors.light : Colors.dark,
      text: isDarkMode ? Colors.light : Colors.dark,
      notification: isDarkMode ? Colors.light : Colors.dark,
    },
  };

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};
