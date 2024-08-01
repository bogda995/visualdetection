import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000/', // Use environment variable or fallback to local
});

export default instance;
