import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import welcomeNavigator from './src/navigators/welcome_navigator'
import homeNavigator from './src/navigators/home_navigator'
import updateDetailsScreen from './src/screens/update_details_screen'
import locationInfoScreen from './src/screens/location_info_screen'

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
    surface: '#E0A655',
    card: '#E0A655',
    placeholder: '#FFFFFF',
  
  },
};

export default function Main() {

  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name='welcomeNavigator' options={{ headerShown: false }} component={welcomeNavigator} />
          <Stack.Screen name='homeNavigator' options={{ headerShown: false }} component={homeNavigator} />
          <Stack.Screen name='Update Details' component={updateDetailsScreen} />
          <Stack.Screen name='Location Info' component={locationInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
