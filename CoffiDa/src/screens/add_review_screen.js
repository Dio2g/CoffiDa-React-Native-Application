import React, {useState} from 'react';
import {View} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import PropTypes from 'prop-types';
import AddReview from '../components/add_review';
import UserInfo from '../components/user_information';

const AddReviewScreen = (props) => {
  const {route} = props;
  const {navigation} = props;
  const {params} = route;
  const {id} = params;

  const [overallRating, setOverallRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [clenlinessRating, setClenlinessRating] = useState(0);
  const [reviewBody, setReviewBody] = useState('');

  const [dialogVisible, setDialogVisible] = useState(false);

  const addReview = async () => {
    await AddReview(
      id,
      overallRating,
      priceRating,
      qualityRating,
      clenlinessRating,
      reviewBody,
    );
    setDialogVisible(true);
  };

  const noPhoto = () => {
    setDialogVisible(false);
    props.navigation.navigate('homeStackNavigator', {
      screen: 'Location Info',
      params: {id},
    });
  };

  const addPhoto = async () => {
    setDialogVisible(false);
    const userData = await UserInfo();
    // console.log(userData.reviews);
    const locationIDs = userData.reviews.map((i) => i.location.location_id);
    const reviewIDs = userData.reviews.map((i) => i.review.review_id);
    let i;
    let index = -1;
    // console.log(id);
    for (i = 0; i < locationIDs.length; i += 1) {
      if (locationIDs[i] === id) {
        index = i;
      }
    }

    const reviewId = reviewIDs[index];
    navigation.navigate('homeStackNavigator', {
      screen: 'Camera',
      params: {id, reviewId},
    });
    // console.log(reviewId);
  };

  return (
    <View>
      <AirbnbRating
        showRating={false}
        count={5}
        defaultRating={overallRating}
        size={32}
        onFinishRating={setOverallRating}
      />
      <AirbnbRating
        showRating={false}
        count={5}
        defaultRating={priceRating}
        size={32}
        onFinishRating={setPriceRating}
      />
      <AirbnbRating
        showRating={false}
        count={5}
        defaultRating={qualityRating}
        size={32}
        onFinishRating={setQualityRating}
      />
      <AirbnbRating
        showRating={false}
        count={5}
        defaultRating={clenlinessRating}
        size={32}
        onFinishRating={setClenlinessRating}
      />
      <TextInput
        multiline
        type="outlined"
        label="Body"
        placeholder="Enter review Body..."
        onChangeText={(value) => setReviewBody(value)}
        value={reviewBody}
      />
      <Button mode="contained" onPress={() => addReview()}>
        <Text>Add Review</Text>
      </Button>

      <Portal>
        <Dialog visible={dialogVisible} dismissable={false}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Would you like to add a photo to your review?</Paragraph>
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
  );
};

AddReviewScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddReviewScreen;
