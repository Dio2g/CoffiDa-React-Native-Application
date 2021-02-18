import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import PropTypes from 'prop-types'
import HomeScreen from '../screens/home_screen'
import NearbyScreen from '../screens/nearby_screen'
import ReviewsScreen from '../screens/reviews_screen'
import ProfileScreen from '../screens/profile_screen'


const Tab = createMaterialBottomTabNavigator();

const HomeNavigator = (props) => {

  const checkLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('@session_token');

      if (value == null) {
        props.navigation.navigate('welcomeScreen');
      }
    } catch (e) {
      // handle error
    }
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      checkLoggedIn();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  });


  return (
    <Tab.Navigator
      initialRouteName='homeScreen'
      shifting
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: 'home'
        }}
      />
      <Tab.Screen
        name='Nearby'
        component={NearbyScreen}
        options={{
          tabBarIcon: 'map-marker'
        }}
      />
      <Tab.Screen
        name='Reviews'
        component={ReviewsScreen}
        options={{
          tabBarIcon: 'star-outline'
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: 'account-box-outline'
        }}
      />
    </Tab.Navigator>
  )
}

HomeNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
}

export default HomeNavigator
