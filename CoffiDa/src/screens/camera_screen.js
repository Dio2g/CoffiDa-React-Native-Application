import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import PropTypes from 'prop-types';
import {useTheme} from 'react-native-paper';
import AddPhoto from '../components/add_photo';

const CameraScreen = (props) => {
  const {route} = props;
  const {params} = route;
  const {locationId} = params;
  const {reviewId} = params;
  const cameraRef = useRef(null);
  const {colors} = useTheme();

  const takePicture = async () => {
    try {
      if (cameraRef) {
        const options = {quality: 0.5, base64: true};
        const data = await cameraRef.current.takePictureAsync(options);
        await AddPhoto(props, locationId, reviewId, data);
        props.navigation.navigate('homeStackNavigator', {
          screen: 'Location Info',
          params: {locationId},
        });
      }
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
      />
      <View style={[styles.opcaityView, {backgroundColor: colors.primary}]}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  opcaityView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

CameraScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      locationId: PropTypes.number,
      reviewId: PropTypes.number,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default CameraScreen;
