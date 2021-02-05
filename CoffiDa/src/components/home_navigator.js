import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import PropTypes from 'prop-types'
import homeScreen from './home_screen'
import nearbyScreen from './nearby_screen'
import reviewsScreen from './reviews_screen'
import profileScreen from './profile_screen'


const Tab = createMaterialBottomTabNavigator();

const HomeNavigator = (props) => {

  const checkLoggedIn = async () => {
    try {
      console.log("value: ")
      const value = await AsyncStorage.getItem('@session_token');
      console.log(value)

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
      // Call any action
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
        name='homeScreen'
        component={homeScreen}
        options={{
          tabBarIcon: 'home'
        }}
      />
      <Tab.Screen
        name='nearbyScreen'
        component={nearbyScreen}
        options={{
          tabBarIcon: 'map-marker'
        }}
      />
      <Tab.Screen
        name='reviewsScreen'
        component={reviewsScreen}
        options={{
          tabBarIcon: 'star-outline'
        }}
      />
      <Tab.Screen
        name='profileScreen'
        component={profileScreen}
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
