import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useHeaderHeight} from '@react-navigation/stack';
import Login from '../components/login';
import globalStyles from '../styles/global_stylesheet';

const LoginScreen = (props) => {
  const windowHeight = Dimensions.get('window').height - useHeaderHeight();

  // hard coded login details for quick testing
  const [email, setEmail] = useState('fake@mail.com');
  const [password, setPassword] = useState('hello123');

  return (
    <ScrollView
      style={globalStyles.flexContainer}
      contentContainerStyle={globalStyles.scrollView}>
      <View style={{width: '100%', height: windowHeight}}>
        <View style={styles.viewOne}>
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
            onPress={() => Login(props, email, password)}
            style={styles.button}
            contentStyle={styles.buttonContent}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewOne: {
    flex: 3,
    justifyContent: 'space-evenly',
    padding: '5%',
  },

  viewTwo: {
    flex: 2,
    justifyContent: 'space-evenly',
  },

  button: {
    borderRadius: 20,
    height: '30%',
    margin: '7%',
  },

  buttonContent: {
    borderRadius: 20,
    height: '100%',
  },
});

export default LoginScreen;
