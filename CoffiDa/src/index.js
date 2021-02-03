import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import welcomeScreen from './screens/welcome_screen'
import loginScreen from './screens/login_screen'
import signupScreen from './screens/signup_screen'
import homeNavigator from './screens/home_navigator'

const Stack = createStackNavigator()

function Index () {
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