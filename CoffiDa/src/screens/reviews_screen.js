import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  Text,
  ActivityIndicator,
  useTheme,
  Menu,
  Button,
} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {Rating} from 'react-native-ratings';
import PropTypes from 'prop-types';
import UserInfo from '../components/user_information';
import globalStyles from '../styles/global_stylesheet';

const ReviewsScreen = (props) => {
  // so paper theme colors can be used with with non paper components
  const {colors} = useTheme();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const {navigation} = props;

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuSelection, setMenuSelection] = useState('REVIEWED');

  useEffect(() => {
    async function getUserData() {
      const data = await UserInfo();
      setUserData(data);
    }

    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      setIsLoading(true);
      await getUserData();
      setIsLoading(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View>
      <View style={{backgroundColor: colors.primary}}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button role="button" onPress={openMenu}>
              <Text>Select Category</Text>
            </Button>
          }>
          <Menu.Item
            onPress={() => setMenuSelection('REVIEWED')}
            title="My Reviews"
          />
          <Menu.Item
            onPress={() => setMenuSelection('LIKED')}
            title="Liked Reviews"
          />
        </Menu>
      </View>
      <View>
        {menuSelection === 'REVIEWED' ? (
          <FlatList
            role="list"
            data={userData.reviews}
            renderItem={({item}) => (
              <View role="listitem">
                <TouchableOpacity
                  role="button"
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
                        locationName: item.location.location_name,
                      },
                    })
                  }>
                  <Text style={globalStyles.reviewBody}>
                    {item.location.location_name}
                  </Text>
                  <Text style={globalStyles.reviewBody}>
                    {item.location.location_town}
                  </Text>
                  <Rating
                    fractions={2}
                    readonly
                    startingValue={item.review.overall_rating}
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
        ) : (
          <FlatList
            role="list"
            data={userData.liked_reviews}
            renderItem={({item}) => (
              <View role="listitem">
                <TouchableOpacity
                  role="button"
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
                        locationName: item.location.location_name,
                      },
                    })
                  }>
                  <Text style={globalStyles.reviewBody}>
                    {item.location.location_name}
                  </Text>
                  <Text style={globalStyles.reviewBody}>
                    {item.location.location_town}
                  </Text>
                  <Rating
                    fractions={2}
                    readonly
                    startingValue={item.review.overall_rating}
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
        )}
      </View>
    </View>
  );
};

ReviewsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default ReviewsScreen;
