import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import Logout from '../components/logout';
import globalStyles from '../styles/global_stylesheet';

const ProfileScreen = (props) => (
  <View style={globalStyles.flexContainer}>
    <View style={styles.viewOne}>
      <Button
        contentStyle={styles.buttonContent}
        style={styles.button}
        mode="contained"
        onPress={() =>
          props.navigation.navigate('homeStackNavigator', {
            screen: 'Update Details',
          })
        }>
        {' '}
        <Text>Update Details</Text>{' '}
      </Button>
    </View>
    <View style={styles.viewTwo}>
      <Button
        contentStyle={styles.buttonContent}
        style={styles.button}
        mode="contained"
        onPress={() => Logout(props)}>
        {' '}
        <Text>Logout</Text>{' '}
      </Button>
    </View>
  </View>
);

ProfileScreen.propTypes = {
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

export default ProfileScreen;
