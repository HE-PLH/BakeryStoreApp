import React from 'react';
import {View, Text, Image, Button, Dimensions, StyleSheet} from 'react-native';

import Config from 'react-native-config';

import SimpleStepper from 'react-native-simple-stepper';
const screenWidth = Dimensions.get('window').width;

const BASE_URL = 'https://tamupatisserieserver-production.up.railway.app/api/v1';

const PageCard = ({item, qty, qtyChanged, addToCart}) => {
  const {id, images, price, quantity} = item;
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={{uri: `${images}`}} />

      <View style={styles.smallItemContainer}>
        <Text style={styles.mainText}>{item.name}</Text>
      </View>

      <View style={styles.smallItemContainer}>
        <Text style={styles.subText1}>{item.description}</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.priceText}>Ksh {price}</Text>
      </View>

      <View style={styles.smallItemContainer}>
        <Text style={styles.labelText}>How many?</Text>
      </View>

      <View style={styles.itemContainer}>
        <SimpleStepper
              valueChanged={value => qtyChanged(value)}
              initialValue={1}
              stepValue={0.25}
              minimumValue={0.25}
              maximumValue={100}
              showText={true}
              containerStyle={styles.stepperContainer}
              incrementImageStyle={styles.stepperButton}
              decrementImageStyle={styles.dstepperButton}
              textStyle={styles.stepperText}
            />
      </View>

      <View style={styles.itemContainer}>
        <Button
          onPress={() => {
            addToCart(item, qty);
          }}
          title="Add to Basket"
          color="#c53c3c"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 20,
    height: 300,
    marginBottom: 5,
  },
  stepperContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  itemContainer: {
    marginBottom: 20,
  },
  smallItemContainer: {
    marginBottom: 5,
  },
  mainText: {
    fontSize: 20,
  },
  subText: {
    fontSize: 14,
    color: '#ece3e3',
  },
  subText1: {
    fontSize: 14,
    color: 'orange',
  },
  priceText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 18,
    color: '#a6afc2',
  },
  stepperButton: {
    height: 20,
    width: 20,
    backgroundColor: '#197919',
  },
  dstepperButton: {
    height: 20,
    width: 20,
    backgroundColor: '#da2828',
  },
  stepperText: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PageCard;
