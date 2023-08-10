import {
  ColorSchemeName,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useColorScheme from './src/hooks/useColorScheme';
// import Navigation from './src/navigation';

// import {Provider} from 'react-redux';
// import {Store} from './src/redux/store';
import {AppContext} from './GlobalContext';
// handling auth
import {ApolloProvider} from '@apollo/client';
import {client} from './src/apollo/Provider';
import {useEffect, useState, useContext} from 'react';

// import {Colors} from 'react-native-ui-lib';

import Colors from './src/assets/colors';
// import AppColors from './src/constants/Colors';

import {enableLatestRenderer} from 'react-native-maps';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotFoundScreen from './src/screens/NotFoundScreen';
import OrderDetails from './src/screens/Main/OrderDetails';
import Profile from './src/screens/Main/Profile';
import Accounts from './src/screens/Main/Accounts';
import Confirm from './src/screens/Main/Confirm';
import ConfirmOrder from './src/screens/Confirm';
// import EditProducts from './src/screens/Main/EditProducts';
import StoreEdit from './src/screens/Main/StoreEdit';
import Store from './src/screens/Main/Store';
import Onboarding from './src/screens/Auth/Onboarding';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Orders from './src/screens/Main/Orders';
import QuickBill from './src/screens/Main/QuickBill';
// import Sizes from './src/constants/Sizes';

import AntDesign from 'react-native-vector-icons/FontAwesome';

import {useSelector} from 'react-redux';

import _Store from './src/screens/Main/Store';

import {
  AuthStackParamList,
  RootStackParamList,
  RootTabParamList,
} from '../../types';
import Home from './src/screens/Home';
import FoodList from './src/screens/FoodList';
import ContactDriver from './src/screens/ContactDriver';
import {
  Dashboard,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  StartScreen,
} from './src/screens';
import {getSession, getToken} from './src/utils/common';
import FoodDetails from './src/screens/FoodDetails';
import {AppContextProvider} from './GlobalContext';
import {_axios} from './src/utils/_axios';
import Cart from "./src/screens/Cart";
import Shipping from "./src/screens/shipping";

require('react-native-ui-lib/config').setConfig({appScheme: 'default'});
enableLatestRenderer();

export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    /*Colors.loadColors({
          primary: '#1da371',
          text: colorScheme === 'dark' ? '#eee' : '#111',
        });
        Colors.loadSchemes(AppColors);*/
  }, [colorScheme]);

  return (
    <AppContextProvider>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar
          backgroundColor={Colors.$backgroundDefault}
          // barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          barStyle={'light-content'}
        />
      </SafeAreaProvider>
    </AppContextProvider>
  );
}

function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    console.log('hiiii');
    getSession().then(({token, role}) => {
      console.log(token, role);
      if (token) {
        if (role === 'user') {
          setUser({token, role});
          // navigation.navigate('Root');
        } else if (role === 'admin') {
          setUser(token, role);
          // navigation.navigate('RootUser');
        }

        // navigation.navigate('Root');
      } else {
        setUser(false);
      }
    });
  }, []);
  // const {user} = {};
  // const {user} = ((state: any) => state.userReducer);

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? (
        user.user === 'user' ? (
          <UserRootNavigator />
        ) : user.user === 'admin' ? (
          <RootNavigator />
        ) : (
          <UserRootNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
      {/*<AuthNavigator />*/}
      {/*  <UserRootNavigator />*/}
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
      <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          initialParams={{
            id: '' || undefined,
          }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen name="Confirm" component={Confirm} />
        <Stack.Screen name="EditProducts" component={EditProducts} />
        <Stack.Screen name="StoreEdit" component={StoreEdit} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function UserRootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={UserBottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
      <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          initialParams={{
            id: '' || undefined,
          }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen name="Confirm" component={Confirm} />
        {/*<Stack.Screen name="EditProducts" component={EditProducts} />*/}
        <Stack.Screen name="StoreEdit" component={StoreEdit} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Onboarding"
        component={StartScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Login', headerShown: false}}
      />
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{title: 'Register', headerShown: false}}
      />
      <AuthStack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{title: 'Register', headerShown: false}}
      />
      <AuthStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: 'Register', headerShown: false}}
      />
      <Stack.Screen name="Home" component={UserBottomTabNavigator} />
    </AuthStack.Navigator>
  );
}

