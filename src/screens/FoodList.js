import React, {useState, useContext, useEffect, Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {_axios} from './../utils/_axios';

import Btn from './../components/Button';

import Config from 'react-native-config';

// import NavHeaderRight from '../components/NavHeaderRight';
import ListCard from '../components/ListCard';
import {getToken} from '../utils/common';
// import NavHeaderRight from "../components/NavHeaderRight";

const BASE_URL =
  'https://tamupatisserieserver-production.up.railway.app/api/v1';
// const BASE_URL = 'http://192.168.100.5:8000/api/v1';

const FoodList = props => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initial_list, setInitialList] = useState([]);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData(() => {
      setRefreshing(false);
    });
    /*setTimeout(() => {
      setRefreshing(false);
    }, 2000);*/
  }, []);

  async function fetchData(f = () => {}) {
    try {
      const token = await getToken();
      console.log(token);
      const res = await _axios.get(`${BASE_URL}/product`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setFoods(res.data);
      setInitialList(res.data);
      f();
    } catch (err) {
      Alert.alert('Network Error', 'err: ' + err);
      f();
      console.log('err: ', err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const onChangeQuery = text => {
    setQuery(text);
  };

  const filterList = async category => {
    if (categories.indexOf(category) > -1) {
      const foods_response = initial_list.filter(item => {
        return item.category.toLowerCase().indexOf(category.toLowerCase()) > -1;
      });

      setFoods(foods_response);
      setQuery('');
    } else {
      if (query === '') {
        setFoods(initial_list);
      } else {
        const foods_response = initial_list.filter(item => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });

        setFoods(foods_response);
        setQuery('');
      }
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
    if (categories.indexOf(item.category) <= -1) {
      setCategories([...categories, item.category]);
    }
    if (item && !(item.images.indexOf('https') > -1)) {
      item.images = item.images ? item.images.replace('http', 'https') : '';
    }
    // console.log(item);
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'scroll',
          width: '100%',
          height: 30,
          marginTop: 5,
          margin: 5,
        }}>
        {categories.map(el => {
          return (
            <View style={{marginRight: 5}}>
              <Button
                style={{
                  minWidth: 50,
                  height: '100%',
                  borderRadius: 20,
                }}
                mode={'outlined'}
                title={el}
                onPress={() => {
                  filterList(el);
                }}
              />
            </View>
          );
        })}
      </View>
      <FlatList
        data={foods}
        renderItem={renderFood}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
