import * as React from 'react'
import { Text, View, Button } from 'react-native'

const profileScreen = (props) => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button onPress={() => props.navigation.navigate('welcomeScreen')} title='Log out' />
    </View>
  )
}

export default profileScreen
