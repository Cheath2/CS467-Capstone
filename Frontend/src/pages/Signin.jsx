// src/pages/SignIn.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Divider
} from '@mui/material';
import api from '../api/apiClient'; // import Shared Axios Instance

const Signin = () => {
    const navigate = useNavigate();
    // form state
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('accessToken', data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 'md',
                width: '100%',
                mx: 'auto',
                p: 4,
                mt: 4,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper'
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Sign In
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                Sign in to track your job applications.
            </Typography>

            {error && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
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
