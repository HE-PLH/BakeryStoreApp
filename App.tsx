import React from 'react';
// import {View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import About from './src/screens/About';
// const Stack = createStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function App() {
  return (
      <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
          </NavigationContainer>
  );
}

/*import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}*/
/*const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9AC4F8',
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};*/
/*const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9AC4F8',
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};*/
export default App;
