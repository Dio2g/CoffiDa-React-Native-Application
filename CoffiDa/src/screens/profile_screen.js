import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  Text,
  TouchableRipple,
  Switch,
  useTheme,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Logout from '../components/logout';
import globalStyles from '../styles/global_stylesheet';
import {Context} from '../components/context';

const ProfileScreen = (props) => {
  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(Context);

  return (
    <View style={globalStyles.flexContainer}>
      <TouchableRipple
        onPress={() => {
          toggleTheme();
        }}>
        <View style={styles.themeToggleView}>
          <View style={styles.textView}>
            <Text>Dark Theme</Text>
          </View>
          <View pointerEvents="none">
            <Switch value={paperTheme.dark} />
          </View>
        </View>
      </TouchableRipple>
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
};

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  themeToggleView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingVertical: '4%',
    paddingHorizontal: '4%',
  },
  textView: {
    marginTop: '0.7%',
  },
});

export default ProfileScreen;
