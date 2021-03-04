import React, {useState, useEffect} from 'react';
import {View, Dimensions, ToastAndroid} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Text, TextInput, ActivityIndicator} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/stack';
import globalStyles from '../styles/global_stylesheet';
import UpdateDetails from '../components/update_details';
import UserInfo from '../components/user_information';

const UpdateDetailsScreen = (props) => {
  const windowHeight = Dimensions.get('window').height - useHeaderHeight();

  const [isLoading, setIsLoading] = useState(true);
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
      } else {
        // if everything is valid build details parameter and make call to api
        const details = {
          firstName,
          lastName,
          email,
          password,
        };

        // Signup(props, details);
        UpdateDetails(props, details);
      }
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await UserInfo();
      setIsLoading(false);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setEmail(userData.email);
    };

    getUserData();
  }, []);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <ScrollView
      style={globalStyles.flexContainer}
      contentContainerStyle={globalStyles.scrollView}>
      <View style={{width: '100%', height: windowHeight}}>
        <View style={globalStyles.viewOne}>
          <TextInput
            role="textbox"
            type="outlined"
            label="First Name"
            placeholder="Enter new first name..."
            onChangeText={(value) => setFirstName(value)}
            value={firstName}
          />
          <TextInput
            role="textbox"
            type="outlined"
            label="Last Name"
            placeholder="Enter new last name..."
            onChangeText={(value) => setLastName(value)}
            value={lastName}
          />
          <TextInput
            role="textbox"
            type="outlined"
            label="Email"
            placeholder="Enter new email..."
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TextInput
            role="textbox"
            secureTextEntry
            type="outlined"
            label="Password"
            placeholder="Enter new password..."
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>

        <View style={globalStyles.viewTwo}>
          <Button
            role="button"
            style={globalStyles.button}
            contentStyle={globalStyles.buttonContent}
            mode="contained"
            onPress={() => onSubmit()}>
            <Text>Update Details</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateDetailsScreen;
