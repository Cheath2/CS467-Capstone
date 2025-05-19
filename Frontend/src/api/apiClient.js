// src/api/apiClient.js
import axios from 'axios';

// Create Axios instance for API calls
const api = axios.create({
  baseURL: '/api',              // assumes your dev server proxies /api to your Express app
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true         // ← include cookies (for refresh-token flow)
});

// Interceptor: on 401 Unauthorized, try refreshing the access token once
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/auth/refresh');  // ← call refresh endpoint
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;  // ← set new token for future requests
        originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
        return api(originalRequest);  // ← retry original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
