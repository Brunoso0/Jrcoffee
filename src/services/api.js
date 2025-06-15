// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jrcoffee.com.br:5002'
});

export default api;
