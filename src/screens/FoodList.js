import React, {useState, useContext, useEffect, Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {_axios} from './../utils/_axios';

import Config from 'react-native-config';

// import NavHeaderRight from '../components/NavHeaderRight';
import ListCard from '../components/ListCard';
import {getToken} from '../utils/common';
// import NavHeaderRight from "../components/NavHeaderRight";

const BASE_URL =
  'https://tamuserver-production.up.railway.app/api/v1';
// const BASE_URL = 'http://192.168.100.5:8000/api/v1';

const FoodList = props => {
  const [foods, setFoods] = useState([]);
  const [initial_list, setInitialList] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();
        console.log(token);
        const res = await _axios.get(`${BASE_URL}/product`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setFoods(res.data);
        setInitialList(res.data);
      } catch (err) {
        console.log('err: ', err);
      }
    }
    fetchData();
  }, []);

  const onChangeQuery = text => {
    setQuery(text);
  };

  const filterList = async () => {
    if (query === '') {
      setFoods(initial_list);
    } else {
      const foods_response = initial_list.filter(item => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });

      setFoods(foods_response);
      setQuery('');
    }
  };

  const viewItem = item => {
    // console.log(item);
    // Navigate to the FoodDetails screen with the selected item
    props.navigation.navigate('FoodDetails', {
      item: item,
    });
  };

  const renderFood = ({item}) => {
    if (item && !(item.images.indexOf('https') > -1)) {
      item.images = item.images ? item.images.replace('http', 'https') : '';
    }
    console.log(item);
    // item.images = item.images ? item.images.replace('http', 'https') : '';
    return <ListCard item={item} viewItem={viewItem} />;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topWrapper}>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeQuery}
            value={query}
            placeholder={'search?'}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button onPress={filterList} title="Go" color="#c53c3c" />
        </View>
      </View>

      <FlatList
        data={foods}
        renderItem={renderFood}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

import Icon from 'react-native-vector-icons/Octicons';

const MenuIcon = ({navigate}) => (
  <Icon
    name="three-bars"
    size={30}
    color="#fff"
    onPress={() => navigate('DrawerOpen')}
  />
);
FoodList.navigationOptions = ({navigation}) => ({
  headerRight: () => (
    <TouchableOpacity
    // style={styles.headerButton}
    // onPress={() => navigation.openDrawer()}
    >
      <MenuIcon name="menu" size={30} color="white" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  headerButtonContainer: {
    marginRight: 10,
  },
  wrapper: {
    flex: 1,
    padding: 10,
  },
  topWrapper: {
    flexDirection: 'row',
  },
  textInputWrapper: {
    flex: 4,
  },
  textInput: {
    height: 35,
    borderColor: '#5d5d5d',
    borderWidth: 1,
  },
  buttonWrapper: {
    flex: 1,
  },
  list: {
    marginTop: 20,
  },
});

export default FoodList;
