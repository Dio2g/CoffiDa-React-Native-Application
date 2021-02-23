import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import PropTypes from 'prop-types';
import LocationInfo from '../components/location_information';
import FavouriteLocation from '../components/favourite_location';
import globalStyles from '../styles/global_stylesheet';

const LocationInfoScreen = (props) => {
  const {route} = props;

  const {params} = route;

  const {id} = params;

  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    async function getUserData() {
      const data = await LocationInfo(id);
      setLocationData(data);
    }
    getUserData();
  }, [id]);

  // console.log(locationData);

  return (
    <View>
      <Button
        mode="contained"
        style={globalStyles.button}
        contentStyle={globalStyles.buttonContent}
        onPress={() => FavouriteLocation(id, 'DELETE')}>
        <Text>Favourite</Text>
      </Button>
      <Button
        mode="contained"
        style={globalStyles.button}
        contentStyle={globalStyles.buttonContent}>
        <Text>Add Review</Text>
      </Button>
    </View>
  );
};

LocationInfoScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default LocationInfoScreen;
