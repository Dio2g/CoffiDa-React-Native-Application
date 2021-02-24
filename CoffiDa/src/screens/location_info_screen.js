import React, {useEffect, useState, useCallback} from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationInfo from '../components/location_information';
import FavouriteLocation from '../components/favourite_location';
import FindLocations from '../components/find_locations';
import globalStyles from '../styles/global_stylesheet';

const LocationInfoScreen = (props) => {
  const {route} = props;

  const {params} = route;

  const {id} = params;

  const [locationData, setLocationData] = useState([]);

  const [favourited, setFavourited] = useState(false);

  const onFavouriteClick = async () => {
    isFavourited();
    if (favourited) {
      await FavouriteLocation(id, 'DELETE');
      setFavourited(!favourited);
    } else if (!favourited) {
      await FavouriteLocation(id, 'POST');
      setFavourited(!favourited);
    }
  };

  const isFavourited = useCallback(async () => {
    const data = await FindLocations('', '', '', '', '', 'favourite');
    const arr = data.map((i) => i.location_id);
    if (arr.includes(id)) {
      setFavourited(true);
    } else {
      setFavourited(false);
    }
  }, [id]);

  useEffect(() => {
    async function getUserData() {
      const data = await LocationInfo(id);
      setLocationData(data);
    }

    getUserData();
    isFavourited();
  }, [id, isFavourited]);

  // eslint-disable-next-line no-console
  console.log(locationData);

  return (
    <View>
      <Button mode="contained" onPress={onFavouriteClick}>
        <Icon
          name={favourited ? 'heart' : 'heart-outline'}
          size={24}
          color="red"
        />
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
