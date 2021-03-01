import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {Alert, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import globalStyles from '../styles/global_stylesheet';

const NearbyScreen = () => {
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // on component load
  useEffect(() => {
    const findCoordinates = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const location = position;
          setCurrentLocation({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          });
          setIsLoading(false);
        },
        (error) => {
          Alert.alert(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    findCoordinates();
  }, []);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1, height: '100%', width: '100%', position: 'absolute'}}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}>
        <Marker
          coordinate={currentLocation}
          title="My Location"
          description="Here I am"
        />
      </MapView>
    </View>
  );
};

export default NearbyScreen;
