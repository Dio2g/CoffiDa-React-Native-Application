import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper';
import FindLocations from '../components/find_locations'

const HomeScreen = () => {

  // const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    async function getLocations() {
       const data = await FindLocations()
      setListData(data) 
    }
    getLocations();
  }, []);
 
  return (
    <View>
      <FlatList
        data={listData}
        renderItem={({item}) => (
          <View>
            <Text>{item.location_name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.location_id.toString()}
        />
    </View>
  )
}

export default HomeScreen
