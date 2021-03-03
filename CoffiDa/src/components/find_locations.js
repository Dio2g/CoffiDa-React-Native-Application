import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FindLocations = async (props, parameters) => {
  const token = await AsyncStorage.getItem('@session_token');

  // eslint-disable-next-line no-undef
  return fetch(
    `http://10.0.2.2:3333/api/1.0.0/find?q=${parameters.query}&overall_rating=${parameters.overallRating}&price_rating=${parameters.priceRating}&quality_rating=${parameters.qualityRating}&clenliness_rating=${parameters.clenlinessRating}&search_in=${parameters.searchIn}&limit=${parameters.limit}&offset=${parameters.offset}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    },
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error('Bad Request.');
      }
      if (response.status === 401) {
        props.navigation.navigate('Welcome');
        throw new Error('You are not logged in - redirecting...');
      }
      if (response.status === 500) {
        throw new Error('Server Error.');
      } else {
        throw new Error('Unexpected Error.');
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });
};

export default FindLocations;
