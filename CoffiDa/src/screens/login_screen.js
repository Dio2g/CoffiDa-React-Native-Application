import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useHeaderHeight} from '@react-navigation/stack';
import Login from '../components/login';
import styles from '../styles/stylesheet';

const LoginScreen = (props) => {
  const windowHeight = Dimensions.get('window').height - useHeaderHeight();

  // hard coded login details for quick testing
  const [email, setEmail] = useState('fake@mail.com');
  const [password, setPassword] = useState('hello123');

  return (
    <ScrollView
      style={styles.flexContainer}
      contentContainerStyle={styles.scrollView}>
      <View style={{width: '100%', height: windowHeight}}>
        <View style={styles.loginViewOne}>
          <TextInput
            style={styles.textInputLoginFirst}
            type="outlined"
            label="Email"
            placeholder="Enter your email..."
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInputLogin}
            type="outlined"
            label="Password"
            placeholder="Enter your password..."
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>
        <View style={styles.loginViewTwo}>
          <Button
            mode="contained"
            onPress={() => Login(props, email, password)}
            style={styles.loginButton}
            contentStyle={styles.loginButtonContent}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
