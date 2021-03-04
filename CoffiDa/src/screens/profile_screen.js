import * as React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import Logout from '../components/logout';
import globalStyles from '../styles/global_stylesheet';

const ProfileScreen = (props) => (
  <View style={globalStyles.flexContainer}>
    <View style={globalStyles.twoButtonViewOne}>
      <Button
        contentStyle={globalStyles.buttonContent}
        style={globalStyles.alternativeButton}
        mode="contained"
        onPress={() =>
          props.navigation.navigate('homeStackNavigator', {
            screen: 'Update Details',
          })
        }>
        <Text>Update Details</Text>{' '}
      </Button>
    </View>
    <View style={globalStyles.twoButtonViewTwo}>
      <Button
        contentStyle={globalStyles.buttonContent}
        style={globalStyles.alternativeButton}
        mode="contained"
        onPress={() => Logout(props)}>
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

export default ProfileScreen;
