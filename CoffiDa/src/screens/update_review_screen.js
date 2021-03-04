import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, ToastAndroid, ScrollView} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import PropTypes from 'prop-types';
import UpdateReview from '../components/update_review';
import DeletePhoto from '../components/delete_photo';
import globalStyles from '../styles/global_stylesheet';
import GetPhoto from '../components/get_photo';

const UpdateReviewScreen = (props) => {
  const {colors} = useTheme();

  const {route} = props;
  const {navigation} = props;
  const {params} = route;
  const {locationId} = params;
  const {reviewData} = params;

  const [photo, setPhoto] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [overallRating, setOverallRating] = useState(reviewData.overall_rating);
  const [priceRating, setPriceRating] = useState(reviewData.price_rating);
  const [qualityRating, setQualityRating] = useState(reviewData.quality_rating);
  const [clenlinessRating, setClenlinessRating] = useState(
    reviewData.clenliness_rating,
  );
  const [reviewBody, setReviewBody] = useState(reviewData.review_body);

  const updateReview = async () => {
    try {
      const profanitys = ['tea', 'cake', 'pastries', 'pastry'];
      const anyProfanitys = profanitys.some((word) =>
        reviewBody.toLowerCase().includes(word),
      );
      if (reviewBody.length > 200 || reviewBody.length < 5) {
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
          reviewId: reviewData.review_id,
          overallRating,
          priceRating,
          qualityRating,
          clenlinessRating,
          reviewBody,
        };
        await UpdateReview(props, parameters);
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

  const deletePhoto = async () => {
    const data = await GetPhoto(locationId, reviewData.review_id);
    if (data) {
      await DeletePhoto(props, locationId, reviewData.review_id);
    }
    await getReviewPhoto();
  };

  const getReviewPhoto = useCallback(async () => {
    const data = await GetPhoto(locationId, reviewData.review_id);
    setPhoto(data);
  }, [locationId, reviewData.review_id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      setIsLoading(true);
      await getReviewPhoto();
      setReviewBody(reviewData.review_body);
      setIsLoading(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [
    locationId,
    reviewData.review_id,
    navigation,
    getReviewPhoto,
    reviewData.review_body,
  ]);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <ScrollView
      style={globalStyles.flexContainer}
      contentContainerStyle={globalStyles.scrollView}>
      <View>
        <View
          style={[
            styles.viewOne,
            {borderColor: colors.text, backgroundColor: colors.primary},
          ]}>
          <Text style={globalStyles.reviewText}>Overall Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={reviewData.overall_rating}
            size={32}
            onFinishRating={setOverallRating}
          />
          <Text style={globalStyles.reviewText}>Price Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={reviewData.price_rating}
            size={32}
            onFinishRating={setPriceRating}
          />
          <Text style={globalStyles.reviewText}>Quality Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={reviewData.quality_rating}
            size={32}
            onFinishRating={setQualityRating}
          />
          <Text style={globalStyles.reviewText}>Clenliness Rating: </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={reviewData.clenliness_rating}
            size={32}
            onFinishRating={setClenlinessRating}
          />
          <Text style={globalStyles.reviewText}>Review Text: </Text>
          <TextInput
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
        {photo ? (
          <View
            style={[
              styles.imgView,
              {backgroundColor: colors.primary, borderColor: colors.text},
            ]}>
            <Avatar.Image
              role="img"
              style={[
                globalStyles.imgView,
                {
                  borderColor: colors.text,
                  backgroundColor: colors.accent,
                },
              ]}
              size={100}
              source={{uri: photo.url}}
            />
            <Button
              role="button"
              style={[
                globalStyles.button,
                styles.button,
                {backgroundColor: colors.accent},
              ]}
              contentStyle={globalStyles.buttonContent}
              mode="contained"
              onPress={() => deletePhoto()}>
              <Text>Delete Photo</Text>
            </Button>
          </View>
        ) : null}
        <View style={globalStyles.flexContainer}>
          <Button
            role="button"
            style={[
              globalStyles.reviewSubmitButton,
              {borderColor: colors.text},
            ]}
            contentStyle={globalStyles.buttonContent}
            mode="contained"
            onPress={() => updateReview()}>
            <Text>Update Review</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

UpdateReviewScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      locationId: PropTypes.number,
      reviewData: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  imgView: {
    flex: 1,
    borderWidth: 3,
    marginTop: '5%',
    marginHorizontal: '5%',
    padding: '2%',
    borderRadius: 30,
    flexDirection: 'row',
  },

  button: {
    marginTop: '9%',
    marginLeft: '15%',
  },

  viewOne: {
    flex: 4.6,
    borderWidth: 3,
    marginHorizontal: '5%',
    marginTop: '5%',
    paddingTop: '2%',
    borderRadius: 30,
  },
});

export default UpdateReviewScreen;
