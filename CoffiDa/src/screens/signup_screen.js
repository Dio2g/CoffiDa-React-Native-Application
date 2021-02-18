import React, { useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types'
import styles from '../styles/stylesheet'

const SignupScreen = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singup = async () => {
    // TODO: Validation

    // eslint-disable-next-line no-undef
    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password
      })
    })
      .then((response) => {
        if (response.status === 201) {
          ToastAndroid.show("Account created, please log in.", ToastAndroid.SHORT);
          props.navigation.navigate('Welcome');
        }
        if (response.status === 400) {
          throw new Error('Failed Validation')

        } else if (response.status !== 201) {
          throw new Error('Something went wrong')
        }
      })
      .catch((error) => {
        ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
      })
  }

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
          onPress={() => singup()}>
          <Text>Create Account</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

SignupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default SignupScreen
