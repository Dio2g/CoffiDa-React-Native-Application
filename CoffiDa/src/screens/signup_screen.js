import React, {useState} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/stack';
import Signup from '../components/signup';
import styles from '../styles/stylesheet';

const SignupScreen = (props) => {
  const windowHeight = Dimensions.get('window').height - useHeaderHeight();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView
      style={styles.flexContainer}
      contentContainerStyle={styles.scrollView}>
      <View style={{width: '100%', height: windowHeight}}>
        <View style={styles.formViewOne}>
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
        <View style={styles.formViewTwo}>
          <Button
            style={styles.formButton}
            contentStyle={styles.formButtonContent}
            mode="contained"
            onPress={() => Signup(props, firstName, lastName, email, password)}>
            <Text>Create Account</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
