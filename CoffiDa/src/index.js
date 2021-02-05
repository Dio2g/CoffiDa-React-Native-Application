import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import welcomeScreen from './components/welcome_screen'
import loginScreen from './components/login_screen'
import signupScreen from './components/signup_screen'
import homeNavigator from './components/home_navigator'

const Stack = createStackNavigator()

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='welcomeScreen' component={welcomeScreen} />
        <Stack.Screen name='loginScreen' component={loginScreen} />
        <Stack.Screen name='signupScreen' component={signupScreen} />
        <Stack.Screen name='homeNavigator' options={{ headerShown: false }} component={homeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Index