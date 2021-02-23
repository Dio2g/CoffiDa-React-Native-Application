import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import globalStyles from '../styles/global_stylesheet';

const WelcomeScreen = (props) => (
  <View style={globalStyles.flexContainer}>
    <View style={styles.viewOne}>
      <Button
        contentStyle={styles.buttonContent}
        style={styles.button}
        mode="contained"
        onPress={() => props.navigation.navigate('Login')}>
        {' '}
        <Text>Login</Text>{' '}
      </Button>
    </View>
    <View style={styles.viewTwo}>
      <Button
        contentStyle={styles.buttonContent}
        style={styles.button}
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

const styles = StyleSheet.create({
  viewOne: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  viewTwo: {
    flex: 1,
    justifyContent: 'flex-start',
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

export default WelcomeScreen;
