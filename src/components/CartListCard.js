import React, {useState} from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import Button from './Button';
import SimpleStepper from 'react-native-simple-stepper';

const CartListCard = ({item, viewItem, removeFromCart}) => {
  const [qty, setQty] = useState(1);
  const qtyChanged = value => {
    const nextValue = value;
    setQty(nextValue);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        viewItem(item);
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: `${item.images}`}} />
        </View>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>Ksh {item.price}</Text>
          <View
            style={{
              alignItems: 'flex-end',
              display: 'flex',
              flexDirection: 'row',
              bottom: 0,
              position: 'absolute',
              justifyContent: 'space-between',
            }}>
            <SimpleStepper
              valueChanged={value => qtyChanged(value)}
              initialValue={item.qty}
              stepValue={0.25}
              minimumValue={0.25}
              maximumValue={100}
              showText={true}
              containerStyle={styles.stepperContainer}
              incrementImageStyle={styles.stepperButton}
              decrementImageStyle={styles.dstepperButton}
              textStyle={styles.stepperText}
            />
            <TouchableOpacity
              onPress={() => {
                removeFromCart(item, qty);
              }}
              style={{
                height: 30,
                alignItems: 'center',
                display: 'flex',
                marginLeft: 10,
                paddingLeft: 5,
                paddingRight: 5,
                ...styles.stepperContainer,
              }}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  //
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#f60808',
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

export default CartListCard;
