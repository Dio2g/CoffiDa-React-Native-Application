import {ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = async (props) => {
  // TODO: Validation
  const token = await AsyncStorage.getItem('@session_token');
  // eslint-disable-next-line no-undef
  return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        await AsyncStorage.removeItem('@session_token');
        await AsyncStorage.removeItem('@user_id');
        props.navigation.navigate('Welcome');
      }
      if (response.status === 401) {
        throw new Error('Unauthorised');
      } else if (response.status === 500) {
        throw new Error('Server error');
      } else if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });
};

Logout.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Logout;
