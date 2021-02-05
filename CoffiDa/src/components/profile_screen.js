import * as React from 'react'
import { Text, View, Button } from 'react-native'
import Logout from './logout'

const profileScreen = (props) => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button onPress={() => Logout(props)} title='Log out' />
    </View>
  )
}

export default profileScreen
