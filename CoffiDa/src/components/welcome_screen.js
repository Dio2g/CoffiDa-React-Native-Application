import * as React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper';
import styles from './stylesheet'

const welcomeScreen = (props) => {
  return (
    <View style={styles.flexContainer}>
      <Button contentStyle={styles.buttonContent} style={styles.button} mode="contained" onPress={() => props.navigation.navigate('Login')}> <Text>Login</Text> </Button>
      <Button contentStyle={styles.buttonContent} style={styles.button} mode="contained" onPress={() => props.navigation.navigate('Signup')}> <Text>Signup</Text> </Button>
    </View>
  )
}

export default welcomeScreen
