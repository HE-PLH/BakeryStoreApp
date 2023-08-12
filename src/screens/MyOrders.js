import React, {useState, useContext, useEffect, Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
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
import Header from '../components/Header';

const TOP_BASE_URL = 'https://tamupatisserieserver-production.up.railway.app';
const BASE_URL = 'https://tamupatisserieserver-production.up.railway.app/api/v1';
// const BASE_URL = 'http://192.168.100.5:8000/api/v1';

const MyOrders = props => {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState('');
  const [initial_list, setInitialList] = useState([]);
  const [total, setTotal] = useState(0);
  const {cart_items, removeCartItem} = useContext(AppContext);

  useEffect(() => {
    /*setFoods(cart_items);
    setInitialList(cart_items);
    let amount = 0;
    if (cart_items.length) {
      amount = cart_items.reduce((acc, item) => {
        return acc + parseFloat(item.price) * parseFloat(item.qty);
      }, 0);
    }
    setTotal(amount);*/
    async function fetchData() {
      try {
        const user = await getUser();
        const token = await getToken();
        // console.log(user);
        getSession().then(async session => {
          const res = await _axios.post(
            `${BASE_URL}/get-user-orders/`,
            {user: session.user.id},
            {
              headers: {Authorization: `Bearer ${session.token}`},
            },
          );
          // console.log(res.data);
          setFoods(res.data);
        });
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
    // if (item && !(item.images.indexOf('https') > -1)) {
    //   item.images = item.images ? item.images.replace('http', 'https') : '';
    // }

    // item.images = item.images ? item.images.replace('http', 'https') : '';
    if (item.product_obj && !(item.product_obj.images.indexOf('https') > -1)) {
      item.product_obj.images = item.product_obj.images
        ? TOP_BASE_URL + item.product_obj.images.replace('http', 'https')
        : '';
    }
    // console.log('item', item.product_obj);
    // console.log(item);
    // item.images = item.images ? item.images.replace('http', 'https') : '';
    return <ListCard item={item.product_obj} viewItem={viewItem} />;
  };

  return (
    <View style={styles.wrapper}>
      {foods
        ? (() => {
            let temp = [];

            for (let item in foods) {
              temp.push(
                <View>
                  <Header>{'Order' + foods[item].order.id}</Header>
                  <Text>{foods[item].order.order_date}</Text>

                  {foods[item].data[0].map(it => {
                    return renderFood({item: it});
                  })}
                  {/*<FlatList
                    data={foods[item].data[0]}
                    renderItem={renderFood}
                    contentContainerStyle={styles.list}
                    // keyExtractor={it => it.data.id.toString()}
                  />*/}
                </View>,
              );
            }
            return temp;
          })().map(el => el)
        : null}
      {/*<FlatList
        data={foods}
        renderItem={renderFood}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id.toString()}
      />*/}
      {/*<View style={{height: 100, display: 'flex', justifyContent: 'center'}}>
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
        <Btn
          mode="contained"
          onPress={() => {
            props.navigation.navigate('Shipping');
          }}>
          Proceed to Checkout
        </Btn>
      </View>*/}
    </View>
  );
};

import Icon from 'react-native-vector-icons/Octicons';
import CartListCard from '../components/CartListCard';

import Btn from '../components/Button';

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
    overflow: 'scroll',
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

export default MyOrders;
