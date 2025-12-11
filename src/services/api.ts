import axios from 'axios';

// Use relative URLs in development (via Vite proxy) or absolute URL in production
const API_BASE_URL =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'http://localhost:8080');

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if backend requires credentials
});

// Request interceptor to add auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Handle CORS errors specifically
    if (
      error.code === 'ERR_NETWORK' ||
      error.message.includes('CORS') ||
      error.message.includes('Network Error')
    ) {
      console.error('CORS Error:', error);
      return Promise.reject(
        new Error(
          'CORS error: Unable to connect to the server. Please check if the backend is running and CORS is properly configured.',
        ),
      );
    }

    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const message =
        error.response.data?.message || error.response.data?.error || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      return Promise.reject(error);
    }
  },
);

export default api;
