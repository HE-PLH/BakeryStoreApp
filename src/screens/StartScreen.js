import React, {useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
// import {getSession, getToken} from '../utils/common';

export default function StartScreen({navigation}) {


  return (
    <Background>
      <Logo />
      <Header>Tamu Praisserie</Header>
      <Paragraph>Make your order today</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Sign Up
      </Button>
    </Background>
  );
}
