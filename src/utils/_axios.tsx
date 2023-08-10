import axios from 'axios';
import {getToken} from './common';

const _axios = axios.create({
  baseURL: 'https://tamuserver-production.up.railway.app',
  // baseURL: 'http://192.168.100.5:8000',
  withCredentials: true,
});

const _config = {
  headers: {Authorization: `Bearer ${getToken()}`},
};

export {_axios, _config};
