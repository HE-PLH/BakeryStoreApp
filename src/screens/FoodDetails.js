import React, {useState, useContext, Component, useEffect} from 'react';
import {View, Button, Alert} from 'react-native';

import NavHeaderRight from '../components/NavHeaderRight';
import PageCard from '../components/PageCard';

import {AppContext} from '../../GlobalContext';

const FoodDetails = props => {
  const [qty, setQty] = useState(1);
  const {navigation, route} = props;

  const [item, setItem] = useState({});

  const context = useContext(AppContext);

  useEffect(() => {
    let _item = {};
    if (route.params) {
      _item = route.params.item;
    }
    // console.log('paraaaams', route.params.item)
    // _item = {
    //   category: 'Cake',
    //   date: '2023-08-04',
    //   description: 'Best Cake in town',
    //   id: 11,
    //   images:
    //     'http://tamuserver-production.up.railway.app/static/images/black-forest-cake-cover-picture_k8F0ivA.jpg',
    //   name: 'Black Forest',
    //   price: 120,
    //   quantity: 5,
    //   time: '12:04:39',
    // };
    setItem(_item);
  }, props);
  const qtyChanged = value => {
    const nextValue = Number(value);
    setQty(nextValue);
  };

  const addToCart = (item, qty) => {
    const item_id = context.cart_items.findIndex(el => el.id !== item.id);
    console.log(item_id);
    // if (item_id === -1) {
    context.addToCart(item, qty);
    Alert.alert(
      'Added to basket',
      `${qty} ${item.name} was added to the basket.`,
    );

    // } else {
    /*Alert.alert(
        'Added to basket',
        `${qty} ${item.name} was added to the basket.`,
      );
      context.addToCart(item, qty);
    }*/
  };

  return (
    <PageCard
      item={item}
      qty={qty}
      qtyChanged={qtyChanged}
      addToCart={addToCart}
    />
  );
};

FoodDetails.navigationOptions = ({navigation, route}) => {
  return {
    title: route.params.item.name.substr(0, 12) + '...',
    /*headerRight: (
      <NavHeaderRight toScreen={'OrderSummary'} buttonText={'View Basket'} />
    ),*/
  };
};

export default FoodDetails;
