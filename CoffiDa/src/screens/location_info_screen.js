import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  LogBox,
  TouchableOpacity,
} from 'react-native';
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
import {Rating} from 'react-native-ratings';
import LocationInfo from '../components/location_information';
import FavouriteLocation from '../components/favourite_location';
import FindLocations from '../components/find_locations';
import globalStyles from '../styles/global_stylesheet';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

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

  // console.log(locationData.location_reviews);

  useEffect(() => {
    async function getLocationData() {
      const data = await LocationInfo(id);
      setLocationData(data);
    }

    getLocationData();
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
    <ScrollView
      nestedScrollEnabled
      style={globalStyles.flexContainer}
      contentContainerStyle={globalStyles.scrollView}>
      <View style={globalStyles.flexContainer}>
        <View
          style={[
            styles.locationView,
            {backgroundColor: colors.primary, borderColor: colors.background},
          ]}>
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

          <View style={styles.ratingView}>
            <View style={globalStyles.flexContainer}>
              <Subheading style={styles.subHeading}>Overall Rating</Subheading>
              <Rating
                style={styles.rating}
                fractions={2}
                readonly
                startingValue={locationData.avg_overall_rating}
                tintColor={colors.primary}
                imageSize={30}
              />

              <Subheading style={styles.subHeading}>Price Rating</Subheading>
              <Rating
                style={styles.rating}
                fractions={2}
                readonly
                startingValue={locationData.avg_price_rating}
                tintColor={colors.primary}
                imageSize={30}
              />
            </View>
            <View style={globalStyles.flexContainer}>
              <Subheading style={styles.subHeading}>Quality Rating</Subheading>
              <Rating
                style={styles.rating}
                fractions={2}
                readonly
                startingValue={locationData.avg_quality_rating}
                tintColor={colors.primary}
                imageSize={30}
              />

              <Subheading style={styles.subHeading}>
                Clenliness Rating
              </Subheading>
              <Rating
                style={styles.rating}
                fractions={2}
                readonly
                startingValue={locationData.avg_clenliness_rating}
                tintColor={colors.primary}
                imageSize={30}
              />
            </View>
          </View>
          <List.Accordion
            theme={{colors: {primary: colors.text}}}
            title="Reviews"
            style={[styles.accordion, {backgroundColor: colors.primary}]}>
            <FlatList
              scrollEnabled={false}
              data={locationData.location_reviews}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor: colors.primary,
                        borderColor: colors.accent,
                      },
                      styles.reviewOpacity,
                    ]}
                    onPress={() =>
                      props.navigation.navigate('homeStackNavigator', {
                        screen: 'Review Info',
                        params: {reviewData: item, id},
                      })
                    }>
                    <Rating
                      fractions={2}
                      readonly
                      startingValue={item.overall_rating}
                      tintColor={colors.primary}
                      imageSize={30}
                    />
                    <Text style={styles.reviewBody}>{item.review_body}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.review_id.toString()}
            />
          </List.Accordion>
        </View>
      </View>
    </ScrollView>
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
    marginLeft: '4%',
  },

  buttonView: {
    flexDirection: 'row',
    marginTop: '15%',
    marginLeft: '1%',
  },

  button: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  infoTextView: {
    flexDirection: 'column',
    marginLeft: '10%',
    marginTop: '5%',
  },

  infoView: {
    flexDirection: 'row',
    marginBottom: '10%',
    marginRight: '4%',
  },

  locationView: {
    paddingTop: '5%',
    borderWidth: 10,
    paddingBottom: '23%',
  },

  subHeading: {
    textAlign: 'center',
    marginBottom: '5%',
  },

  reviewBody: {
    textAlign: 'center',
  },

  accordion: {
    marginTop: '5%',
  },

  ratingView: {flexDirection: 'row', flex: 1},

  rating: {
    marginBottom: '10%',
  },

  reviewOpacity: {
    padding: '10%',
    borderWidth: 3,
    borderRadius: 20,
    margin: '5%',
  },
});

export default LocationInfoScreen;
