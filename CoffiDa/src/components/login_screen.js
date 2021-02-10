import React, { useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PropTypes from 'prop-types'
import styles from './stylesheet'

const LoginScreen = (props) => {
  // hard coded login details for quick testing
  const [email, setEmail] = useState("fake@mail.com");
  const [password, setPassword] = useState("hello123");

  const login = () => {
    // TODO: Validation

    // eslint-disable-next-line no-undef
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } 
        if (response.status === 400) {
          throw new Error('Invalid email or password')
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then(async (responseJson) => {
        // console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        // const value = await AsyncStorage.getItem('@session_token');
        props.navigation.navigate('homeNavigator');
      })
      .catch((error) => {

        ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
      })
  }

  return (
    <ScrollView contentContainerStyle={styles.flexContainer}>
      <View style={styles.loginViewOne}>
        <TextInput
          style={styles.textInputLoginFirst}
          type='outlined'
          label="Email"
          placeholder="Enter your email..."
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <TextInput
          style={styles.textInputLogin}
          type='outlined'
          label="Password"
          placeholder="Enter your password..."
          onChangeText={value => setPassword(value)}
          value={password}
        />
      </View>
      <View style={styles.loginViewTwo}>
        <Button
          mode="contained"
          onPress={() => login()}
          style={styles.loginButton}
          contentStyle={styles.loginButtonContent}>
          <Text>Login</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default LoginScreen
