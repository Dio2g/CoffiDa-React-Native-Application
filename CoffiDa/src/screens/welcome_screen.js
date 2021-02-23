import * as React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../styles/stylesheet';

const WelcomeScreen = (props) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.welcomeViewOne}>
        <Button
          contentStyle={styles.welcomeButtonContent}
          style={styles.welcomeButton}
          mode="contained"
          onPress={() => props.navigation.navigate('Login')}>
          {' '}
          <Text>Login</Text>{' '}
        </Button>
      </View>
      <View style={styles.welcomeViewTwo}>
        <Button
          contentStyle={styles.welcomeButtonContent}
          style={styles.welcomeButton}
          mode="contained"
          onPress={() => props.navigation.navigate('Signup')}>
          {' '}
          <Text>Signup</Text>{' '}
        </Button>
      </View>
    </View>
  );
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },

  scrollView: {
    flexGrow: 1,
  },

  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeViewOne: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  welcomeViewTwo: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  welcomeButton: {
    borderRadius: 20,
    height: '30%',
    margin: '7%',
  },

  welcomeButtonContent: {
    borderRadius: 20,
    height: '100%',
  },
});

export default WelcomeScreen;
