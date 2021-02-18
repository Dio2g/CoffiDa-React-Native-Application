import React, { useState, useEffect } from 'react'
import { ToastAndroid, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import PropTypes from 'prop-types'
import styles from '../styles/stylesheet'
import UserInfo from '../components/user_information'


const UpdateDetails = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("*********");

  useEffect(() => {
    async function getUserData() {
      const userData = await UserInfo()
      setFirstName(userData.first_name)
      setLastName(userData.last_name)
      setEmail(userData.email)
    }

    getUserData();
  }, []);

  const editDetails = async () => {
    // TODO: Validation
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@user_id');
    const address = `http://10.0.2.2:3333/api/1.0.0/user/${id}`

    // different content for body depending on if they enter new password or not
    let bodyContent
    if (password === "*********" || password === "") {
      bodyContent = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email
      })
    } else {
      bodyContent = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password
      })
    }

    // eslint-disable-next-line no-undef
    return fetch(address, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: bodyContent
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show("Details Updated!", ToastAndroid.SHORT);
          props.navigation.navigate('homeNavigator');
        }
        if (response.status === 400) {
          throw new Error('Failed Validation')

        } else if (response.status !== 200) {
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
          onPress={() => editDetails()}>
          <Text>Update Details</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

UpdateDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
}

export default UpdateDetails
