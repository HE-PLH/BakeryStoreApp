// ./screens/About.js

import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    ScrollView,
    RefreshControl, Alert,
} from 'react-native';
import {getToken} from '../utils/common';
import {_axios} from '../utils/_axios';
import Header from '../components/Header';
import HTML from 'react-native-render-html';

const BASE_URL =
  'https://tamupatisserieserver-production.up.railway.app/api/v1';
const screenWidth = Dimensions.get('window').width;

const Tutorials = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData(() => {
      setRefreshing(false);
    });
    /*setTimeout(() => {
      setRefreshing(false);
    }, 2000);*/
  }, []);
  const [tutorial, setTutorial] = useState([]);
  async function fetchData(f = () => {}) {
    try {
      const token = await getToken();
      console.log(token);
      const res = await _axios.get(`${BASE_URL}/tutorial/`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log(res.data);
      f();
      setTutorial(res.data);
    } catch (err) {
        f();
      console.log('err: ', err);
      Alert.alert(
      'Added to basket',
      'err: '+ err,
    );
    }
  }
  useEffect(() => {
    console.log('tutorials');
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
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'gray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontFamily: 'Helvetica',
            textTransform: 'uppercase',
          }}>
          Welcome to our tutorial section
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {tutorial.length
          ? tutorial.map((item, index) => {
              console.log(item.images);
              return (
                <View
                  style={{
                    padding: 10,
                  }}>
                  <Header>{index + 1 + ' ' + item.title}</Header>

                  <View style={{backgroundColor: 'purple'}}>
                    <HTML source={{html: item.description}} />
                  </View>
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

const HTMLViewer = ({htmlContent}) => {
  return (
    <WebView
      source={{html: htmlContent}} // Pass your HTML content here
      style={styles.webview}
    />
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
  webview: {
    width: 300,
    height: 200,
  },
});

export default Tutorials;
