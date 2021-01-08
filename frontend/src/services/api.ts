import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 5000,
});

//TODO - usar REACT_APP_API_URL

export default api;