import React, { useState } from 'react'
import { ToastAndroid, Button, AsyncStorage} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'

const loginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singup = () => {
    // TODO: Validation

    // eslint-disable-next-line no-undef
    return fetch("http://10.0.2.2:3333/api/1.0.0/login", {
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
          // eslint-disable-next-line no-else-return
        } else if (response.status === 400) {
          // eslint-disable-next-line no-throw-literal
          throw 'Invalid email or password'
        } else {
          // eslint-disable-next-line no-throw-literal
          throw 'Something went wrong'
        }
      })
      .then(async (responseJson) => {
        // console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        props.navigation.navigate('homeNavigator');
      })
      .catch((error) => {
        // console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
  }

  return (
    <ScrollView>
      <TextInput
        placeholder="Enter your email..."
        onChangeText={value => setEmail(value)}
        value={email}
        style={{ padding: 5, borderWidth: 1, margin: 5 }}
      />
      <TextInput
        placeholder="Enter your password..."
        onChangeText={value => setPassword(value)}
        value={password}
        style={{ padding: 5, borderWidth: 1, margin: 5 }}
      />
      <Button
        title="Login"
        onPress={() => singup()}
      />
    </ScrollView>
  )
}

loginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default loginScreen
