import axios from 'axios';
import {getToken} from "./common";

const _axios = axios.create({
  baseURL: 'https://tamupatisserieserver-production.up.railway.app',
  withCredentials: true
});

const _config = {
    headers: { Authorization: `Bearer ${getToken()}` }
};

export {_axios, _config};