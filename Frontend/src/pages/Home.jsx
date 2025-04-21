import { Typography, Box } from '@mui/material';

const Home = () => {
    return (
        <Box sx={{
            maxWidth: 'xl',
            width: '100%',
            mx: 'auto',
            textAlign: 'center',
            py: 4
        }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Welcome to Job Tracker
            </Typography>
            <Typography variant="body1">
                Track your job applications, interviews, and progress in one place.
            </Typography>
        </Box>
    );
};

export default Home;
