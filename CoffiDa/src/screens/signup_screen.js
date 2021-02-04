import React, { useState } from 'react'
import { ToastAndroid, Button } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

const signupScreen = (props) => {
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
    <ScrollView>
      <TextInput
        placeholder="Enter your first name..."
        onChangeText={value => setFirstName(value)}
        value={firstName}
        style={{padding:5, borderWidth:1, margin:5}}
      />
      <TextInput
        placeholder="Enter your last name..."
        onChangeText={value => setLastName(value)}
        value={lastName}
        style={{padding:5, borderWidth:1, margin:5}}
      />
      <TextInput
        placeholder="Enter your email..."
        onChangeText={value => setEmail(value)}
        value={email}
        style={{padding:5, borderWidth:1, margin:5}}
      />
      <TextInput
        placeholder="Enter your password..."
        onChangeText={value => setPassword(value)}
        value={password}
        style={{padding:5, borderWidth:1, margin:5}}
      />
      <Button
        title="Create an account"
        onPress={() => singup()}
      />
    </ScrollView>
  )
}

export default signupScreen
