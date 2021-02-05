import * as React from 'react'
import { Text, View, Button } from 'react-native'

const welcomeScreen = (props) => {
  return (
    <View>
      <Text>Welcome Screen</Text>
      <Button onPress={() => props.navigation.navigate('loginScreen')} title='Login' />
      <Button onPress={() => props.navigation.navigate('signupScreen')} title='Sign Up' />
      <Button onPress={() => props.navigation.navigate('homeNavigator')} title='Home' />
    </View>
  )
}

export default welcomeScreen
