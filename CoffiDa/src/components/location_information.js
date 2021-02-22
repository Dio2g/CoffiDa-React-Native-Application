import { ToastAndroid } from 'react-native';

const LocationInfo = async (id) => {
  
  // eslint-disable-next-line no-undef
  return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 401) {
        throw new Error('Unauthorised');
      }      if (response.status === 404) {
        throw new Error('Not Found');
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

export default LocationInfo;
