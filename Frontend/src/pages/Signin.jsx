import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Divider
  } from '@mui/material';
  import { styles } from './Signin.styles';
  
  const Signin = () => {
    return (
      <Box sx={styles.container}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body1" align="center" sx={styles.subheading}>
          Sign in to track your job applications.
        </Typography>
  
        <Grid container spacing={3}>
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
            <Button
              fullWidth
              variant="contained"
              sx={styles.signInButton}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
  
        <Box sx={styles.forgotPasswordBox}>
          <Link href="#" underline="hover" sx={styles.link}>
            Forgot password?
          </Link>
        </Box>
  
        <Divider sx={styles.divider} />
  
        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Link href="/register" underline="hover" sx={styles.link}>
            Register
          </Link>
        </Typography>
      </Box>
    );
  };
  
  export default Signin;
  