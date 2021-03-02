import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LikeReview = async (locationId, reviewId, method) => {
  const token = await AsyncStorage.getItem('@session_token');

  // eslint-disable-next-line no-undef
  return fetch(
    `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/like`,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    },
  )
    .then((response) => {
      if (response.status === 200) {
        if (method === 'POST') {
          ToastAndroid.show('Liked Review', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Un-Liked Review', ToastAndroid.SHORT);
        }
      }
      if (response.status === 400) {
        throw new Error('Bad request');
      }
      if (response.status === 401) {
        throw new Error('Not Unauthorised');
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

export default LikeReview;
