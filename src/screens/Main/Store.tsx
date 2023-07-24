import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NetworkStatus, useMutation, useQuery} from '@apollo/client';
import {useDispatch, useSelector} from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen from '../../components/Common/Screen';
import {Section} from '../../components/Common/Section';
import {BoldText} from '../../components/Common/Text';
import {View} from '../../components/Themed';
import OrderCard, {
  OrderProps,
  ProductProps,
} from '../../components/Store/OrderCard';
import {InventoryProduct} from './EditInventory';
import TabHeader from '../../components/Store/TabHeader';

import Colors from './../../assets/colors';

import {removeStore, setInventory, setStore} from '../../redux/Store/actions';

import {GET_STORE, STORE_UPDATE} from '../../apollo/graphql/Store/store';
import {
  ADD_INVENTORY,
  FETCH_INVENTORY,
  INVENTORY_UPDATE,
} from '../../apollo/graphql/Store/inventory';

// import {RootTabScreenProps} from '../../../types';
import Sizes from '../../constants/Sizes';
import {removeUser} from '../../redux/Common/actions';
import Stats from '../../components/Store/Stats';
import axios from 'axios';
import MyTable from "../../components/Store/MyTable";

export default function Store({navigation}) {
  // const {store} = useSelector((state: any) => state.storeReducer);
  const [editing, setEditing] = useState<boolean>(false);
  const [edited, setEdited] = useState<Array<ProductProps>>([]);
  const [inventoryProducts, setInventoryProducts] = useState<
    Array<ProductProps>
  >([]);

  /*const {id: inventoryId, inventory} = useSelector(
    (state: any) => state.inventoryReducer,
  );*/
  /*const {orders} = useSelector((state: any) => state.ordersReducer);*/
  // const {user} = useSelector((state: any) => state.userReducer);

  /*const dispatch: any = useDispatch();*/
  useEffect(() => {
    axios.get('https://joylink-server.up.railway.app/api/stocks').then(response => {
      setInventoryProducts(response.data.info);
    });
  }, []);

  function addToEdited(item: ProductProps) {
    let items = [...edited];
    let i = items.findIndex(e => e.id === item.id);

    if (i <= -1) {
      items = [...items].concat({
        ...item,
        quantity: {...item.quantity, units: item.quantity.units + 1 || 1},
      });
    } else {
      items[i] = {
        ...items[i],
        quantity: {...items[i].quantity, units: item.quantity.units + 1},
      };
    }
    setEdited(items);
  }

  /*function removeFromEdited(item: ProductProps) {
    const items = [...edited];
    var i = items.findIndex(e => e.id === item.id);

    if (i > -1) {
      var u = items[i].quantity.units - 1;

      if (u > 0) {
        items.splice(i, 1);
        var newItems = [...items].concat({
          ...item,
          quantity: {...item.quantity, units: u},
        });
        setEdited(newItems);
      } else {
        items.splice(i, 1);
        setEdited(items);
      }
    }
  }*/

  /*const [edit, {loading}] = useMutation(ADD_INVENTORY, {
    variables: {
      products: edited,
    },
    onCompleted(data) {
      if (data.addToInventory) {
        setEdited([]);
        setEditing(false);
      }
    },
    onError(error) {
      console.log(edited);
      console.log({...error});
    },
  });*/

  /*const {
    loading: fetchingInventory,
    subscribeToMore: subscribeToInventory,
    refetch: refetchInventory,
    networkStatus: inventoryNetworkStatus,
  } = useQuery(FETCH_INVENTORY, {
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      if (data.getInventory) {
        dispatch(setInventory(data.getInventory));
        setInventoryProducts(data.getInventory.products);
      }
    },
    onError(error) {
      if (error.graphQLErrors[0]) {
        console.log('Error fetching inventory');
      }
    },
  });
*/
  /*useEffect(() => {
    if (user?.id) {
      const unsubscribe = subscribeToStore({
        document: STORE_UPDATE,
        variables: {id: user.id},
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const updatedQueryData = subscriptionData.data.storeUpdate;
          dispatch(setStore(updatedQueryData));
          return Object.assign({}, prev, {
            getStore: updatedQueryData,
          });
        },
      });
      return unsubscribe;
    }
  }, [user]);*/

  /*useEffect(() => {
    if (inventoryId) {

    }
  }, [inventoryId]);*/

  useEffect(() => {
    let i = [...inventoryProducts];
    edited.forEach((p: ProductProps) => {
      const index = inventoryProducts.findIndex(
        (e: ProductProps) => e.id === p.id,
      );
      if (index <= -1) {
        i = [...i].concat({...p, quantity: {...p.quantity, units: 1}});
      } else {
        i[index] = {...p};
      }
    });
    setInventoryProducts(i);
  }, [edited]);

  /*if (fetchingStore || fetchingInventory) {
    return (
      <Screen>
        <View flex center>
          <BoldText text70>Fetching store details...</BoldText>
        </View>
      </Screen>
    );
  }*/

  return (

    <Screen>
      {edited.length > 0 ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            margin: 30,
            zIndex: 999,
            width: '90%',
            backgroundColor: 'transparent',
          }}>
          <TouchableOpacity
            backgroundColor={Colors.primary}
            disabledBackgroundColor={Colors.$iconDisabled}
            round={false}
            borderRadius={10}
            // onPress={() => edit({variables: {products: edited}})}
          >Confirm edit</TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            height: 50,
            width: 50,
            borderRadius: 10,
            backgroundColor: Colors.primary,
            margin: 30,
            zIndex: 999,
            // shadow
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          center
          onPress={() => navigation.navigate('EditInventory')}>
          <MaterialCommunityIcons
            name="pencil"
            color={Colors.white}
            // size={Sizes.icon.header}
          />
        </TouchableOpacity>
      )}
      <TabHeader
        icon="user"
        name={'Store Name'}
        logo={false}
        iconPress={() => navigation.navigate('Profile')}
        namePress={() => {}}
      />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: number) => item.toString()}
        contentContainerStyle={{paddingBottom: 100}}
        renderItem={() => (
          <>
            <Section
              title="Pending Orders"
              subtitle={
                ['orders'].length === 0
                  ? 'All pending orders will show here. You have none as of now.'
                  : 'Once accepted, view in Orders tab'
              }
              body={
              <View />
                /*<FlatList
                  data={['orders'].filter(
                    (order: any) => order.state.order.accepted === false,
                  )}
                  extraData={['orders']}
                  keyExtractor={(item: OrderProps) => item.id.toString()}
                  renderItem={({item}) => (
                    <OrderCard
                      onPress={() =>
                        navigation.navigate('OrderDetails', {
                          id: item.id,
                        })
                      }
                      id={item.id}
                      products={item.products}
                      state={item.state}
                      loading={false}
                      screen={false}
                    />
                  )}
                />*/
              }
            />
            <Section
              title="Inventory"
              subtitle={
                'All products in your store are displayed here. Search or Add products here'
              }
              body={
                <View flex>
                  {console.log(inventoryProducts)}
                  {inventoryProducts.length > 0 && (

                    <>
                       <TouchableOpacity
                        onPress={() => navigation.navigate("EditInventory")}
                        placeholder="Search Products..."
                      />
                      <MyTable data={inventoryProducts}/>
                    </>
                  )}
                </View>
              }
            />
          </>
        )}
      />
    </Screen>
  );
}
