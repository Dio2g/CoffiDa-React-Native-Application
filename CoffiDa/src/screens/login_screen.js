import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class LoginScreen extends Component{
  render(){
    const nav = this.props.navigation;
    return(
        <View>
          <Text>Login Screen</Text>
          <Button onPress={() => nav.navigate('HomeScreen')} title="SUBMIT" />
        </View>
    );
  }
}

export default LoginScreen;
