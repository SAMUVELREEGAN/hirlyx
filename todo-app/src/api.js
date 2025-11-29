import axios from 'axios';

// Adjust this URL to match your Django server
const BASE_URL = 'http://192.168.1.27:8000/api/'; // Your computer's IP

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add token to all requests
api.interceptors.request.use(
  async (config) => {
    // Skip auth for login/signup endpoints
    if (config.url.includes('/login/') || config.url.includes('/signup/')) {
      return config;
    }
    
    // Add token for other requests
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error getting token:', error);
    }
    
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.log('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Handle unauthorized errors
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeToken();
      // You might want to redirect to login here
    }
    
    return Promise.reject(error);
  }
);