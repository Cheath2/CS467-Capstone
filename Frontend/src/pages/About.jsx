import { Typography, Box } from '@mui/material';

const About = () => {
    return (
        <Box sx={{
            maxWidth: 'xl',
            width: '100%',
            mx: 'auto',
            textAlign: 'center',
            py: 4
        }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Welcome to Job Tracker ABOUT US PAGE
            </Typography>
            <Typography variant="body1">
                Track your job applications, interviews, and progress in one place.
            </Typography>
        </Box>
    );
};

export default About;
