import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import updateDetailsScreen from '../screens/update_details_screen';
import locationInfoScreen from '../screens/location_info_screen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Update Details" component={updateDetailsScreen} />
    <Stack.Screen name="Location Info" component={locationInfoScreen} />
  </Stack.Navigator>
);

export default HomeStackNavigator;
