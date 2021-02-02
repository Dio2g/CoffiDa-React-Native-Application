import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';



class WelcomeScreen extends Component{
  render(){
	const nav = this.props.navigation;
    return(
        <View>
          <Text>Welcome Screen</Text>
		      <Button onPress={() => nav.navigate('LoginScreen')} title="Login" />
		      <Button onPress={() => nav.navigate('SignupScreen')} title="Sign Up" />
        </View>
    );
  }
}

export default WelcomeScreen;
