import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  Button,
  ActivityIndicator,
  Text,
  Card,
  Paragraph,
  Title,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeReview from '../components/like_review';
import UserInfo from '../components/user_information';
import GetPhoto from '../components/get_photo';
import DeleteReview from '../components/delete_review';
import globalStyles from '../styles/global_stylesheet';

const ReviewInfoScreen = (props) => {
  const {route} = props;
  const {params} = route;
  const {reviewData} = params;
  const {locationId} = params;
  const {locationName} = params;

  const [photo, setPhoto] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [isMine, setIsMine] = useState(false);

  const [liked, setLiked] = useState(false);

  const deleteReview = async () => {
    DeleteReview(props, locationId, reviewData.review_id);
  };

  const onLikedClick = async () => {
    isFavourited();
    if (liked) {
      await LikeReview(locationId, reviewData.review_id, 'DELETE');
      setLiked(!liked);
    } else if (!liked) {
      await LikeReview(locationId, reviewData.review_id, 'POST');
      setLiked(!liked);
    }
  };

  const isFavourited = useCallback(async () => {
    const data = await UserInfo();

    const arrLocationID = data.liked_reviews.map((i) => i.location.location_id);

    const arrReviewID = data.liked_reviews.map((j) => j.review.review_id);

    const reviewIndex = arrReviewID.indexOf(reviewData.review_id);

    if (reviewIndex !== -1 && arrLocationID[reviewIndex] === locationId) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    setIsLoading(false);
  }, [locationId, reviewData]);

  const isMyReview = useCallback(async () => {
    const data = await UserInfo();

    const arrLocationID = data.reviews.map((i) => i.location.location_id);

    const arrReviewID = data.reviews.map((j) => j.review.review_id);

    const reviewIndex = arrReviewID.indexOf(reviewData.review_id);

    if (reviewIndex !== -1 && arrLocationID[reviewIndex] === locationId) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [locationId, reviewData]);

  useEffect(() => {
    async function getReviewPhoto() {
      const data = await GetPhoto(locationId, reviewData.review_id);
      setPhoto(data);
    }

    getReviewPhoto();
    isMyReview();
    isFavourited();
  }, [isFavourited, locationId, reviewData, isMyReview]);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View>
      <Card>
        <Card.Title title={`Review Of ${locationName}`} />
        {photo ? <Card.Cover source={{uri: photo.url}} /> : null}

        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
      </Card>

      <Button mode="contained" style={styles.button} onPress={onLikedClick}>
        <Icon name={liked ? 'heart' : 'heart-outline'} size={40} color="red" />
      </Button>
      {isMine ? (
        <Button
          mode="contained"
          style={globalStyles.alternativeButton}
          contentStyle={globalStyles.buttonContent}>
          <Text>Update</Text>
        </Button>
      ) : null}
      {isMine ? (
        <Button
          mode="contained"
          style={globalStyles.alternativeButton}
          onPress={() => deleteReview()}
          contentStyle={globalStyles.buttonContent}>
          <Text>Delete</Text>
        </Button>
      ) : null}
    </View>
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
};

const styles = StyleSheet.create({});

export default ReviewInfoScreen;
