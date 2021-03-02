import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  Button,
  List,
  ActivityIndicator,
  Avatar,
  useTheme,
  Title,
  Subheading,
} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationInfo from '../components/location_information';
import FavouriteLocation from '../components/favourite_location';
import FindLocations from '../components/find_locations';
import globalStyles from '../styles/global_stylesheet';

const LocationInfoScreen = (props) => {
  // so paper theme colors can be used with with non paper components
  const {colors} = useTheme();

  const {route} = props;

  const {navigation} = props;
  const {params} = route;
  const {id} = params;

  const [locationData, setLocationData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    async function getUserData() {
      const data = await LocationInfo(id);
      setLocationData(data);
    }

    getUserData();
    isFavourited();
  }, [id, isFavourited]);

  // console.log(locationData);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View style={globalStyles.flexContainer}>
      <View style={styles.infoView}>
        <View style={styles.avatarView}>
          <Avatar.Image
            style={[
              globalStyles.imgView,
              {
                borderColor: colors.text,
                backgroundColor: colors.accent,
              },
            ]}
            size={180}
            source={{uri: locationData.photo_path}}
          />
        </View>
        <View style={globalStyles.flexContainer}>
          <View style={styles.infoTextView}>
            <Title>{locationData.location_name}</Title>
            <Subheading>{locationData.location_town}</Subheading>
          </View>
          <View style={styles.buttonView}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={onFavouriteClick}>
              <Icon
                name={favourited ? 'heart' : 'heart-outline'}
                size={40}
                color="red"
              />
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() =>
                navigation.navigate('homeStackNavigator', {
                  screen: 'Add Review',
                  params: {id},
                })
              }>
              <Icon name="plus" size={40} color={colors.text} />
            </Button>
          </View>
        </View>
      </View>
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

const styles = StyleSheet.create({
  avatarView: {
    flex: 1,
    marginLeft: '3%',
  },
  buttonView: {
    flexDirection: 'row',
    marginTop: '15%',
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  infoTextView: {
    flexDirection: 'column',
    marginLeft: '9%',
    marginTop: '5%',
  },
  infoView: {
    flexDirection: 'row',
    marginTop: '5%',
  },
});

export default LocationInfoScreen;
