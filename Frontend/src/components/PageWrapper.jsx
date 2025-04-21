import React from 'react';
import { Box } from '@mui/material';

const PageWrapper = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#f7f7f3',
                paddingTop: 8, // for fixed AppBar
                px: { xs: 2, sm: 4, md: 6 }, // responsive horizontal padding
                color: '#212121'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 'xl',
                    mx: 'auto',
                    flexGrow: 1,
                    py: 4
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default PageWrapper;