function FoodListNavigator({navigation}) {
  const {cart_items} = useContext(AppContext);
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        name="Products"
        component={FoodList}
        options={{
          title: 'Products',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={{position: 'relative'}}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: cart_items.length ? 'green' : 'red',
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  borderRadius: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 8,
                    fontWeight: 'bold',
                  }}>
                  {cart_items.length}
                </Text>
              </View>
              <TabBarIcon
                name="cart-plus"
                size={20}
                color={'white'}
                style={{marginRight: 20}}
              />
            </TouchableOpacity>
          ),
        }}
        // initialParams={{subjects: screens}}
      />

      <Stack.Screen
        name="FoodDetails"
        component={FoodDetails}
        options={{title: 'Food Details', headerShown: true}}
        // initialParams={{subjects: screens}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{title: 'Cart', headerShown: true}}
        // initialParams={{subjects: screens}}
      />
      <Stack.Screen
        name="Shipping"
        component={Shipping}
        options={{title: 'Shipping', headerShown: true}}
        // initialParams={{subjects: screens}}
      />
      <Stack.Screen
        name="Confirm Order"
        component={ConfirmOrder}
        options={{title: 'Confirm Order', headerShown: true}}
        // initialParams={{subjects: screens}}
      />
    </AuthStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Store"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: Colors.$backgroundDefault,
        tabBarInactiveBackgroundColor: Colors.$backgroundDefault,
      }}>
      <BottomTab.Screen
        name="Store"
        component={Store}
        options={{
          title: 'Store',
          tabBarIcon: ({color}) => (
            // <TabBarIcon name="shoppingcart" color={color} />
            <Text style={{color: Colors.white}}>Inventory</Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="CakeList"
        component={FoodListNavigator}
        options={{
          title: 'CakeList',
          tabBarIcon: ({color}) => (
            // <TabBarIcon name="shoppingcart" color={color} />
            <Text style={{color: Colors.white}}>Products</Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="ContactDriver"
        component={ContactDriver}
        options={{
          title: 'ContactDriver',
          lazy: false,
          tabBarIcon: ({color}) => (
            <Text style={{color: Colors.white}}>Contact us</Text>
          ),
        }}
      />

      {/*<BottomTab.Screen
        name="Orders"
        component={Orders}
        options={{
          title: 'Orders',
          lazy: false,
          tabBarIcon: ({color}) => <TabBarIcon name="bars" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="QuickBill"
        component={QuickBill}
        options={{
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
          title: 'Quick Bill',
          tabBarIcon: ({color}) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />*/}
    </BottomTab.Navigator>
  );
}

function UserBottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="CakeList"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: Colors.$backgroundDefault,
        tabBarInactiveBackgroundColor: Colors.$backgroundDefault,
      }}>
      <BottomTab.Screen
        name="CakeList"
        component={FoodListNavigator}
        options={{
          title: 'CakeList',
          tabBarIcon: ({color}) => (
            <TabBarIcon name="list" color={color} size={30} />
            // <Text style={{color: Colors.white}}>Subjects</Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="ContactDriver"
        component={ContactDriver}
        options={{
          title: 'ContactDriver',
          lazy: false,
          tabBarIcon: ({color}) => (
            // <Text style={{color: Colors.white}}>Contact us</Text>
            <TabBarIcon name="phone" color={color} size={30} rotation={270} />
          ),
        }}
      />

      {/*<BottomTab.Screen
        name="Orders"
        component={Orders}
        options={{
          title: 'Orders',
          lazy: false,
          tabBarIcon: ({color}) => <TabBarIcon name="bars" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="QuickBill"
        component={QuickBill}
        options={{
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
          title: 'Quick Bill',
          tabBarIcon: ({color}) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />*/}
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign style={{marginBottom: -3}} {...props} />;
}
