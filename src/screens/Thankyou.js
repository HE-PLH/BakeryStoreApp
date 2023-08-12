import React, {useState, useContext, useEffect, Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {_axios} from './../utils/_axios';

import Config from 'react-native-config';

// import NavHeaderRight from '../components/NavHeaderRight';
import ListCard from '../components/ListCard';
import {getSession, getToken, getUser} from '../utils/common';
// import NavHeaderRight from "../components/NavHeaderRight";
import {AppContext} from './../../GlobalContext';

import Icon from 'react-native-vector-icons/Octicons';
import CartListCard from '../components/CartListCard';
import Header from '../components/Header';
import Button from '../components/Button';
import AntDesign from 'react-native-vector-icons/FontAwesome';

const BASE_URL = 'https://tamupatisserieserver-production.up.railway.app/api/v1';
// const BASE_URL = 'http://192.168.100.5:8000/api/v1';

const Thankyou = props => {
  const {clearCart} = useContext(AppContext);
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View>
        <AntDesign
          style={{marginBottom: -3}}
          name="cart-plus"
          size={20}
          color={'white'}
        />

        {/*<TabBarIcon
                name="cart-plus"
                size={20}
                color={'white'}
                style={{marginRight: 20}}
              />*/}
        <Image source={{uri: './../assets/success.png'}} />
        <Header>Thank you for shopping with us</Header>
        <Header>Your Delivery is on the way</Header>
      </View>
    </View>
  );
};

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
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export default Thankyou;
