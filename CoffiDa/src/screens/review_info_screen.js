import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, ActivityIndicator, useTheme} from 'react-native-paper';

import PropTypes, {object} from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LikeReview from '../components/like_review';
import UserInfo from '../components/user_information';
import globalStyles from '../styles/global_stylesheet';

const ReviewInfoScreen = (props) => {
  // so paper theme colors can be used with with non paper components
  const {colors} = useTheme();

  const {route} = props;

  const {params} = route;
  const {reviewData} = params;
  const {id} = params;

  const [isLoading, setIsLoading] = useState(true);

  const [liked, setLiked] = useState(false);

  //   const isMyReview = useCallback(async () => {
  //     const data = await UserInfo();
  //     console.log(data);
  //     try {
  //       const arrLocationID = data.reviews.map((i) => i.location.location_id);

  //       let i;
  //       let index = -1;
  //       for (i = 0; i < arrLocationID.length; i += 1) {
  //         if (arrLocationID[i] === id) {
  //           index = i;
  //         }
  //       }

  //       const arrReviewID = data.reviews.map((j) => j.review.review_id);
  //       if (arrReviewID[index] === reviewData.review_id) {
  //         console.log('MY REVIEW!');
  //       } else {
  //         console.log('NOT MY REVIEW!');
  //       }
  //     } catch (error) {
  //       // console.error(error);
  //     }
  //   }, [id, reviewData]);

  const onLikedClick = async () => {
    isFavourited();
    if (liked) {
      await LikeReview(id, reviewData.review_id, 'DELETE');
      setLiked(!liked);
    } else if (!liked) {
      await LikeReview(id, reviewData.review_id, 'POST');
      setLiked(!liked);
    }
  };

  const isFavourited = useCallback(async () => {
    const data = await UserInfo();
    console.log(data);
    try {
      const arrLocationID = data.liked_reviews.map(
        (i) => i.location.location_id,
      );

      let i;
      let index = -1;
      for (i = 0; i < arrLocationID.length; i += 1) {
        if (arrLocationID[i] === id) {
          index = i;
        }
      }

      const arrReviewID = data.liked_reviews.map((j) => j.review.review_id);
      if (arrReviewID[index] === reviewData.review_id) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      // console.error(error);
    }

    setIsLoading(false);
  }, [id, reviewData]);

  useEffect(() => {
    isFavourited();
    // isMyReview();
  }, [isFavourited]);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View>
      <Button mode="contained" style={styles.button} onPress={onLikedClick}>
        <Icon name={liked ? 'heart' : 'heart-outline'} size={40} color="red" />
      </Button>
    </View>
  );
};

ReviewInfoScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      reviewData: PropTypes.objectOf(PropTypes.any),
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({});

export default ReviewInfoScreen;
