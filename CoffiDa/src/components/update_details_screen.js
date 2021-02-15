import React, { useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import PropTypes from 'prop-types'
import styles from './stylesheet'


const UpdateDetails = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const editDetails = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@user_id');

    // console.log(id)
    const address = `http://10.0.2.2:3333/api/1.0.0/user/${id}`
    // TODO: Validation

    // eslint-disable-next-line no-undef
    return fetch(address, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify({
        // first_name: firstName,
        // last_name: lastName,
        email
        // password
      })
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
        if (response.status === 400) {
          throw new Error('Failed Validation')

        } else {
          throw new Error('Something went wrong')
        }
      })
      .then(async () => {
        ToastAndroid.show("Details Updated!", ToastAndroid.SHORT);
        props.navigation.navigate('homeNavigator');
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
          onPress={() => editDetails()}>
          <Text>Create Account</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

UpdateDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default UpdateDetails
