import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppearanceProvider } from 'react-native-appearance';
import { ApolloProvider } from '@apollo/react-hooks';
import { AsyncStorage } from 'react-native';

import { AuthProvider } from 'context/authContext';
import AuthContext from 'context/authContext';
import { navigationRef } from 'helpers/navigationRef';
import apolloClient from 'apollo/apolloClient';

import HomeScreen from 'screens/HomeScreen';
import SignupScreen from 'screens/SignupScreen';
import SigninScreen from 'screens/SigninScreen';
import AccountScreen from 'screens/AccountScreen';

import LoadingSpiner from 'components/LoadingSpinner';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const {
    state: { token },
    tryLocalSignin,
  } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  const [client, setClient] = useState(null);

  const fetchSession = async () => {
    const token = await AsyncStorage.getItem('token');
    const client = apolloClient(token);
    setClient(client);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  if (!client) {
    return <LoadingSpiner />;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer ref={navigationRef}>
        {token === null ? (
          <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignupModal" component={SignupScreen} />
            <Stack.Screen name="SigninModal" component={SigninScreen} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen name="Account" component={AccountScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default () => {
  return (
    <AppearanceProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppearanceProvider>
  );
};
