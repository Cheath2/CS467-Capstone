import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import PageWrapper from './PageWrapper';
import api from '../api/apiClient'; // ← import API client for logout

// Enhanced hover styles with smooth transition
const buttonHoverStyles = {
    '&:hover': {
        color: '#f5f5f5',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        transform: 'translateY(-1px)',
        transition: 'all 0.2s ease-in-out'
    }
};

const Layout = () => {
    const navigate = useNavigate(); // ← navigation hook for redirect
    const token = localStorage.getItem('accessToken'); // ← check if user is logged in

    // Sign-out handler
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout'); // call logout endpoint
        } catch (err) {
            console.error('Logout error:', err);
        }
        localStorage.removeItem('accessToken'); // clear stored token
        delete api.defaults.headers.common['Authorization']; // remove auth header
        navigate('/signin'); // redirect to Sign In
    };

    return (
        <>
            <AppBar position="static" sx={{
                backgroundColor: '#4C8285',
                width: '100vw',
                left: 0
            }}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: 'xl',
                    width: '100%',
                    mx: 'auto',
                    px: { xs: 2, md: 4 }
                }}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 700,
                            letterSpacing: '.05rem',
                            '&:hover': {
                                opacity: 0.9
                            }
                        }}
                    >
                        Job Tracker
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/about"
                            sx={buttonHoverStyles}
                        >
                            About Us
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/profile"
                            sx={buttonHoverStyles}
                        >
                            Profile
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/skills"
                            sx={buttonHoverStyles}
                        >
                            Skills
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/contacts"
                            sx={buttonHoverStyles}
                        >
                            Contacts
                        </Button>
                        {!token ? (
                            <>  {/* show Sign In/Register when not logged in */}
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/signin"
                                    sx={buttonHoverStyles}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/register"
                                    sx={buttonHoverStyles}
                                >
                                    Register
                                </Button>
                            </>
                        ) : (
                            <Button
                                color="inherit"
                                onClick={handleLogout} // ← attach logout handler
                                sx={buttonHoverStyles}
                            >
                                Sign Out
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <PageWrapper>
                <Outlet />
            </PageWrapper>
        </>
    );
};

export default Layout;