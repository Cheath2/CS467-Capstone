import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Divider
  } from '@mui/material';
  import { styles } from './Register.styles';
  
  const Register = () => {
    return (
      <Box sx={styles.container}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body1" align="center" sx={styles.subheading}>
          Register today to start tracking your job applications.
        </Typography>
  
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={styles.registerButton}
            >
              Register
            </Button>
          </Grid>
        </Grid>
  
        <Divider sx={styles.divider} />
  
        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link href="/signin" underline="hover" sx={styles.link}>
            Sign In
          </Link>
        </Typography>
      </Box>
    );
  };
  
  export default Register;
  