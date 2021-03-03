import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddReview = async (props, parameters) => {
  const token = await AsyncStorage.getItem('@session_token');
  // eslint-disable-next-line no-undef
  return fetch(
    `http://10.0.2.2:3333/api/1.0.0/location/${parameters.locationId}/review/${parameters.reviewId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({
        overall_rating: parameters.overallRating,
        price_rating: parameters.priceRating,
        quality_rating: parameters.qualityRating,
        clenliness_rating: parameters.clenlinessRating,
        review_body: parameters.reviewBody,
      }),
    },
  )
    .then((response) => {
      if (response.status === 201) {
        ToastAndroid.show('Review Updated!', ToastAndroid.SHORT);
      }
      if (response.status === 400) {
        throw new Error('Failed Validation - Please enter valid information.');
      }
      if (response.status === 401) {
        props.navigation.navigate('Welcome');
        throw new Error('You are not logged in - redirecting...');
      }
      if (response.status === 404) {
        throw new Error('Not Found.');
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
};

export default AddReview;
