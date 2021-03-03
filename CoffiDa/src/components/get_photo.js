import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetPhoto = async (locationId, reviewId) => {
  const token = await AsyncStorage.getItem('@session_token');

  // eslint-disable-next-line no-undef
  return fetch(
    `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/photo`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': token,
      },
    },
  )
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      if (response.status === 404) {
        return null;
      }
      if (response.status === 500) {
        throw new Error('Server Error.');
      } else if (response.status !== 404) {
        throw new Error('Unexpected Error.');
      }
      return null;
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });
};

export default GetPhoto;
