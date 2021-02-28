import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Text, List, ActivityIndicator} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import UserInfo from '../components/user_information';
import globalStyles from '../styles/global_stylesheet';

const ReviewsScreen = () => {
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
      <List.Accordion title="Liked Review">
        <FlatList
          data={userData.liked_reviews}
          renderItem={({item}) => <Text>{item.review.review_body}</Text>}
          keyExtractor={(item) => item.review.review_id.toString()}
        />
      </List.Accordion>
      <List.Accordion
        onPress={() => setExpanded(!expanded)}
        expanded={expanded}
        title="My Reviews">
        <FlatList
          data={userData.reviews}
          renderItem={({item}) => <Text>{item.review.review_body}</Text>}
          keyExtractor={(item) => item.review.review_id.toString()}
        />
      </List.Accordion>
    </View>
  );
};

export default ReviewsScreen;
