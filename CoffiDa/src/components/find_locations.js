import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FindLocations = async (query, overallRating, priceRating, qualityRating, clenlinessRating, searchIn) => {
  const token = await AsyncStorage.getItem('@session_token');

  // eslint-disable-next-line no-undef
  return fetch(`http://10.0.2.2:3333/api/1.0.0/find?q=${query}&overall_rating=${overallRating}&price_rating=${priceRating}&quality_rating=${qualityRating}&clenliness_rating=${clenlinessRating}&search_in=${searchIn}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error('Bad Request');
      }
      if (response.status === 401) {
        throw new Error('Unauthorised');
      }
      if (response.status === 500) {
        throw new Error('Server Error');
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });

};

export default FindLocations;
