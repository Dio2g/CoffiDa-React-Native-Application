import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ScrollView,
  StatusBar,
} from 'react-native';
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
import AddReview from '../components/add_review';
import UserInfo from '../components/user_information';
import globalStyles from '../styles/global_stylesheet';

const AddReviewScreen = (props) => {
  // calculate window height (applied to everything inside the scrollview) so the user is able to scroll content while keyboard is visible
  const windowHeight =
    Dimensions.get('window').height -
    useHeaderHeight() -
    StatusBar.currentHeight;

  const {colors} = useTheme();

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
      const profanitys = ['tea', 'cake', 'pastries', 'pastry'];
      const anyProfanitys = profanitys.some((word) =>
        reviewBody.toLowerCase().includes(word),
      );
      if (
        // validation
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
      } else if (anyProfanitys) {
        ToastAndroid.show(
          'No profanity! Do NOT mention tea, cakes and pastries :c',
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
      // get index of location id so the review id can be retrieved as they will ahve the same index
      for (i = 0; i < locationIDs.length; i += 1) {
        if (locationIDs[i] === locationId) {
          index = i;
        }
      }

      const reviewId = reviewIDs[index]; // retrieve review ID so that a photo can be added
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
    <ScrollView
      style={globalStyles.flexContainer}
      contentContainerStyle={globalStyles.scrollView}>
      <View style={[{width: '100%', height: windowHeight}]}>
        <View
          style={[
            styles.viewOne,
            {borderColor: colors.text, backgroundColor: colors.primary},
          ]}>
          <Text style={globalStyles.reviewText}>Overall Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={overallRating}
            size={32}
            onFinishRating={setOverallRating}
          />
          <Text style={globalStyles.reviewText}>Price Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={priceRating}
            size={32}
            onFinishRating={setPriceRating}
          />
          <Text style={globalStyles.reviewText}>Quality Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={qualityRating}
            size={32}
            onFinishRating={setQualityRating}
          />
          <Text style={globalStyles.reviewText}>Clenliness Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={clenlinessRating}
            size={32}
            onFinishRating={setClenlinessRating}
          />
          <Text style={globalStyles.reviewText}>Review Text: </Text>
          <TextInput
            role="textbox"
            mode="flat"
            style={[
              globalStyles.reviewBodyInput,
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
            role="button"
            style={[
              globalStyles.reviewSubmitButton,
              {borderColor: colors.text},
            ]}
            contentStyle={globalStyles.buttonContent}
            mode="contained"
            onPress={() => addReview()}>
            <Text>Add Review</Text>
          </Button>
        </View>

        <Portal>
          <Dialog role="dialog" visible={dialogVisible} dismissable={false}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Would you like to add a photo to your review?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button role="button" onPress={() => noPhoto()}>
                <Text>No</Text>
              </Button>
              <Button role="button" onPress={() => addPhoto()}>
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
  viewOne: {
    flex: 4.6,
    borderWidth: 3,
    margin: '5%',
    paddingTop: '2%',
    borderRadius: 30,
  },
});

export default AddReviewScreen;
