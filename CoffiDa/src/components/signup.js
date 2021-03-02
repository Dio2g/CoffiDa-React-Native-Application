import {ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';

const Signup = (props, details) =>
  // eslint-disable-next-line no-undef
  fetch('http://10.0.2.2:3333/api/1.0.0/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: details.firstName,
      last_name: details.lastName,
      email: details.email,
      password: details.password,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        ToastAndroid.show(
          'Account created, please log in.',
          ToastAndroid.SHORT,
        );
        props.navigation.navigate('Welcome');
      }
      if (response.status === 400) {
        throw new Error('Failed Validation - Please enter valid information.');
      }
      if (response.status === 500) {
        throw new Error('Server Error.');
      } else if (response.status !== 201) {
        throw new Error('Unexpected Error.');
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Signup;
