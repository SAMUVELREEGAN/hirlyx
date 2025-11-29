import axios from 'axios';

export const BASE_URL = "http://192.168.1.5:8000";  // your backend

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});
