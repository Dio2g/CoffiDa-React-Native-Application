import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, ToastAndroid} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {AirbnbRating} from 'react-native-ratings';
import PropTypes from 'prop-types';
import {useHeaderHeight} from '@react-navigation/stack';
import AddReview from '../components/add_review';
import UserInfo from '../components/user_information';
import globalStyles from '../styles/global_stylesheet';

const AddReviewScreen = (props) => {
  // calculate window height (applied to everything inside the scrollview) so the user is able to scroll content while keyboard is visible
  const windowHeight = Dimensions.get('window').height - useHeaderHeight();

  const {route} = props;
  const {navigation} = props;
  const {params} = route;
  const {locationId} = params;

  const [overallRating, setOverallRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [clenlinessRating, setClenlinessRating] = useState(0);
  const [reviewBody, setReviewBody] = useState('');

  const [dialogVisible, setDialogVisible] = useState(false);

  const addReview = async () => {
    try {
      if (
        overallRating === 0 ||
        priceRating === 0 ||
        qualityRating === 0 ||
        clenlinessRating === 0
      ) {
        ToastAndroid.show(
          'Cannot rate any category 0 stars.',
          ToastAndroid.SHORT,
        );
      } else if (reviewBody.length > 100 || reviewBody.length < 5) {
        ToastAndroid.show(
          'Review body must be between 5 and 100 characters.',
          ToastAndroid.SHORT,
        );
      } else {
        const parameters = {
          locationId,
          overallRating,
          priceRating,
          qualityRating,
          clenlinessRating,
          reviewBody,
        };
        await AddReview(props, parameters);
        setDialogVisible(true);
      }
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  };

  const noPhoto = () => {
    setDialogVisible(false);
    props.navigation.navigate('homeStackNavigator', {
      screen: 'Location Info',
      params: {locationId},
    });
  };

  const addPhoto = async () => {
    try {
      setDialogVisible(false);

      const userData = await UserInfo();
      const locationIDs = userData.reviews.map((i) => i.location.location_id);
      const reviewIDs = userData.reviews.map((i) => i.review.review_id);
      let i;
      let index = -1;

      for (i = 0; i < locationIDs.length; i += 1) {
        if (locationIDs[i] === locationId) {
          index = i;
        }
      }

      const reviewId = reviewIDs[index];
      navigation.navigate('homeStackNavigator', {
        screen: 'Camera',
        params: {locationId, reviewId},
      });
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView>
      <View
        style={[
          globalStyles.flexContainer,
          {width: '100%', height: windowHeight},
        ]}>
        <View style={globalStyles.viewOne}>
          <Text style={styles.text}>Overall Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={overallRating}
            size={32}
            onFinishRating={setOverallRating}
          />
          <Text style={styles.text}>Price Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={priceRating}
            size={32}
            onFinishRating={setPriceRating}
          />
          <Text style={styles.text}>Quality Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={qualityRating}
            size={32}
            onFinishRating={setQualityRating}
          />
          <Text style={styles.text}>Clenliness Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={clenlinessRating}
            size={32}
            onFinishRating={setClenlinessRating}
          />
          <Text style={styles.text}>Review Text: </Text>
          <TextInput
            style={styles.reviewBodyInput}
            multiline
            numberOfLines={7}
            type="outlined"
            label="Body"
            placeholder="Enter review Body..."
            onChangeText={(value) => setReviewBody(value)}
            value={reviewBody}
          />
        </View>
        <View style={globalStyles.viewTwo}>
          <Button
            style={globalStyles.button}
            contentStyle={globalStyles.buttonContent}
            mode="contained"
            onPress={() => addReview()}>
            <Text>Add Review</Text>
          </Button>
        </View>

        <Portal>
          <Dialog visible={dialogVisible} dismissable={false}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Would you like to add a photo to your review?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => noPhoto()}>
                <Text>No</Text>
              </Button>
              <Button onPress={() => addPhoto()}>
                <Text>Yes</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </ScrollView>
  );
};

AddReviewScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      locationId: PropTypes.number,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  reviewBodyInput: {
    marginTop: '6%',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: '15%',
    marginBottom: '15%',
  },
});

export default AddReviewScreen;
