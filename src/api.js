// src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // The base URL for your Django API
});

export default instance;