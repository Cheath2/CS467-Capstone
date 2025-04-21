import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid
} from '@mui/material';

const Profile = () => {
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
                Your Profile
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        mb: 2,
                        bgcolor: '#4C8285',
                        fontSize: '2.5rem'
                    }}
                >
                    JD
                </Avatar>
                <Button variant="outlined" size="small">
                    Change Photo
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        defaultValue="John"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        defaultValue="Doe"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        defaultValue="john.doe@example.com"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Phone"
                        variant="outlined"
                        defaultValue="(123) 456-7890"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Bio"
                        variant="outlined"
                        multiline
                        rows={4}
                        defaultValue="Experienced software developer looking for new opportunities"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            py: 1.5,
                            mt: 2,
                            backgroundColor: '#4C8285',
                            '&:hover': {
                                backgroundColor: '#3a6a6d'
                            }
                        }}
                    >
                        Update Profile
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;