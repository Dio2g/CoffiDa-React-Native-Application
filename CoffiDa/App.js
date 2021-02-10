import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack'
import welcomeScreen from './src/components/welcome_screen'
import loginScreen from './src/components/login_screen'
import signupScreen from './src/components/signup_screen'
import homeNavigator from './src/components/home_navigator'
import updateDetailsScreen from './src/components/update_details_screen'

const Stack = createStackNavigator()

const DefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#E0A655',
    accent: '#997542',
    background: '#E0605E',
    text: '#FFFFFF',
    surface: '#997542',
    card: '#E0A655',
    placeholder: '#FFFFFF',
  
  },
};

export default function Main() {

  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name='Welcome' component={welcomeScreen} />
          <Stack.Screen name='Login' component={loginScreen} />
          <Stack.Screen name='Signup' component={signupScreen} />
          <Stack.Screen name='homeNavigator' options={{ headerShown: false }} component={homeNavigator} />
          <Stack.Screen name='Update Details' component={updateDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
