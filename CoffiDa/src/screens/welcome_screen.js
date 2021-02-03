import * as React from 'react'
import { Text, View, Button } from 'react-native'
import PropTypes from 'prop-types'

function welcomeScreen(props) {
  return (
    <View>
      <Text>Welcome Screen</Text>
      <Button onPress={() => props.navigation.navigate('loginScreen')} title='Login' />
      <Button onPress={() => props.navigation.navigate('signupScreen')} title='Sign Up' />
    </View>
  )
}

welcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default welcomeScreen
