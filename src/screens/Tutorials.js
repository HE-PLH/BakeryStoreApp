// ./screens/About.js

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {getToken} from '../utils/common';
import {_axios} from '../utils/_axios';
import Header from '../components/Header';
const BASE_URL =
  'https://tamupatisserieserver-production.up.railway.app/api/v1';
const screenWidth = Dimensions.get('window').width;


const Tutorials = () => {
  const [tutorial, setTutorial] = useState([]);
  useEffect(() => {
    console.log('tutorials');
    async function fetchData() {
      try {
        const token = await getToken();
        console.log(token);
        const res = await _axios.get(`${BASE_URL}/tutorial/`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        // console.log(res.data);
        setTutorial(res.data);
      } catch (err) {
        console.log('err: ', err);
      }
    }
    fetchData();
  }, []);
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <View style={{
          width: '100%',
          height: 50,
          backgroundColor: 'gray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      }}>
        <Text style={{
            color: '#fff',
            fontSize: 20,
            fontFamily: 'Helvetica',
            textTransform: 'uppercase',
        }}>Welcome to our tutorial section</Text>
      </View>
      {tutorial.length
        ? tutorial.map((item, index) => {
            console.log(item.images);
            return <View style={{
                padding: 10,
            }}>
                <Header>{index+1+ ' ' + item.title}</Header>
                <View style={{backgroundColor: 'purple'}}>
                    <Text>
                        {item.description}
                    </Text>
                    <Image style={styles.image} source={{uri: `${item.images}`}} />
                </View>
            </View>
                ;
          })
        : null}
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
    image: {
    width: screenWidth - 20,
    height: 300,
    marginBottom: 5,
  },
});

export default Tutorials;
