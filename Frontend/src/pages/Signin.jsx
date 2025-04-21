import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Divider
} from '@mui/material';

const Signin = () => {
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
                Sign In
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
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
                        sx={{
                            py: 1.5,
                            backgroundColor: '#4C8285',
                            '&:hover': {
                                backgroundColor: '#3a6a6d'
                            }
                        }}
                    >
                        Sign In
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link href="#" underline="hover" color="#4C8285">
                    Forgot password?
                </Link>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" align="center">
                Don't have an account?{' '}
                <Link href="/register" underline="hover" color="#4C8285">
                    Register
                </Link>
            </Typography>
        </Box>
    );
};

export default Signin;