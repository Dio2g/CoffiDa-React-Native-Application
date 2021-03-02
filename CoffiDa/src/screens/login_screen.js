import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, ToastAndroid} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useHeaderHeight} from '@react-navigation/stack';
import Login from '../components/login';
import globalStyles from '../styles/global_stylesheet';

const LoginScreen = (props) => {
  // calculate window height (applied to everything inside the scrollview) so the user is able to scroll content while keyboard is visible
  const windowHeight = Dimensions.get('window').height - useHeaderHeight();

  // hard coded login details for quick testing
  const [email, setEmail] = useState('fake@mail.ac.uk');
  const [password, setPassword] = useState('hello123');

  const onSubmit = () => {
    try {
      // regex for input validation - same as signup regex
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex = /^\S{5,}$/; // minimum 5 chars and no whitespace

      // check input against regex and show toast if they do not match
      if (!(email !== '' && emailRegex.test(email))) {
        ToastAndroid.show('Please enter a valid email.', ToastAndroid.SHORT);
      } else if (!(password !== '' && passwordRegex.test(password))) {
        ToastAndroid.show('Please enter a valid password.', ToastAndroid.SHORT);
      } else {
        // if everything is valid build details parameter and make call to api
        const details = {
          email,
          password,
        };

        Login(props, details);
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
        <View style={styles.viewTwo}>
          <Button
            mode="contained"
            onPress={() => onSubmit()}
            style={globalStyles.alternativeButton}
            contentStyle={globalStyles.buttonContent}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewTwo: {
    flex: 2,
    justifyContent: 'space-evenly',
  },
});

export default LoginScreen;
