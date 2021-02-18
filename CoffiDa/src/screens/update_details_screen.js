import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text, TextInput } from 'react-native-paper';
import styles from '../styles/stylesheet'
import UpdateDetails from '../components/update_details'
import UserInfo from '../components/user_information'

const UpdateDetailsScreen = (props) => {

  // const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function getUserData() {
      const userData = await UserInfo()
      setFirstName(userData.first_name)
      setLastName(userData.last_name)
      setEmail(userData.email)
    }

    getUserData();
  }, []);

  // uses same style as signup screen as it is the same inputs etc..
  return (
      <ScrollView contentContainerStyle={styles.flexContainer}>
        <View style={styles.signupViewOne}>
          <TextInput
            type='outlined'
            label="First Name"
            placeholder="Enter new first name..."
            onChangeText={value => setFirstName(value)}
            value={firstName}
          />
          <TextInput
            type='outlined'
            label="Last Name"
            placeholder="Enter new last name..."
            onChangeText={value => setLastName(value)}
            value={lastName}
          />
          <TextInput
            type='outlined'
            label="Email"
            placeholder="Enter new email..."
            onChangeText={value => setEmail(value)}
            value={email}
          />
          <TextInput
            type='outlined'
            label="Password"
            placeholder="Enter new password..."
            onChangeText={value => setPassword(value)}
            value={password}
          />
        </View>

        <View style={styles.signupViewTwo}>
          <Button
            style={styles.signupButton}
            contentStyle={styles.signupButtonContent}
            mode="contained"
            onPress={() => UpdateDetails(props, firstName, lastName, email, password)}>
            <Text>Update Details</Text>
          </Button>
        </View>
      </ScrollView>
  )
}

export default UpdateDetailsScreen
