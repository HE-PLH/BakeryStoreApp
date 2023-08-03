import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import {_axios} from './../utils/_axios';

import Config from 'react-native-config';

// import NavHeaderRight from '../components/NavHeaderRight';
import ListCard from '../components/ListCard';
import {getToken} from "../utils/common";

const BASE_URL = 'https://tamupatisserieserver-production.up.railway.app/api/v1';

class FoodList extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Hungry?',
      // headerRight: (
      //   <NavHeaderRight toScreen={'OrderSummary'} buttonText={'View Basket'} />
      // ),
    };
  };
  //

  state = {
    foods: [],
    query: '',
  };
  //

  async componentDidMount() {
    let foods_response = []
    try {
      getToken().then((token)=>{
        console.log(token)
        _axios.get(`${BASE_URL}/inventory`, {headers: {Authorization: `Bearer ${token}`}}).then((res)=>{
          foods_response = res;
          this.setState({
            foods: foods_response.data,
          });

        })

      })



    } catch (err) {
      console.log('err: ', err);
    }
  }

  onChangeQuery = text => {
    this.setState({
      query: text,
    });
  };


  render() {
    console.log(this.state)
    const {foods, query} = this.state;

    return (
      <View style={styles.wrapper}>
        <View style={styles.topWrapper}>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onChangeQuery}
              value={query}
              placeholder={'What are you craving for?'}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => this.filterList()}
              title="Go"
              color="#c53c3c"
            />
          </View>
        </View>

        <FlatList
          data={foods}
          renderItem={this.renderFood}
          contentContainerStyle={styles.list}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
  //

  filterList = async () => {
    const {query} = this.state;
    const foods_response = await axios.get(`${BASE_URL}/foods?query=${query}`);

    this.setState({
      foods: foods_response.data,
      query: '',
    });
  };

  viewItem = item => {
    this.props.navigation.navigate('FoodDetails', {
      item,
    });
  };

  renderFood = ({item}) => {
    console.log(item)
    return <ListCard item={item} viewItem={this.viewItem} />;
  };
}
//

const styles = StyleSheet.create({
  headerButtonContainer: {
    marginRight: 10,
  },
  wrapper: {
    flex: 1,
    padding: 10,
  },
  topWrapper: {
    flexDirection: 'row',
  },
  textInputWrapper: {
    flex: 4,
  },
  textInput: {
    height: 35,
    borderColor: '#5d5d5d',
    borderWidth: 1,
  },
  buttonWrapper: {
    flex: 1,
  },
  list: {
    marginTop: 20,
  },
});

export default FoodList;
