import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
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
import DateTimeField from '../components/DateTimeField';

export default function Shipping({navigation}) {
  const {shipping_details, setShippingDetails} = useContext(AppContext);
  const [name, setName] = useState({
    value: '',
    error: 'Name is empty',
  });
  const [county, setCounty] = useState({
    value: '',
    error: 'County cannot be empty',
  });
  const [city, setCity] = useState({
    value: '',
    error: 'Enter your delivery city',
  });
  const [phone, setPhone] = useState({
    value: '',
    error: 'Enter your phone number',
  });
  const [preferredDeliveryDateTime, setPreferredDeliveryDateTime] = useState({
    value: '',
    error: 'Enter your preferredDeliveryDateTime',
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setName({value: shipping_details.name, error: ''});
    setCounty({value: shipping_details.county, error: ''});
    setCity({value: shipping_details.city, error: ''});
    setPhone({value: shipping_details.phone, error: ''});
    setPreferredDeliveryDateTime({
      value: shipping_details.preferredDeliveryDateTime,
      error: '',
    });
  }, [shipping_details]);
  const onShippingPressed = () => {
    const nameError = nameValidator(name.value, name.error);
    const countyError = nameValidator(county.value, county.error);
    const cityError = nameValidator(city.value, city.error);
    const phoneError = nameValidator(phone.value, phone.error);
    const preferredDeliveryDateTimeError = nameValidator(
      preferredDeliveryDateTime.value,
      preferredDeliveryDateTime.error,
    );

    if (countyError || cityError || nameError || phoneError) {
      setName({...name, error: nameError});
      setCounty({...county, error: countyError});
      setCity({...city, error: cityError});
      setPhone({...phone, error: phoneError});
      setPhone({
        ...preferredDeliveryDateTime,
        error: preferredDeliveryDateTimeError,
      });
      return;
    }

    console.log(name);
    console.log(county);
    console.log(city);
    console.log(phone);
    console.log(preferredDeliveryDateTime);

    let formObject = {
      name: name.value,
      county: county.value,
      city: city.value,
      phone: phone.value,
      preferredDeliveryDateTime: date,
    };
    // console.log('formObj', formObject);

    setShippingDetails(formObject, () => {
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
      <ScrollView>
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
        label="County"
        returnKeyType="next"
        value={county.value}
        onChangeText={text =>
          setCounty({value: text, error: 'County cannot be empty'})
        }
        error={!!county.error}
        errorText={county.error}
        autoCapitalize="none"
        autoCompleteType="county"
        textContentType="countyName"
        keyboardType="county-name"
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

      <TextInput
        date={date}
        label="Preferred Delivery Date"
        returnKeyType="done"
        disabled
        // value={preferredDeliveryDateTime.value}
        value={date.toLocaleString()}
        onChangeText={text =>
          setPreferredDeliveryDateTime({
            value: text,
            error: 'Enter your Preferred delivery',
          })
        }
        error={!!preferredDeliveryDateTime.error}
        errorText={preferredDeliveryDateTime.error}
      />
      <DateTimeField
        setDate={setDate}
        date={date}
        label="set Preferred Delivery Date"
        returnKeyType="done"
        value={preferredDeliveryDateTime.value}
        onChangeText={text =>
          setPreferredDeliveryDateTime({
            value: text,
            error: 'Enter your Preferred delivery',
          })
        }
        error={!!preferredDeliveryDateTime.error}
        errorText={preferredDeliveryDateTime.error}
      />
      <Button
        mode="contained"
        onPress={onShippingPressed}
        style={{marginTop: 24}}>
        Checkout
      </Button>

    </Background>
          </ScrollView>
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
