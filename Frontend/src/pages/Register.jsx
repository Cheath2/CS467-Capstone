import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Divider
} from '@mui/material';

const Register = () => {
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
                Create Account
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
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
                        sx={{
                            py: 1.5,
                            backgroundColor: '#4C8285',
                            '&:hover': {
                                backgroundColor: '#3a6a6d'
                            }
                        }}
                    >
                        Register
                    </Button>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" align="center">
                Already have an account?{' '}
                <Link href="/signin" underline="hover" color="#4C8285">
                    Sign In
                </Link>
            </Typography>
        </Box>
    );
};

export default Register;