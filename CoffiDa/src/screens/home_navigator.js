import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import homeScreen from './home_screen'
import nearbyScreen from './nearby_screen'
import reviewsScreen from './reviews_screen'
import profileScreen from './profile_screen'

const Tab = createMaterialBottomTabNavigator();

const homeNavigator = () => {
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

export default homeNavigator
