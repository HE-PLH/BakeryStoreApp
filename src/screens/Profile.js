// ./screens/Profile.js

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getUser, removeSession} from '../utils/common';
import Button from '../components/Button';
import Header from '../components/Header';

const Profile = ({navigation}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser().then(res => {
      console.log(res);
      setUser(res);
    });
  }, []);

  const logout = () => {
    removeSession().then(r => navigation.navigate('StartSreen'));
  }

  return (
    <View style={{backgroundColor: 'white', ...styles.center}}>
      {user.username?<>
      <Header>{user.username}</Header>
      <Header>{user.email}</Header>
      <Header>{user.date_joined}</Header>
      <Button mode={'contained'}>Logout</Button>
          </>:null
      }
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
