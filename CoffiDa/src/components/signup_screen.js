import React, { useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types'
import styles from './stylesheet'

const SignupScreen = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singup = () => {
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
          return response.json()
          // eslint-disable-next-line no-else-return
        } else if (response.status === 400) {
          // eslint-disable-next-line no-throw-literal
          throw 'Failed Validation'
        } else {
          // eslint-disable-next-line no-throw-literal
          throw 'Something went wrong'
        }
      })
      .then(async () => {
        // console.log("User created with ID: ", responseJson);
        props.navigation.navigate('loginScreen');
      })
      .catch((error) => {
        // console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
  }

  return (
    <View style={styles.flexContainer}>
      <ScrollView>
        <TextInput
          style={styles.textInputSignupFirst}
          type='outlined'
          label="First Name"
          placeholder="Enter your first name..."
          onChangeText={value => setFirstName(value)}
          value={firstName}
        />
        <TextInput
          style={styles.textInputSignup}
          type='outlined'
          label="Last Name"
          placeholder="Enter your last name..."
          onChangeText={value => setLastName(value)}
          value={lastName}
        />
        <TextInput
          style={styles.textInputSignup}
          type='outlined'
          label="Email"
          placeholder="Enter your email..."
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <TextInput
          style={styles.textInputSignup}
          type='outlined'
          label="Password"
          placeholder="Enter your password..."
          onChangeText={value => setPassword(value)}
          value={password}
        />

        <Button
          style={styles.signupButton}
          contentStyle={styles.buttonContent}
          mode="contained"
          onPress={() => singup()}>
          <Text>Create Account</Text>
        </Button>

      </ScrollView>
    </View>
  )
}

SignupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default SignupScreen
