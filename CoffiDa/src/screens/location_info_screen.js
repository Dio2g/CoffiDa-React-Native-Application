import React, {useEffect, useState, useCallback} from 'react';
import {View} from 'react-native';
import {Text, Button, List} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationInfo from '../components/location_information';
import FavouriteLocation from '../components/favourite_location';
import FindLocations from '../components/find_locations';
import globalStyles from '../styles/global_stylesheet';

const LocationInfoScreen = (props) => {
  const {route} = props;

  const {navigation} = props;
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
        onPress={() =>
          navigation.navigate('homeStackNavigator', {
            screen: 'Add Review',
            params: {id},
          })
        }
        style={{height: '20%'}}
        contentStyle={globalStyles.buttonContent}>
        <Text>Add Review</Text>
      </Button>
      <List.Accordion title="Reviews">
        <FlatList
          data={locationData.location_reviews}
          renderItem={({item}) => <Text>{item.review_body}</Text>}
          keyExtractor={(item) => item.review_id.toString()}
        />
      </List.Accordion>
    </View>
  );
};

LocationInfoScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default LocationInfoScreen;
