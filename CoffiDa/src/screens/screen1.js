import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';



class ScreenOne extends Component{
  static navigationOptions = {
    header: null
  }
  render(){
	const nav = this.props.navigation;
    return(
        <View>
          <Text>Screen One</Text>
		  <Button onPress={() => nav.navigate('ScreenTwo')} title="Screen 2" />
		  <Button onPress={() => nav.navigate('ScreenThree')} title="Screen 3" />
        </View>
    );
  }
}

export default ScreenOne;
