import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import JobTracker from './pages/JobTracker';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Contacts from './pages/Contacts';
import About from './pages/About';

import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<JobTracker />} />
        <Route path="signin" element={<Signin />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="skills" element={<Skills />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
