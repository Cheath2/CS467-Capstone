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
  const [editableUser, setEditableUser] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    api.get('/user/me')
      .then(res => {
        setUser(res.data);
        setEditableUser(res.data);
        if (res.data.profileImage) {
          setProfileImage(`http://localhost:5000${res.data.profileImage}`);
        }
      })
      .catch(err => console.error('Error loading profile:', err.response?.data || err));
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const formData = new FormData();
    formData.append('profileImage', file); // key must match multer.single()

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const imageUrl = res.data.imageUrl;
      setProfileImage(`http://localhost:5000${imageUrl}`);
      setEditableUser(prev => ({ ...prev, profileImage: imageUrl }));
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpdateProfile = async () => {
    try {
      await api.put('/user/me', editableUser);
      setUser(editableUser);
      alert('✅ Profile updated');
    } catch (err) {
      console.error('❌ Update failed:', err);
      alert('Failed to update profile');
    }
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
          src={profileImage || ''}
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            bgcolor: '#4C8285',
            fontSize: '2.5rem'
          }}
        >
          {!profileImage && (editableUser?.firstName?.[0] || 'U')}
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
            value={editableUser?.firstName || ''}
            onChange={(e) => setEditableUser({ ...editableUser, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={editableUser?.lastName || ''}
            onChange={(e) => setEditableUser({ ...editableUser, lastName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={editableUser?.email || ''}
            onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            value={editableUser?.phone || ''}
            onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            value={editableUser?.bio || ''}
            onChange={(e) => setEditableUser({ ...editableUser, bio: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleUpdateProfile}
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
