import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, List, ActivityIndicator, useTheme} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {Rating} from 'react-native-ratings';
import PropTypes from 'prop-types';
import UserInfo from '../components/user_information';
import globalStyles from '../styles/global_stylesheet';

const ReviewsScreen = (props) => {
  // so paper theme colors can be used with with non paper components
  const {colors} = useTheme();

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    async function getUserData() {
      const data = await UserInfo();

      setUserData(data);
      setIsLoading(false);
    }
    getUserData();
  }, []);

  // console.log(userData);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View>
      <List.Accordion title="Liked Reviews">
        <FlatList
          data={userData.liked_reviews}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.accent,
                  },
                  globalStyles.reviewOpacity,
                ]}
                onPress={() =>
                  props.navigation.navigate('homeStackNavigator', {
                    screen: 'Review Info',
                    params: {
                      reviewData: item.review,
                      locationId: item.location.location_id,
                    },
                  })
                }>
                <Rating
                  fractions={2}
                  readonly
                  startingValue={item.overall_rating}
                  tintColor={colors.primary}
                  imageSize={32}
                />
                <Text style={globalStyles.reviewBody}>
                  {item.review.review_body}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.review.review_id.toString()}
        />
      </List.Accordion>
      <List.Accordion
        onPress={() => setExpanded(!expanded)}
        expanded={expanded}
        title="My Reviews">
        <FlatList
          data={userData.reviews}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.accent,
                  },
                  globalStyles.reviewOpacity,
                ]}
                onPress={() =>
                  props.navigation.navigate('homeStackNavigator', {
                    screen: 'Review Info',
                    params: {
                      reviewData: item.review,
                      id: item.location.location_id,
                    },
                  })
                }>
                <Rating
                  fractions={2}
                  readonly
                  startingValue={item.overall_rating}
                  tintColor={colors.primary}
                  imageSize={32}
                />
                <Text style={globalStyles.reviewBody}>
                  {item.review.review_body}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.review.review_id.toString()}
        />
      </List.Accordion>
    </View>
  );
};

ReviewsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ReviewsScreen;
