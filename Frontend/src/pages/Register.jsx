// src/pages/Register.jsx
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
import api from '../api/apiClient';    // ← Import Axios instance

const Register = () => {
    const navigate = useNavigate();
    // form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]   = useState('');
    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');
    const [confirm, setConfirm]     = useState('');
    const [error, setError]         = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }
        try {
            const { data } = await api.post('/auth/register', {
                firstName,
                lastName,
                email,
                password
            });
            localStorage.setItem('accessToken', data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
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
                Create Account
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                Register today to start tracking your job applications.
            </Typography>

            {error && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </Grid>
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
                    <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
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
