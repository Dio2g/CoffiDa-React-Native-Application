import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';
import {Alert, View, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import globalStyles from '../styles/global_stylesheet';
import FindLocations from '../components/find_locations';

const NearbyScreen = (props) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  // so paper theme colors can be used with with non paper components
  const {colors} = useTheme();

  const [listData, setListData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // on component load
  useEffect(() => {
    const findCoordinates = () => {
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
    };

    const getLocations = async () => {
      const parameters = {
        query: '',
        overallRating: 0,
        priceRating: 0,
        qualityRating: 0,
        clenlinessRating: 0,
        searchIn: '',
        limit: 100,
        offset: 0,
      };
      const data = await FindLocations(props, parameters);

      setListData(data);
      setIsLoading(false);
    };

    findCoordinates();
    getLocations();
  }, [props]);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View style={[styles.nearbyView, {borderColor: colors.primary}]}>
      <MapView
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
  );
};

NearbyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  markerIcon: {
    marginLeft: 31,
  },
  text: {},
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
});

export default NearbyScreen;
