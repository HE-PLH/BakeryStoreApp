import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {nameValidator} from '../helpers/nameValidator';

import {_axios} from './../utils/_axios';
import setUserSession, {getUser} from './../utils/common';
import {AppContext} from '../../GlobalContext';

export default function Shipping({navigation}) {
  const {shipping_details, setShippingDetails} = useContext(AppContext);
  const [name, setName] = useState({
    value: '',
    error: 'Name is empty',
  });
  const [country, setCountry] = useState({
    value: '',
    error: 'Country cannot be empty',
  });
  const [city, setCity] = useState({
    value: '',
    error: 'Enter your delivery city',
  });
  const [phone, setPhone] = useState({
    value: '',
    error: 'Enter your phone number',
  });

  useEffect(() => {
    setName({value: shipping_details.name, error: ''});
    setCountry({value: shipping_details.country, error: ''});
    setCity({value: shipping_details.city, error: ''});
    setPhone({value: shipping_details.phone, error: ''});
  }, [shipping_details]);
  const onShippingPressed = () => {
    const nameError = nameValidator(name.value, name.error);
    const countryError = nameValidator(country.value, country.error);
    const cityError = nameValidator(city.value, city.error);
    const phoneError = nameValidator(phone.value, phone.error);

    if (countryError || cityError || nameError || phoneError) {
      setName({...name, error: nameError});
      setCountry({...country, error: countryError});
      setCity({...city, error: cityError});
      setPhone({...phone, error: phoneError});
      return;
    }

    console.log(name);
    console.log(country);
    console.log(city);
    console.log(phone);

    let formObject = {
      name: name.value,
      country: country.value,
      city: city.value,
      phone: phone.value,
    };
    console.log('formObj', formObject)
    setShippingDetails(formObject, ()=>{
      navigation.navigate('Confirm Order');
    });

    /*_axios.post('/api/v1/auth/order/', orderObject).then(response => {
      _axios.post('/api/v1/auth/delivery/', deliveryObject).then(response => {
        if (response.status !== 201) {
          console.log(response.error);
        } else {
          console.log(response.data);
          // setUserSession(response.data.access_token, "Admin", response.data)
          navigation.navigate('LoginScreen');
          // navigate("/training");
        }
      });
    });*/
    /*navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })*/
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Shipping Details</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: 'Name is empty'})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Country"
        returnKeyType="next"
        value={country.value}
        onChangeText={text =>
          setCountry({value: text, error: 'Country cannot be empty'})
        }
        error={!!country.error}
        errorText={country.error}
        autoCapitalize="none"
        autoCompleteType="country"
        textContentType="countryName"
        keyboardType="country-name"
      />
      <TextInput
        label="City"
        returnKeyType="done"
        value={city.value}
        onChangeText={text =>
          setCity({value: text, error: 'Enter your delivery city'})
        }
        error={!!city.error}
        errorText={city.error}
      />
      <TextInput
        label="Phone Number"
        returnKeyType="done"
        value={phone.value}
        onChangeText={text =>
          setPhone({value: text, error: 'Enter your phone number'})
        }
        error={!!phone.error}
        errorText={phone.error}
      />
      <Button
        mode="contained"
        onPress={onShippingPressed}
        style={{marginTop: 24}}>
        Checkout
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
