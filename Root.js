import React, {Component} from 'react';
// import {YellowBox} from 'react-native';



import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';


import FoodList from './src/screens/FoodList';
import FoodDetails from './src/screens/FoodDetails';
// import OrderSummary from './src/screens/OrderSummary';
// import TrackOrder from './src/screens/TrackOrder';
import ContactDriver from './src/screens/ContactDriver';

// YellowBox.ignoreWarnings(['Setting a timer']);

function RootNavigator() {
  return (
     <NavigationContainer>
        <Stack.Navigator>

            <Stack.Screen name="FoodList" component={FoodList} />
            <Stack.Screen name="FoodDetails" component={FoodDetails} />
            {/*<Stack.Screen name="OrderSummary" component={OrderSummary} />*/}
            {/*<Stack.Screen name="TrackOrder" component={TrackOrder} />*/}
            <Stack.Screen name="ContactDriver" component={ContactDriver} />

        </Stack.Navigator>
    </NavigationContainer>
  );
}

class Router extends Component {
  render() {

    return <RootNavigator />;
  }
}

export default Router;


/*

import {ColorSchemeName, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useColorScheme from './src/hooks/useColorScheme';
// import Navigation from './src/navigation';

import {Provider} from 'react-redux';
// import {Store} from './src/redux/store';


// handling auth
import {ApolloProvider} from '@apollo/client';
import {client} from './src/apollo/Provider';
import {useEffect} from 'react';

// import {Colors} from 'react-native-ui-lib';

import Colors from './src/assets/colors'
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
import EditInventory from './src/screens/Main/EditInventory';
import StoreEdit from './src/screens/Main/StoreEdit';
import Store from './src/screens/Main/Store';
import Onboarding from './src/screens/Auth/Onboarding';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Orders from './src/screens/Main/Orders';
import QuickBill from './src/screens/Main/QuickBill';
// import Sizes from './src/constants/Sizes';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {useSelector} from 'react-redux';


import _Store from './src/screens/Main/Store';



import {
  AuthStackParamList,
  RootStackParamList,
  RootTabParamList,
} from '../../types';
import Home from "./src/screens/Home";

require('react-native-ui-lib/config').setConfig({appScheme: 'default'});
enableLatestRenderer();

export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    /!*Colors.loadColors({
      primary: '#1da371',
      text: colorScheme === 'dark' ? '#eee' : '#111',
    });
    Colors.loadSchemes(AppColors);*!/
  }, [colorScheme]);

  return (
    <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar
            backgroundColor={Colors.$backgroundDefault}
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          />
    </SafeAreaProvider>
  );
}

function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  // const {user} = {user: {name: 'Pk'}};
  // const {user} = useSelector((state: any) => state.userReducer);

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/!*{user ? <RootNavigator /> : <AuthNavigator />}*!/}
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
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
        <Stack.Screen name="EditInventory" component={EditInventory} />
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
        component={Onboarding}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login', headerShown: false}}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{title: 'Register', headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

/!**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 *!/
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
            <TabBarIcon name="shoppingcart" color={color} />
          ),
        }}
      />
      {/!*<BottomTab.Screen
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
      />*!/}
    </BottomTab.Navigator>
  );
}

/!**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 *!/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return (
    <AntDesign style={{marginBottom: -3}} {...props} />
  );
}
*/
