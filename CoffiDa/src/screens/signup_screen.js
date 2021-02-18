import React, { useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text, TextInput } from 'react-native-paper';
import Signup from '../components/signup'
import styles from '../styles/stylesheet'

const SignupScreen = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.flexContainer}>
      <View style={styles.signupViewOne}>
        <TextInput
          type='outlined'
          label="First Name"
          placeholder="Enter your first name..."
          onChangeText={value => setFirstName(value)}
          value={firstName}
        />
        <TextInput
          type='outlined'
          label="Last Name"
          placeholder="Enter your last name..."
          onChangeText={value => setLastName(value)}
          value={lastName}
        />
        <TextInput
          type='outlined'
          label="Email"
          placeholder="Enter your email..."
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <TextInput
          type='outlined'
          label="Password"
          placeholder="Enter your password..."
          onChangeText={value => setPassword(value)}
          value={password}
        />
      </View>
      <View style={styles.signupViewTwo}>
        <Button
          style={styles.signupButton}
          contentStyle={styles.signupButtonContent}
          mode="contained"
          onPress={() => Signup(props, firstName, lastName, email, password)}>
          <Text>Create Account</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

export default SignupScreen
