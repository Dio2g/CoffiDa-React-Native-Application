import { ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const locationInfo = async (id) => {
  const token = await AsyncStorage.getItem('@session_token');

  // eslint-disable-next-line no-undef
  const locationData = fetch(`http://10.0.2.2:3333/api/1.0.0/location/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      if (response.status === 401) {
        throw new Error('Unauthorised')
      }      if (response.status === 404) {
        throw new Error('Not Found')
      }
      if (response.status === 500) {
        throw new Error('Server Error')
      } else {
        throw new Error('Something went wrong')
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    })

  return locationData
}

export default locationInfo
