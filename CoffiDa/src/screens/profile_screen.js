import * as React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import Logout from '../components/logout';
import styles from '../styles/stylesheet';

const ProfileScreen = (props) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.profileViewOne}>
        <Button
          contentStyle={styles.profileButtonContent}
          style={styles.profileButton}
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
      <View style={styles.profileViewTwo}>
        <Button
          contentStyle={styles.profileButtonContent}
          style={styles.profileButton}
          mode="contained"
          onPress={() => Logout(props)}>
          {' '}
          <Text>Logout</Text>{' '}
        </Button>
      </View>
    </View>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileScreen;
