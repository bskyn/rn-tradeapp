import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import TradesNavigator from 'navigators/TradesNavigator/index';

import DashboardScreen from 'screens/DashboardScreen';
import AccountScreen from 'screens/AccountScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Dashboard':
              return <MaterialIcons name="dashboard" color={color} size={size} />;
            case 'TradesFlow':
              return <FontAwesome name="list" color={color} size={size} />;
            case 'Account':
              return <FontAwesome name="user" color={color} size={size} />;
          }
        },
      })}
      initialRouteName="TradesFlow"
      tabBarOptions={{
        showLabel: false,
        tabStyle: {
          backgroundColor: '#000',
          marginTop: 25,
        },
        style: {
          borderTopColor: '#000',
          backgroundColor: '#000',
        },
        activeTintColor: '#fff',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="TradesFlow" component={TradesNavigator} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
