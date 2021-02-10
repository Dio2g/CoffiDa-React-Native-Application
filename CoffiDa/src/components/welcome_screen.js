import * as React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper';
import styles from './stylesheet'

const welcomeScreen = (props) => {
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

export default welcomeScreen
