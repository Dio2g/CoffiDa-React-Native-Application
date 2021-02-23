import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Text, TextInput, ActivityIndicator} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/stack';
import globalStyles from '../styles/global_stylesheet';
import UpdateDetails from '../components/update_details';
import UserInfo from '../components/user_information';

const UpdateDetailsScreen = (props) => {
  const windowHeight = Dimensions.get('window').height - useHeaderHeight();

  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function getUserData() {
      const userData = await UserInfo();
      setIsLoading(false);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setEmail(userData.email);
    }

    getUserData();
  }, []);

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
      <View style={{width: '100%', height: windowHeight}}>
        <View style={globalStyles.viewOne}>
          <TextInput
            type="outlined"
            label="First Name"
            placeholder="Enter new first name..."
            onChangeText={(value) => setFirstName(value)}
            value={firstName}
          />
          <TextInput
            type="outlined"
            label="Last Name"
            placeholder="Enter new last name..."
            onChangeText={(value) => setLastName(value)}
            value={lastName}
          />
          <TextInput
            type="outlined"
            label="Email"
            placeholder="Enter new email..."
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TextInput
            secureTextEntry
            type="outlined"
            label="Password"
            placeholder="Enter new password..."
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>

        <View style={globalStyles.viewTwo}>
          <Button
            style={globalStyles.button}
            contentStyle={globalStyles.buttonContent}
            mode="contained"
            onPress={() =>
              UpdateDetails(props, firstName, lastName, email, password)
            }>
            <Text>Update Details</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateDetailsScreen;
