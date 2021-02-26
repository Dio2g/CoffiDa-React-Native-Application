import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import updateDetailsScreen from '../screens/update_details_screen';
import locationInfoScreen from '../screens/location_info_screen';
import addReviewScreen from '../screens/add_review_screen';
import cameraScreen from '../screens/camera_screen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Update Details" component={updateDetailsScreen} />
    <Stack.Screen name="Location Info" component={locationInfoScreen} />
    <Stack.Screen name="Add Review" component={addReviewScreen} />
    <Stack.Screen name="Camera" component={cameraScreen} />
  </Stack.Navigator>
);

export default HomeStackNavigator;
