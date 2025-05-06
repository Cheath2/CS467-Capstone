import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import PageWrapper from './PageWrapper';

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