import React, {useState} from 'react';
import {View, ScrollView, Dimensions, ToastAndroid} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/stack';
import Signup from '../components/signup';
import globalStyles from '../styles/global_stylesheet';

const SignupScreen = (props) => {
  // calculate window height (applied to everything inside the scrollview) so the user is able to scroll content while keyboard is visible
  const windowHeight = Dimensions.get('window').height - useHeaderHeight();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    try {
      // regex for input validation
      const nameRegex = /^[a-zA-Z '.-]*$/;
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const whitespaceRegex = /^\s+$/; // to stop user from entering only whitespace in the name fields
      const passwordRegex = /^\S{5,}$/; // minimum 5 chars and no whitespace

      // check input against regex and show toast if they do not match
      if (
        !(
          firstName !== '' &&
          lastName !== '' &&
          nameRegex.test(`${firstName} ${lastName}`)
        ) ||
        whitespaceRegex.test(`${firstName}`) ||
        whitespaceRegex.test(`${lastName}`)
      ) {
        ToastAndroid.show(
          'Please enter a valid first and last name.',
          ToastAndroid.SHORT,
        );
      } else if (!(email !== '' && emailRegex.test(email))) {
        ToastAndroid.show('Please enter a valid email.', ToastAndroid.SHORT);
      } else if (!(password !== '' && passwordRegex.test(password))) {
        ToastAndroid.show('Please enter a valid password.', ToastAndroid.SHORT);
      } else {
        // if everything is valid build details parameter and make call to api
        const details = {
          firstName,
          lastName,
          email,
          password,
        };

        Signup(props, details);
      }
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView
      style={globalStyles.flexContainer}
      contentContainerStyle={globalStyles.scrollView}>
      <View style={{width: '100%', height: windowHeight}}>
        <View style={globalStyles.viewOne}>
          <TextInput
            type="outlined"
            label="First Name"
            placeholder="Enter your first name..."
            onChangeText={(value) => setFirstName(value)}
            value={firstName}
          />
          <TextInput
            type="outlined"
            label="Last Name"
            placeholder="Enter your last name..."
            onChangeText={(value) => setLastName(value)}
            value={lastName}
          />
          <TextInput
            type="outlined"
            label="Email"
            placeholder="Enter your email..."
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TextInput
            secureTextEntry
            type="outlined"
            label="Password"
            placeholder="Enter your password..."
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>
        <View style={globalStyles.viewTwo}>
          <Button
            style={globalStyles.button}
            contentStyle={globalStyles.buttonContent}
            mode="contained"
            onPress={() => onSubmit()}>
            <Text>Create Account</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
