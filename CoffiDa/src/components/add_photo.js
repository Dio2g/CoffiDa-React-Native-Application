import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPhoto = async (locationId, reviewId, image) => {
  const token = await AsyncStorage.getItem('@session_token');
  // TODO: Validation

  // eslint-disable-next-line no-undef
  return fetch(
    `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/photo`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': token,
      },
      body: image,
    },
  )
    .then((response) => {
      if (response.status === 200) {
        ToastAndroid.show('Photo Added!', ToastAndroid.SHORT);
      }
      if (response.status === 400) {
        throw new Error('Failed Validation');
      }
      if (response.status === 401) {
        throw new Error('Unauthorised');
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

export default AddPhoto;
