import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomeScreen from './screens/welcome_screen'
import LoginScreen from './screens/login_screen'
import SignupScreen from './screens/signup_screen'
import HomeScreen from './screens/home_screen'

const Stack = createStackNavigator()

function Index () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} />
        <Stack.Screen name='HomeScreen' options={{ headerShown: false }} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Index