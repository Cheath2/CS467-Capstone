import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid
  } from '@mui/material';
  import { styles } from './Profile.styles';
  
  const Profile = () => {
    return (
      <Box sx={styles.container}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Profile
        </Typography>
  
        <Box sx={styles.avatarSection}>
          <Avatar sx={styles.avatar}>JD</Avatar>
          <Button variant="outlined" size="small">
            Change Photo
          </Button>
        </Box>
  
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              defaultValue="John"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              defaultValue="Doe"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              defaultValue="john.doe@example.com"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              defaultValue="(123) 456-7890"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bio"
              variant="outlined"
              multiline
              rows={4}
              defaultValue="Experienced software developer looking for new opportunities"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={styles.updateButton}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default Profile;
  