import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid
} from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import api from '../api/apiClient';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    api.get('/user/me')
      .then(res => setUser(res.data))
      .catch(err => console.error('Error loading profile:', err.response?.data || err));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);

      // Optional upload logic
      // const formData = new FormData();
      // formData.append('profileImage', file);
      // await api.post('/api/upload', formData);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{
      maxWidth: 'md',
      width: '100%',
      mx: 'auto',
      p: 4,
      mt: 4,
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: 'background.paper'
    }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Profile
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Avatar
          src={profileImage}
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            bgcolor: '#4C8285',
            fontSize: '2.5rem'
          }}
        >
          {!profileImage && (user?.firstName?.[0] || 'U')}
        </Avatar>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <Button variant="outlined" size="small" onClick={triggerFileInput}>
          Change Photo
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={user?.firstName || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={user?.lastName || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={user?.email || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            value={user?.phone || ''} // Only if you plan to support this field in your schema
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            value={user?.bio || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              mt: 2,
              backgroundColor: '#4C8285',
              '&:hover': {
                backgroundColor: '#3a6a6d'
              }
            }}
          >
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
