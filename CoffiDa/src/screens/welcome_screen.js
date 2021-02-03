import * as React from 'react'
import { Text, View, Button } from 'react-native'
import PropTypes from 'prop-types'

function welcomeScreen(props) {
  return (
    <View>
      <Text>Welcome Screen</Text>
      <Button onPress={() => props.navigation.navigate('LoginScreen')} title='Login' />
      <Button onPress={() => props.navigation.navigate('SignupScreen')} title='Sign Up' />
    </View>
  )
}

welcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default welcomeScreen
