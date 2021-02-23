import * as React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import globalStyles from '../styles/global_stylesheet';

const WelcomeScreen = (props) => (
  <View style={globalStyles.flexContainer}>
    <View style={globalStyles.twoButtonViewOne}>
      <Button
        contentStyle={globalStyles.buttonContent}
        style={globalStyles.alternativeButton}
        mode="contained"
        onPress={() => props.navigation.navigate('Login')}>
        {' '}
        <Text>Login</Text>{' '}
      </Button>
    </View>
    <View style={globalStyles.twoButtonViewTwo}>
      <Button
        contentStyle={globalStyles.buttonContent}
        style={globalStyles.alternativeButton}
        mode="contained"
        onPress={() => props.navigation.navigate('Signup')}>
        {' '}
        <Text>Signup</Text>{' '}
      </Button>
    </View>
  </View>
);

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WelcomeScreen;
