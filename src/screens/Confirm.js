import React, {useState, useContext, useEffect, Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {_axios} from './../utils/_axios';

import Config from 'react-native-config';

// import NavHeaderRight from '../components/NavHeaderRight';
import ListCard from '../components/ListCard';
import {getSession, getToken, getUser} from '../utils/common';
// import NavHeaderRight from "../components/NavHeaderRight";
import {AppContext} from './../../GlobalContext';

const BASE_URL =
  'https://tamuserver-production.up.railway.app/api/v1';
// const BASE_URL = 'http://192.168.100.5:8000/api/v1';

const ConfirmOrder = props => {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState('');
  const [initial_list, setInitialList] = useState([]);
  const [total, setTotal] = useState(0);
  const {cart_items, shipping_details, removeCartItem} = useContext(AppContext);

  useEffect(() => {
    setFoods(cart_items);
    setInitialList(cart_items);
    let amount = cart_items.reduce((acc, item) => {
      return acc + parseFloat(item.price) * parseFloat(item.qty);
    }, 0);
    setTotal(amount);

    /*async function fetchData() {
      try {
        const token = await getToken();
        console.log(token);
        const res = await _axios.get(`${BASE_URL}/inventory`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setFoods(res.data);
      } catch (err) {
        console.log('err: ', err);
      }
    }*/
    // fetchData();
  }, [cart_items, shipping_details]);

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

  const removeFromCart = (item, qty) => {
    console.log('my item', item);
    // const item_id = cart_items.findIndex(el => el.id !== item.id);
    // console.log(item_id);
    // if (item_id === -1) {
    removeCartItem(item, qty);
    Alert.alert(
      'Remove from basket',
      `${qty} ${item.name} was removed to the basket.`,
    );

    // } else {
    /*Alert.alert(
        'Added to basket',
        `${qty} ${item.name} was added to the basket.`,
      );
      context.addToCart(item, qty);
    }*/
  };

  const renderFood = ({item}) => {
    if (item && !(item.images.indexOf('https') > -1)) {
      item.images = item.images ? item.images.replace('http', 'https') : '';
    }
    console.log(item);
    // item.images = item.images ? item.images.replace('http', 'https') : '';
    return (
      <CartListCard
        item={item}
        viewItem={viewItem}
        removeFromCart={removeFromCart}
      />
    );
  };

  function confirmMyOrder() {
    async function sendData() {
      try {
        const token = await getToken();
        const user = await getUser();
        console.log(token);
        let dt = {
          products: cart_items,
          shipping_details,
          user: JSON.parse(user).id
        }

        console.log(dt)
        const res = await _axios.post(`${BASE_URL}/confirm-order/`, dt, {
          headers: {Authorization: `Bearer ${token}`},
        });
        console.log(res)
      } catch (err) {
        console.log('err: ', err);
      }
    }
    sendData();
  }

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
      <View>
        <FlatList
          data={foods}
          renderItem={renderFood}
          contentContainerStyle={styles.list}
          keyExtractor={item => item.id.toString()}
        />
        <Text style={{fontSize: 24, color: 'white', textDecorationLine: 'underline'}}>Shipping Details</Text>
        <View
          style={{
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}>
          {(() => {
            let temp = [];
            for (let item in shipping_details) {
              temp.push(
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}>
                  <Text style={{fontSize: 16, color: 'white'}}>{item}: {shipping_details[item]}</Text>
                </View>,
              );
            }
            return temp;
          })().map(el => el)}
        </View>
      </View>
      <View
        style={{
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderStyle: 'solid',
          }}>
          <Text style={{fontSize: 26}}>Total: {total}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            confirmMyOrder();
          }}>
          Confirm
        </Button>
      </View>
    </View>
  );
};

import Icon from 'react-native-vector-icons/Octicons';
import CartListCard from '../components/CartListCard';
import Header from '../components/Header';
import Button from '../components/Button';

const MenuIcon = ({navigate}) => (
  <Icon
    name="three-bars"
    size={30}
    color="#fff"
    onPress={() => navigate('DrawerOpen')}
  />
);
/*FoodList.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      // style={styles.headerButton}
      // onPress={() => navigation.openDrawer()}
    >
      <MenuIcon name="menu" size={30} color="white" />
    </TouchableOpacity>
  ),
});*/

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

export default ConfirmOrder;
