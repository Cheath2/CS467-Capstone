import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api', // ✅ Use env variable
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// ✅ Restore token after page reload
const token = localStorage.getItem('accessToken');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Interceptor: handle 401 by trying to refresh once
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/auth/refresh');
        localStorage.setItem('accessToken', data.token); // 🔁 Store refreshed token
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// ✅ Contact-specific API helper
api.updateContact = async (contactId, updatedFields) => {
  try {
    const res = await api.put(`/contacts/${contactId}`, updatedFields);
    console.log('✅ Contact updated:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ Failed to update contact:', err.response?.data || err.message);
    throw err;
  }
};

export default api;
