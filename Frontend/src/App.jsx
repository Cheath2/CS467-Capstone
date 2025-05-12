// src/App.jsx
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import api from './api/apiClient';    // ← import API client to set default header

import JobTracker from './pages/JobTracker';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Contacts from './pages/Contacts';
import About from './pages/About';

function Protected({ children }) {
  const token = localStorage.getItem('accessToken');
  // redirect to signin if no token
  return token ? children : <Navigate to="/signin" replace />;
}

function App() {
  // On app mount, set Authorization header if token exists
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Protected routes require auth token */}
        <Route index element={<Protected><JobTracker /></Protected>} />
        <Route path="profile" element={<Protected><Profile /></Protected>} />
        <Route path="skills" element={<Protected><Skills /></Protected>} />
        <Route path="contacts" element={<Protected><Contacts /></Protected>} />
        {/* Public routes */}
        <Route path="signin" element={<Signin />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
