import React, {useState, useEffect, ToastAndroid, useRef} from 'react';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';
import {
  Alert,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {getDistance} from 'geolib';
import globalStyles from '../styles/global_stylesheet';
import FindLocations from '../components/find_locations';

const NearbyScreen = (props) => {
  // so paper theme colors can be used with with non paper components
  const {colors} = useTheme();

  const {navigation} = props;

  const mapViewRef = useRef();

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [listData, setListData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // on component load
  useEffect(() => {
    const findCoordinates = () => {
      try {
        Geolocation.getCurrentPosition(
          (position) => {
            const location = position;
            setCurrentLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          },
          (error) => {
            Alert.alert(error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } catch (e) {
        // console.error(e);
        ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
      }
    };

    const getLocations = async () => {
      try {
        const data = await FindLocations(props, {
          query: '',
          overallRating: 0,
          priceRating: 0,
          qualityRating: 0,
          clenlinessRating: 0,
          searchIn: '',
          limit: 50,
          offset: 0,
        });

        // sort list data by distance to current pos
        setListData(
          data.sort((a, b) => {
            const aDist = getDistance(currentLocation, {
              lat: a.latitude,
              lon: a.longitude,
            });
            const bDist = getDistance(currentLocation, {
              latitude: b.latitude,
              longitude: b.longitude,
            });

            return aDist - bDist;
          }),
        );
      } catch (e) {
        // console.error(e);
        ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
      }
    };

    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      setIsLoading(true);
      findCoordinates();
      await getLocations();
      setIsLoading(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props, navigation, currentLocation]);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.nearbyView,
        {
          borderColor: colors.accent,
          borderBottomColor: colors.primary,
        },
        {backgroundColor: colors.accent},
      ]}>
      <View style={styles.mapView}>
        <MapView
          ref={mapViewRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          tintColor="green"
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}>
          <Marker
            coordinate={currentLocation}
            title="My Location"
            description="Here I am"
          />
          {listData.map((marker) => (
            <Marker
              key={marker.location_id} // Need to be unique
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => {
                props.navigation.navigate('homeStackNavigator', {
                  screen: 'Location Info',
                  params: {locationId: marker.location_id},
                });
              }}>
              <Icon
                style={styles.markerIcon}
                name="coffee"
                size={40}
                color={colors.background}
              />
              <Text style={{color: colors.background}}>
                {marker.location_name}
              </Text>
            </Marker>
          ))}
        </MapView>
      </View>
      <View style={globalStyles.flexContainer}>
        <Text style={styles.title}>Nearest Locations: </Text>
        <FlatList
          role="list"
          data={listData}
          renderItem={({item}) => {
            const distance = getDistance(currentLocation, {
              latitude: item.latitude,
              longitude: item.longitude,
            });
            return (
              <View role="listitem">
                <TouchableOpacity
                  style={[
                    {backgroundColor: colors.primary, borderColor: colors.text},
                    styles.touchableOpacity,
                  ]}
                  onPress={() => {
                    mapViewRef.current.animateToRegion({
                      latitude: item.latitude,
                      longitude: item.longitude,
                      latitudeDelta: 0.006,
                      longitudeDelta: 0.006,
                    });
                  }}
                  role="button">
                  <Text style={styles.text}>{item.location_name}</Text>
                  <View>
                    {distance === 2954382 ? (
                      <Text style={styles.text}>No location listed.</Text>
                    ) : (
                      <Text style={styles.text}>{distance}m away.</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </View>
    </View>
  );
};

NearbyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  markerIcon: {
    marginLeft: 31,
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  nearbyView: {
    flex: 1,
    borderWidth: 6,
  },
  mapView: {
    flex: 1.5,
  },
  touchableOpacity: {
    margin: '1%',
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    margin: '1%',
  },
  text: {
    fontSize: 15,
    margin: '1%',
  },
});

export default NearbyScreen;
