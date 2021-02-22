import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import welcomeScreen from '../screens/welcome_screen';
import loginScreen from '../screens/login_screen';
import signupScreen from '../screens/signup_screen';

const Stack = createStackNavigator();

const WelcomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Welcome' component={welcomeScreen} />
      <Stack.Screen name='Login' component={loginScreen} />
      <Stack.Screen name='Signup' component={signupScreen} />
    </Stack.Navigator>
  );
};

export default WelcomeNavigator;
