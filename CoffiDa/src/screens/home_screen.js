import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Feed from './login_screen'
import Notifications from './signup_screen'

const Tab = createMaterialBottomTabNavigator()

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName='Feed'
      shifting
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name='Feed'
        component={Feed}
        options={{
          tabBarIcon: 'home-account'
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          tabBarIcon: 'bell-outline'
        }}
      />

    </Tab.Navigator>
  )
}

export default HomeScreen
