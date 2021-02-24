import {
  Text,
  Searchbar,
  Menu,
  Divider,
  Button,
  Checkbox,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import FindLocations from '../components/find_locations';
import globalStyles from '../styles/global_stylesheet';

const HomeScreen = (props) => {
  const windowHeight = Dimensions.get('window').height;

  // so paper theme colors can be used with with non paper components
  const {colors} = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  // for locations list
  const [listData, setListData] = useState([]);

  // search parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [clenlinessRating, setClenlinessRating] = useState(0);
  const [searchIn, setSearchIn] = useState('');

  // for search bar
  const onChangeSearch = async (query) => {
    setSearchQuery(query);
    const data = await FindLocations(
      query,
      overallRating,
      priceRating,
      qualityRating,
      clenlinessRating,
      searchIn,
    );
    setListData(data);
  };

  // for the preference menu
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const submitPreferences = async () => {
    const data = await FindLocations(
      searchQuery,
      overallRating,
      priceRating,
      qualityRating,
      clenlinessRating,
      searchIn,
    );
    setListData(data);
    closeMenu();
  };

  // for check box
  const [checked, setChecked] = useState(false);
  const onCheck = () => {
    if (searchIn === '') {
      setSearchIn('favourite');
    } else {
      setSearchIn('');
    }
    setChecked(!checked);
  };

  // on component load
  useEffect(() => {
    async function getLocations() {
      const data = await FindLocations('');
      setIsLoading(false);
      setListData(data);
    }
    getLocations();
  }, []);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View style={{width: '100%', height: windowHeight}}>
      <View style={styles.searchView}>
        <View style={styles.searchBarView}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <View style={globalStyles.flexContainer}>
          <Menu
            style={styles.prefMenu}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button
                mode="contained"
                onPress={openMenu}
                style={styles.prefMenuButton}
                contentStyle={styles.prefMenuButtonContent}>
                <Icon name="cog" size={24} color={colors.text} />
              </Button>
            }>
            <Menu.Item
              onPress={() => {}}
              title={`Overall Rating: ${overallRating}`}
            />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={overallRating}
              size={25}
              onFinishRating={setOverallRating}
            />
            <Divider />
            <Menu.Item
              onPress={() => {}}
              title={`Price Rating: ${priceRating}`}
            />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={priceRating}
              size={25}
              onFinishRating={setPriceRating}
            />
            <Divider />
            <Menu.Item
              onPress={() => {}}
              title={`Quality Rating: ${qualityRating}`}
            />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={qualityRating}
              size={25}
              onFinishRating={setQualityRating}
            />
            <Divider />
            <Menu.Item
              onPress={() => {}}
              title={`Clenliness Rating: ${clenlinessRating}`}
            />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={clenlinessRating}
              size={25}
              onFinishRating={setClenlinessRating}
            />
            <Divider />
            <View style={styles.checkBoxView}>
              <Menu.Item onPress={() => {}} title="Favourites" />
              <View style={styles.checkBox}>
                <Checkbox
                  color={colors.background}
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onCheck();
                  }}
                />
              </View>
            </View>
            <Divider />
            <Button mode="contained" onPress={submitPreferences}>
              <Text>Save</Text>
            </Button>
          </Menu>
        </View>
      </View>

      <View style={styles.flatListView}>
        <FlatList
          data={listData}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={[
                  {backgroundColor: colors.primary, borderColor: colors.accent},
                  styles.touchableOpacity,
                ]}
                onPress={() =>
                  props.navigation.navigate('homeStackNavigator', {
                    screen: 'Location Info',
                    params: {id: item.location_id},
                  })
                }>
                <Text style={styles.nameText}>{item.location_name}</Text>
                <Text style={styles.locationText}>{item.location_town}</Text>
                <Rating
                  style={styles.rating}
                  fractions={2}
                  readonly
                  startingValue={item.avg_overall_rating}
                  tintColor={colors.primary}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </View>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  searchView: {
    flex: 1,
    flexDirection: 'row',
  },

  flatListView: {
    flex: 11,
    marginTop: '5%',
    marginBottom: '18%',
  },

  searchBarView: {
    flex: 4,
  },

  searchBar: {
    height: '100%',
    borderRadius: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  prefMenuButton: {
    borderRadius: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  prefMenuButtonContent: {
    height: '100%',
  },

  checkBoxView: {
    flex: 1,
    flexDirection: 'row',
  },

  checkBox: {
    marginTop: '4%',
  },

  touchableOpacity: {
    padding: '5%',
    marginVertical: 8,
    marginHorizontal: 16,
  },

  nameText: {
    fontSize: 20,
    paddingLeft: '1%',
  },

  locationText: {
    fontSize: 17,
    paddingLeft: '1%',
  },

  rating: {
    alignItems: 'flex-start',
    paddingTop: '2%',
  },
});

export default HomeScreen;
