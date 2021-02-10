import * as React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper';
import Logout from './logout'
import styles from './stylesheet'

const profileScreen = (props) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.profileViewOne}>
        <Button contentStyle={styles.profileButtonContent} style={styles.profileButton} mode="contained" onPress={() => props.navigation.navigate('Update Details')}> <Text>Update Details</Text> </Button>
      </View>
      <View style={styles.profileViewTwo}>
        <Button contentStyle={styles.profileButtonContent} style={styles.profileButton} mode="contained" onPress={() => Logout(props)}> <Text>Logout</Text> </Button>
      </View>
    </View>
  )
}

export default profileScreen
