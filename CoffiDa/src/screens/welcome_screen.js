import * as React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper';
import PropTypes from 'prop-types'
import styles from '../styles/stylesheet'

const WelcomeScreen = (props) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.welcomeViewOne}>
        <Button contentStyle={styles.welcomeButtonContent} style={styles.welcomeButton} mode="contained" onPress={() => props.navigation.navigate('Login')}> <Text>Login</Text> </Button>
      </View>
      <View style={styles.welcomeViewTwo}>
        <Button contentStyle={styles.welcomeButtonContent} style={styles.welcomeButton} mode="contained" onPress={() => props.navigation.navigate('Signup')}> <Text>Signup</Text> </Button>
      </View>
    </View>
  )
}

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default WelcomeScreen
