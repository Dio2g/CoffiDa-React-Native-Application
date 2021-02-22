import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const UpdateDetails = async (props, firstName, lastName, email, password) => {

  // TODO: Validation
  const token = await AsyncStorage.getItem('@session_token');
  const id = await AsyncStorage.getItem('@user_id');
  const address = `http://10.0.2.2:3333/api/1.0.0/user/${id}`;

  // different content for body depending on if they enter new password or not
  let bodyContent;
  if (password === "" || password === null) {
    bodyContent = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email
    });
  } else {
    bodyContent = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      password
    });
  }

  // eslint-disable-next-line no-undef
  return fetch(address, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    body: bodyContent
  })
    .then((response) => {
      if (response.status === 200) {
        ToastAndroid.show("Details Updated!", ToastAndroid.SHORT);
        props.navigation.navigate('homeNavigator');
      }
      if (response.status === 400) {
        throw new Error('Failed Validation');
      }
      if (response.status === 401) {
        throw new Error('Unauthorised');
      }
      if (response.status === 403) {
        throw new Error('Forbidden');
      }
      if (response.status === 404) {
        throw new Error('Not Found');
      }
      if (response.status === 500) {
        throw new Error('Server Error');
      } else if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });
};

UpdateDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default UpdateDetails;
