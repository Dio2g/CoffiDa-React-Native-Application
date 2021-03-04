import * as React from 'react';
import {View} from 'react-native';
import {
  Button,
  Text,
  useTheme,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import globalStyles from '../styles/global_stylesheet';
import {Context} from '../components/context';

const WelcomeScreen = (props) => {
  const paperTheme = useTheme();

  const {toggleTheme} = React.useContext(Context);

  return (
    <View style={globalStyles.flexContainer}>
      <View style={globalStyles.twoButtonViewOne}>
        <Button
          contentStyle={globalStyles.buttonContent}
          style={globalStyles.alternativeButton}
          mode="contained"
          onPress={() => props.navigation.navigate('Login')}>
          <Text>Login</Text>
        </Button>
      </View>
      <View style={globalStyles.twoButtonViewTwo}>
        <Button
          contentStyle={globalStyles.buttonContent}
          style={globalStyles.alternativeButton}
          mode="contained"
          onPress={() => props.navigation.navigate('Signup')}>
          <Text>Signup</Text>
        </Button>
        <TouchableRipple
          onPress={() => {
            toggleTheme();
          }}>
          <View>
            <Text>Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={paperTheme.dark} />
            </View>
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WelcomeScreen;
