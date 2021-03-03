import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  LogBox,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  Text,
  Button,
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
import UserInfo from '../components/user_information';
import globalStyles from '../styles/global_stylesheet';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const LocationInfoScreen = (props) => {
  // so paper theme colors can be used with with non paper components
  const {colors} = useTheme();
  // for ratings components
  const fractions = 2;
  const imgSize = 32;

  const {route} = props;
  const {navigation} = props;
  const {params} = route;
  const {locationId} = params;

  const [locationData, setLocationData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [favourited, setFavourited] = useState(false);

  const onFavouriteClick = async () => {
    try {
      if (favourited) {
        await FavouriteLocation(locationId, 'DELETE');
        setFavourited(!favourited);
      } else if (!favourited) {
        await FavouriteLocation(locationId, 'POST');
        setFavourited(!favourited);
      }
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  };

  const isFavourited = useCallback(async () => {
    try {
      const userData = await UserInfo();

      const locationIdArr = userData.favourite_locations.map(
        (i) => i.location_id,
      ); // get ids of all fave locations and put in array

      if (locationIdArr.includes(locationId)) {
        setFavourited(true);
      } else {
        setFavourited(false);
      }
      setIsLoading(false);
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  }, [locationId]);

  const getLocationData = useCallback(async () => {
    try {
      const data = await LocationInfo(locationId);
      setLocationData(data);
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  }, [locationId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      getLocationData();
      isFavourited();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFavourited, getLocationData, navigation]);

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
        <View style={styles.locationView}>
          <View
            style={[
              styles.infoView,
              {backgroundColor: colors.primary, borderColor: colors.text},
            ]}>
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
                      params: {locationId},
                    })
                  }>
                  <Icon name="plus" size={40} color={colors.text} />
                </Button>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.ratingView,
              {backgroundColor: colors.primary, borderColor: colors.text},
            ]}>
            <View style={globalStyles.flexContainer}>
              <Subheading style={styles.subHeading}>Overall Rating</Subheading>

              <Rating
                style={styles.rating}
                fractions={fractions}
                readonly
                startingValue={locationData.avg_overall_rating}
                tintColor={colors.primary}
                imageSize={imgSize}
              />

              <Subheading style={styles.subHeading}>Price Rating</Subheading>
              <Rating
                style={styles.rating}
                fractions={fractions}
                readonly
                startingValue={locationData.avg_price_rating}
                tintColor={colors.primary}
                imageSize={imgSize}
              />
            </View>
            <View style={globalStyles.flexContainer}>
              <Subheading style={styles.subHeading}>Quality Rating</Subheading>
              <Rating
                style={styles.rating}
                fractions={fractions}
                readonly
                startingValue={locationData.avg_quality_rating}
                tintColor={colors.primary}
                imageSize={imgSize}
              />

              <Subheading style={styles.subHeading}>
                Clenliness Rating
              </Subheading>
              <Rating
                style={styles.rating}
                fractions={fractions}
                readonly
                startingValue={locationData.avg_clenliness_rating}
                tintColor={colors.primary}
                imageSize={imgSize}
              />
            </View>
          </View>
          <View
            style={[
              styles.listView,
              {backgroundColor: colors.primary, borderColor: colors.text},
            ]}>
            <Title style={styles.reviewsTitle}>Reviews</Title>
            <FlatList
              scrollEnabled={false}
              data={locationData.location_reviews}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor: colors.accent,
                        borderColor: colors.text,
                      },
                      globalStyles.reviewOpacity,
                    ]}
                    onPress={() =>
                      props.navigation.navigate('homeStackNavigator', {
                        screen: 'Review Info',
                        params: {reviewData: item, locationId},
                      })
                    }>
                    <Rating
                      fractions={fractions}
                      readonly
                      startingValue={item.overall_rating}
                      tintColor={colors.accent}
                      imageSize={imgSize}
                    />
                    <Text style={globalStyles.reviewBody}>
                      {item.review_body}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.review_id.toString()}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

LocationInfoScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      locationId: PropTypes.number,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  avatarView: {
    flex: 1,
    marginLeft: '4%',
  },

  buttonView: {
    flexDirection: 'row',
    marginTop: '25%',
  },

  button: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  infoTextView: {
    flexDirection: 'column',
    marginLeft: '7%',
    marginTop: '5%',
  },

  infoView: {
    flexDirection: 'row',
    marginBottom: '4%',
    paddingTop: '4%',
    marginTop: '1%',
    paddingBottom: '4%',
    borderWidth: 3,
    borderRadius: 20,
  },

  listView: {
    borderWidth: 3,
    borderRadius: 20,
  },

  locationView: {
    margin: '3%',
    paddingBottom: '23%',
  },

  subHeading: {
    textAlign: 'center',
    marginBottom: '5%',
  },

  reviewsTitle: {
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },

  accordion: {
    marginTop: '5%',
  },

  ratingView: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 3,
    paddingTop: '3%',
    borderRadius: 20,
    marginBottom: '4%',
  },

  rating: {
    marginBottom: '10%',
  },
});

export default LocationInfoScreen;
