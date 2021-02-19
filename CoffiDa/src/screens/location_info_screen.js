import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper';
import locationInfo from '../components/location_information'

const LocationInfoScreen = (props) => {
  const { id }  = props.route.params

  useEffect(() => {
    async function getUserData() {
      const locationData = await locationInfo(id)
      console.log(locationData)
    }

    getUserData();
  }, []);
  
  console.log(id)
  return (
      <View><Text>Nice!</Text></View>
  )
}

export default LocationInfoScreen
