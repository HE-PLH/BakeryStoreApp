// ./screens/Profile.js

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, BackHandler} from 'react-native';
import {getUser, removeSession} from '../utils/common';
import Button from '../components/Button';
import Header from '../components/Header';

const Profile = ({navigation}) => {
  const [user, setUser] = useState({username: '', email: '', date_joined: ''});
  useEffect(() => {
    getUser().then(res => {
      console.log(res);
      setUser(res);
    });
  }, []);

  const logout = () => {
    removeSession().then(r => {
      navigation.navigate('Onboarding');
      BackHandler.exitApp();
    });
  };

  return (
    <View style={{backgroundColor: 'white', ...styles.center}}>
      {user ? (
        <>
          <Header>{user.username}</Header>
          <Header>{user.email}</Header>
          <Header>{user.date_joined}</Header>
        </>
      ) : null}
      <Button onPress={logout} mode={'contained'}>
        Logout and Exit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Profile;
