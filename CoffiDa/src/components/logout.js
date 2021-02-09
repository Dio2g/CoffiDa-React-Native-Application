import { ToastAndroid } from 'react-native'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Logout = async (props) => {
  // TODO: Validation
  const token = await AsyncStorage.getItem('@session_token');
  // eslint-disable-next-line no-undef
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        await AsyncStorage.removeItem('@session_token');
        props.navigation.navigate('Welcome');
        // eslint-disable-next-line no-else-return
      } else if (response.status === 401) {
        // eslint-disable-next-line no-throw-literal
        throw 'Not Authorized'
      } else if (response.status === 500) {
        // eslint-disable-next-line no-throw-literal
        throw 'Server error'
      } else {
        // eslint-disable-next-line no-throw-literal
        throw 'Something went wrong'
      }
    })
    .catch((error) => {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.SHORT);
    })
}

Logout.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default Logout
