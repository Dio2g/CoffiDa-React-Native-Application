import 'react-native-gesture-handler';
import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import welcomeStackNavigator from './src/navigators/welcome_stack_navigator';
import homeTabNavigator from './src/navigators/home_tab_navigator';
import homeStackNavigator from './src/navigators/home_stack_navigator';

const Stack = createStackNavigator();

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

const DarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  roundness: 2,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    surface: '#BB86FC',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="welcomeStackNavigator"
            options={{headerShown: false}}
            component={welcomeStackNavigator}
          />
          <Stack.Screen
            name="homeTabNavigator"
            options={{headerShown: false}}
            component={homeTabNavigator}
          />
          <Stack.Screen
            name="homeStackNavigator"
            options={{headerShown: false}}
            component={homeStackNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
