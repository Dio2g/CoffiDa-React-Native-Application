import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, ToastAndroid} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Paragraph,
  Dialog,
  Portal,
  useTheme,
} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import PropTypes from 'prop-types';
import {useHeaderHeight} from '@react-navigation/stack';
import UpdateReview from '../components/update_review';
import UserInfo from '../components/user_information';
import DeletePhoto from '../components/delete_photo';
import globalStyles from '../styles/global_stylesheet';

const UpdateReviewScreen = (props) => {
  // calculate window height (applied to everything inside the scrollview) so the user is able to scroll content while keyboard is visible
  const windowHeight = Dimensions.get('window').height - useHeaderHeight();

  const {colors} = useTheme();

  const {route} = props;
  const {navigation} = props;
  const {params} = route;
  const {locationId} = params;
  const {reviewID} = params;

  const [overallRating, setOverallRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [clenlinessRating, setClenlinessRating] = useState(0);
  const [reviewBody, setReviewBody] = useState('');

  const [dialogVisible, setDialogVisible] = useState(false);

  const updateReview = async () => {
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
      } else if (reviewBody.length > 200 || reviewBody.length < 5) {
        ToastAndroid.show(
          'Review body must be between 5 and 200 characters.',
          ToastAndroid.SHORT,
        );
      } else {
        const parameters = {
          locationId,
          reviewId: reviewID,
          overallRating,
          priceRating,
          qualityRating,
          clenlinessRating,
          reviewBody,
        };
        await UpdateReview(props, parameters);
        setDialogVisible(true);
      }
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  };

  const deletePhoto = () => {
    setDialogVisible(false);
    DeletePhoto(props, locationId, reviewID);
    props.navigation.navigate('homeStackNavigator', {
      screen: 'Location Info',
      params: {locationId},
    });
  };

  const changePhoto = async () => {
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
      DeletePhoto(props, locationId, reviewId);
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
    <View
      style={globalStyles.flexContainer}
      contentContainerStyle={globalStyles.scrollView}>
      <View style={[{width: '100%', height: windowHeight}]}>
        <View
          style={[
            styles.viewOne,
            {borderColor: colors.text, backgroundColor: colors.primary},
          ]}>
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
            mode="flat"
            style={[
              styles.reviewBodyInput,
              {
                backgroundColor: colors.primary,
                borderTopColor: colors.text,
              },
            ]}
            maxLength={200}
            multiline
            numberOfLines={5}
            label="Body"
            placeholder="Enter review Body..."
            onChangeText={(value) => setReviewBody(value)}
            value={reviewBody}
            underlineColor="transparent"
          />
        </View>
        <View style={globalStyles.flexContainer}>
          <Button
            style={globalStyles.button}
            contentStyle={globalStyles.buttonContent}
            mode="contained"
            onPress={() => updateReview()}>
            <Text>Update Review</Text>
          </Button>
        </View>

        <Portal>
          <Dialog visible={dialogVisible} dismissable={false}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Would you like to delete or change your photo?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => deletePhoto()}>
                <Text>Delete</Text>
              </Button>
              <Button onPress={() => changePhoto()}>
                <Text>Change</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

UpdateReviewScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      locationId: PropTypes.number,
      reviewID: PropTypes.number,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  reviewBodyInput: {
    borderWidth: 3,
    marginTop: '3%',
    borderRadius: 30,
    borderColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    paddingBottom: '1%',
    paddingTop: '1%',
  },
  viewOne: {
    flex: 3,
    borderWidth: 3,
    margin: '5%',
    paddingTop: '2%',
    borderRadius: 30,
  },
});

export default UpdateReviewScreen;
