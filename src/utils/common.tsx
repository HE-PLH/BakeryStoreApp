import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get the token from AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    return null;
  }
};
export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  } catch (error) {
    console.error('Error getting user from AsyncStorage:', error);
    return null;
  }
};
// Function to get the token from AsyncStorage
export const getSession = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    const user = await AsyncStorage.getItem('user');
    return {token, role, user: JSON.parse(user)};
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    return null;
  }
};

// Function to save the token to AsyncStorage
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('Token saved successfully');
  } catch (error) {
    console.error('Error saving token to AsyncStorage:', error);
  }
};

// Function to save the session to AsyncStorage
export const saveSession = async (token, role, user) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('role', role);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('Token saved successfully');
  } catch (error) {
    console.error('Error saving token to AsyncStorage:', error);
  }
};

// Function to remove the token from AsyncStorage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('Token removed successfully');
  } catch (error) {
    console.error('Error removing token from AsyncStorage:', error);
  }
};
// Function to remove the token from AsyncStorage
export const removeSession = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('user');
    console.log('Token removed successfully');
  } catch (error) {
    console.error('Error removing token from AsyncStorage:', error);
  }
};
