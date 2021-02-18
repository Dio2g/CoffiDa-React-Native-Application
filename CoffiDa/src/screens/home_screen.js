import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text, Searchbar, Menu, Divider, Button, Checkbox } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider'
import FindLocations from '../components/find_locations'
import styles from '../styles/stylesheet'

const HomeScreen = () => {


  const [listData, setListData] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [overallRating, setOverallRating] = useState(0)
  const [priceRating, setPriceRating] = useState(0)
  const [qualityRating, setQualityRating] = useState(0)
  const [clenlinessRating, setClenlinessRating] = useState(0)
  const [searchIn, setSearchIn] = useState('')


  // for the preference menu
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  // check box
  const [checked, setChecked] = useState(false);



  const onChangeSearch = async (query) => {
    setSearchQuery(query)
    const data = await FindLocations(query, overallRating, priceRating, qualityRating, clenlinessRating, searchIn)
    setListData(data)
  };

  const onCheck = () => {
    if (searchIn === '') {
      setSearchIn('favourite')
    } else {
      setSearchIn('')
    }
    setChecked(!checked)
  }

  const submitPreferences = async () => {
    const data = await FindLocations(searchQuery, overallRating, priceRating, qualityRating, clenlinessRating, searchIn)
    setListData(data)
    closeMenu()
  }


  useEffect(() => {
    async function getLocations() {
      const data = await FindLocations('')
      setListData(data)
    }
    getLocations();
  }, []);

  return (
    <View style={styles.flexContainer}>

      <View style={styles.homeSearchView}>
        <View style={styles.searchBarView}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <View style={styles.prefMenuView}>
          <Menu
            style={styles.prefMenu}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button mode="contained" onPress={openMenu} contentStyle={styles.prefMenuButtonContent}><Icon name="cog" size={24} color="#fff" /></Button>} >
            <Menu.Item onPress={() => { }} title={`Overall Rating: ${overallRating}`} />
            <Slider
              minimumValue={0}
              maximumValue={5}
              step={1}
              onValueChange={setOverallRating}
              value={overallRating}
              minimumTrackTintColor='#E0605E'
              thumbTintColor='#E0605E'
            />
            <Divider />
            <Menu.Item onPress={() => { }} title={`Price Rating: ${priceRating}`} />
            <Slider
              minimumValue={0}
              maximumValue={5}
              step={1}
              onValueChange={setPriceRating}
              value={priceRating}
              minimumTrackTintColor='#E0605E'
              thumbTintColor='#E0605E'
            />
            <Divider />
            <Menu.Item onPress={() => { }} title={`Quality Rating: ${qualityRating}`} />
            <Slider
              minimumValue={0}
              maximumValue={5}
              step={1}
              onValueChange={setQualityRating}
              value={qualityRating}
              minimumTrackTintColor='#E0605E'
              thumbTintColor='#E0605E'
            />
            <Divider />
            <Menu.Item onPress={() => { }} title={`Clenliness Rating: ${clenlinessRating}`} />
            <Slider
              minimumValue={0}
              maximumValue={5}
              step={1}
              onValueChange={setClenlinessRating}
              value={clenlinessRating}
              minimumTrackTintColor='#E0605E'
              thumbTintColor='#E0605E'
            />
            <Divider />
            <View style={styles.checkBoxView}>
              <Menu.Item onPress={() => { }} title="Favourites" />
              <View style={styles.checkBox}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onCheck();
                  }}
                />
              </View>
            </View>
            <Divider />
            <Button mode="contained" onPress={submitPreferences}><Text>Save</Text></Button>
          </Menu>
        </View>
      </View>

      <View style={styles.flatListView}>
        <FlatList
          data={listData}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.button}
              >
                <Text>{item.location_name}</Text>
                <Text>{item.avg_overall_rating}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </View>
    </View>
  )
}

export default HomeScreen
