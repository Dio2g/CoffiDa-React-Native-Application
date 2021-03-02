import {
  Text,
  Searchbar,
  Menu,
  Divider,
  Button,
  Checkbox,
  useTheme,
  ActivityIndicator,
  Avatar,
} from 'react-native-paper';
import React, {useState, useEffect, useCallback, useRef} from 'react';
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

  const {navigation} = props;

  // set flatlist to top
  const flatListRef = useRef();
  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

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
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);

  // for pagination
  const onBottomReached = async () => {
    getLocations(offset + 5);
  };

  // for search bar
  const onChangeSearch = async (query) => {
    setSearchQuery(query);
  };

  const onPressSearch = async () => {
    toTop();
    getLocations(0);
  };

  // for the preference menu
  const [visible, setVisible] = useState(false);
  const openMenu = () => {
    setVisible(true);
  };
  const closeMenu = () => setVisible(false);
  const resetPreferences = () => {
    setOverallRating(0);
    setPriceRating(0);
    setQualityRating(0);
    setClenlinessRating(0);
    setSearchIn('');
    setFavChecked(false);
    setRevChecked(false);
  };

  // for fav check box
  const [favChecked, setFavChecked] = useState(false);
  const onFavCheck = () => {
    setRevChecked(false);
    if (searchIn === '' || searchIn === 'reviewed') {
      setSearchIn('favourite');
    } else {
      setSearchIn('');
    }
    setFavChecked(!favChecked);
  };

  // for rev check box
  const [revChecked, setRevChecked] = useState(false);
  const onRevCheck = () => {
    setFavChecked(false);
    if (searchIn === '' || searchIn === 'favourite') {
      setSearchIn('reviewed');
    } else {
      setSearchIn('');
    }
    setRevChecked(!revChecked);
  };

  // for all api calls
  const getLocations = useCallback(
    async (offsetTemp) => {
      setOffset(offsetTemp);
      const data = await FindLocations(
        searchQuery,
        overallRating,
        priceRating,
        qualityRating,
        clenlinessRating,
        searchIn,
        limit,
        offsetTemp,
      );
      setListData(offsetTemp === 0 ? data : [...listData, ...data]);
      setIsLoading(false);
    },
    [
      searchQuery,
      overallRating,
      priceRating,
      qualityRating,
      clenlinessRating,
      searchIn,
      limit,
      listData,
    ],
  );

  // on component load
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      setIsLoading(true);
      getLocations(0);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [getLocations, navigation]);

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
          <Menu
            style={styles.prefMenu}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={openMenu}
                icon="cog"
              />
            }>
            <Menu.Item onPress={() => {}} title="Overall Rating" />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={overallRating}
              size={32}
              onFinishRating={setOverallRating}
            />
            <Divider />
            <Menu.Item onPress={() => {}} title="Price Rating" />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={priceRating}
              size={32}
              onFinishRating={setPriceRating}
            />
            <Divider />
            <Menu.Item onPress={() => {}} title="Quality Rating" />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={qualityRating}
              size={32}
              onFinishRating={setQualityRating}
            />
            <Divider />
            <Menu.Item onPress={() => {}} title="Clenliness Rating" />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={clenlinessRating}
              size={32}
              onFinishRating={setClenlinessRating}
            />
            <Divider />
            <View style={styles.checkBoxView}>
              <Menu.Item onPress={() => {}} title="Favourites" />
              <View style={styles.checkBox}>
                <Checkbox
                  color={colors.background}
                  status={favChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onFavCheck();
                  }}
                />
              </View>
            </View>
            <Divider />
            <View style={styles.checkBoxView}>
              <Menu.Item onPress={() => {}} title="Reviewed" />
              <View style={styles.checkBox}>
                <Checkbox
                  color={colors.background}
                  status={revChecked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onRevCheck();
                  }}
                />
              </View>
            </View>
            <Divider />
            <Button
              mode="contained"
              onPress={resetPreferences}
              style={{
                backgroundColor: colors.background,
                borderColor: colors.primary,
                borderRightWidth: 7,
                borderLeftWidth: 7,
              }}>
              <Text>RESET</Text>
            </Button>
          </Menu>
        </View>
        <View style={globalStyles.flexContainer}>
          <Button
            mode="contained"
            onPress={onPressSearch}
            style={styles.prefMenuButton}
            contentStyle={styles.prefMenuButtonContent}>
            <Icon name="search" size={24} color={colors.text} />
          </Button>
        </View>
      </View>

      <View style={styles.flatListView}>
        <FlatList
          ref={flatListRef}
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
                <View style={styles.flexContainer}>
                  <View style={styles.infoView}>
                    <Text style={styles.nameText}>{item.location_name}</Text>
                    <Text style={styles.locationText}>
                      {item.location_town}
                    </Text>
                    <Rating
                      style={styles.rating}
                      fractions={2}
                      readonly
                      startingValue={item.avg_overall_rating}
                      tintColor={colors.primary}
                      imageSize={30}
                    />
                  </View>
                  <Avatar.Image
                    style={[
                      globalStyles.imgView,
                      {
                        borderColor: colors.text,
                        backgroundColor: colors.accent,
                      },
                    ]}
                    size={100}
                    source={{uri: item.photo_path}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.location_id.toString()}
          onEndReachedThreshold={0.6}
          onEndReached={onBottomReached}
        />
      </View>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  searchView: {
    flex: 1,
    flexDirection: 'row',
  },

  flatListView: {
    flex: 11,
    marginTop: '4%',
    marginBottom: '17%',
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

  prefMenu: {
    alignItems: 'center',
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
    paddingLeft: '20%',
  },

  touchableOpacity: {
    padding: '5%',
    marginVertical: 8,
    marginHorizontal: 16,
  },

  nameText: {
    fontSize: 21,
    paddingLeft: '1%',
  },

  locationText: {
    fontSize: 18,
    paddingLeft: '1%',
  },

  ratingText: {
    fontSize: 14,
    paddingLeft: '1%',
    marginTop: '4%',
  },

  rating: {
    alignItems: 'flex-start',
    paddingTop: '2%',
  },

  flexContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  infoView: {
    flex: 1,
    alignItems: 'flex-start',
  },
});

export default HomeScreen;
