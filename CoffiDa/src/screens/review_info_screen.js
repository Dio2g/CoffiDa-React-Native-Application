import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import {
  Button,
  ActivityIndicator,
  Text,
  Card,
  useTheme,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import {Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeReview from '../components/like_review';
import UserInfo from '../components/user_information';
import GetPhoto from '../components/get_photo';
import DeleteReview from '../components/delete_review';
import globalStyles from '../styles/global_stylesheet';

const ReviewInfoScreen = (props) => {
  // so paper theme colors can be used with with non paper components
  const {colors} = useTheme();

  // for ratings components
  const fractions = 2;
  const imgSize = 32;

  const {route} = props;
  const {navigation} = props;
  const {params} = route;
  const {reviewData} = params;
  const {locationId} = params;
  const {locationName} = params;

  const [photo, setPhoto] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [isMine, setIsMine] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const deleteReview = async () => {
    DeleteReview(props, locationId, reviewData.review_id);
  };

  const onLikedClick = async () => {
    try {
      if (liked) {
        await LikeReview(locationId, reviewData.review_id, 'DELETE');
        setLiked(!liked);
        setLikes(likes - 1);
      } else if (!liked) {
        await LikeReview(locationId, reviewData.review_id, 'POST');
        setLiked(!liked);
        setLikes(likes + 1);
      }
    } catch (e) {
      // console.error(e);
      ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
    }
  };

  const isFavourited = useCallback(
    async (userInfo) => {
      try {
        const arrLocationID = userInfo.liked_reviews.map(
          (i) => i.location.location_id,
        );

        const arrReviewID = userInfo.liked_reviews.map(
          (j) => j.review.review_id,
        );

        const reviewIndex = arrReviewID.indexOf(reviewData.review_id);

        if (reviewIndex !== -1 && arrLocationID[reviewIndex] === locationId) {
          setLiked(true);
        } else {
          setLiked(false);
        }

        setIsLoading(false);
      } catch (e) {
        // console.error(e);
        ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
      }
    },
    [locationId, reviewData],
  );

  const isMyReview = useCallback(
    async (userInfo) => {
      try {
        const arrLocationID = userInfo.reviews.map(
          (i) => i.location.location_id,
        );

        const arrReviewID = userInfo.reviews.map((j) => j.review.review_id);

        const reviewIndex = arrReviewID.indexOf(reviewData.review_id);

        if (reviewIndex !== -1 && arrLocationID[reviewIndex] === locationId) {
          setIsMine(true);
        } else {
          setIsMine(false);
        }
      } catch (e) {
        // console.error(e);
        ToastAndroid.show('Unexpected Error.', ToastAndroid.SHORT);
      }
    },
    [locationId, reviewData],
  );

  useEffect(() => {
    const getReviewPhoto = async () => {
      const data = await GetPhoto(locationId, reviewData.review_id);
      setPhoto(data);
    };

    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      setIsLoading(true);
      setLikes(reviewData.likes);
      await getReviewPhoto();
      const data = await UserInfo();
      await isMyReview(data);
      await isFavourited(data);
      setIsLoading(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFavourited, locationId, reviewData, isMyReview, navigation]);

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
      <View style={styles.reviewContentView}>
        <Card style={[styles.card, {borderColor: colors.text}]}>
          <Card.Title title={`Review Of ${locationName}`} />
          {photo ? <Card.Cover role="img" source={{uri: photo.url}} /> : null}
          <View style={[styles.buttonView, {borderColor: colors.text}]}>
            {isMine ? (
              <View style={styles.isMineButtonView}>
                <Button
                  role="button"
                  mode="contained"
                  contentStyle={[
                    styles.isMineButtonsContent,
                    {borderColor: colors.accent},
                  ]}
                  onPress={() =>
                    navigation.navigate('homeStackNavigator', {
                      screen: 'Update Review',
                      params: {locationId, reviewData},
                    })
                  }>
                  <Text>Update</Text>
                </Button>
                <Button
                  role="button"
                  contentStyle={[
                    styles.isMineButtonsContent,
                    {borderColor: colors.accent},
                  ]}
                  mode="contained"
                  onPress={() => deleteReview()}>
                  <Text>Delete</Text>
                </Button>
              </View>
            ) : null}

            <Button
              role="button"
              mode="contained"
              style={styles.button}
              onPress={onLikedClick}>
              <Icon
                name={liked ? 'heart' : 'heart-outline'}
                size={40}
                color="red"
              />
              <Text>{likes}</Text>
            </Button>
          </View>

          <Card.Content>
            <Text style={styles.text}>Overall Rating</Text>
            <Rating
              fractions={fractions}
              readonly
              startingValue={reviewData.overall_rating}
              tintColor={colors.primary}
              imageSize={imgSize}
            />
            <Text style={styles.text}>Price Rating</Text>
            <Rating
              fractions={fractions}
              readonly
              startingValue={reviewData.price_rating}
              tintColor={colors.primary}
              imageSize={imgSize}
            />
            <Text style={styles.text}>Quality Rating</Text>
            <Rating
              fractions={fractions}
              readonly
              startingValue={reviewData.quality_rating}
              tintColor={colors.primary}
              imageSize={imgSize}
            />
            <Text style={styles.text}>Clenliness Rating</Text>
            <Rating
              fractions={fractions}
              readonly
              startingValue={reviewData.clenliness_rating}
              tintColor={colors.primary}
              imageSize={imgSize}
            />
            <Text style={styles.text}>Review Body</Text>
            <Text style={[styles.reviewBodyText, {borderColor: colors.accent}]}>
              {reviewData.review_body}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

ReviewInfoScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      reviewData: PropTypes.objectOf(PropTypes.any),
      locationId: PropTypes.number,
      locationName: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  reviewContentView: {
    flex: 1,
    margin: '5%',
  },
  buttonView: {
    flexDirection: 'row',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    flex: 2,
    padding: '1%',
  },
  isMineButtonView: {
    flexDirection: 'row',
    flex: 3,
  },
  isMineButtonsContent: {
    borderWidth: 3,
    height: '100%',
    marginRight: '2%',
  },
  card: {
    borderWidth: 3,
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: '1%',
    paddingTop: '2%',
  },
  reviewBodyText: {
    borderWidth: 3,
    padding: '5%',
    marginTop: '1%',
  },
});

export default ReviewInfoScreen;
