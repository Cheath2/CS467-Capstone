import {
    Typography,
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Avatar,
    Stack,
    Divider,
    useTheme,
  } from '@mui/material';
  import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
  import ContactsIcon from '@mui/icons-material/Contacts';
  import BuildCircleIcon from '@mui/icons-material/BuildCircle';
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
  
  const About = () => {
    const accentGreen = '#4C8285';
    const backgroundBeige = '#f7f7f3';
    const softGreen = '#e6f0ee';
  
    return (
      <Box sx={{ backgroundColor: backgroundBeige }}>
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: accentGreen }}>
              Organize Your Career
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Track jobs, manage contacts, grow your skills, and build a strong career profile—all in one place.
            </Typography>
          </Box>
  
          {/* Why Use Our App */}
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" gutterBottom sx={{ color: accentGreen }}>
              Why Use Our App?
            </Typography>
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
              {[
                {
                  icon: <WorkOutlineIcon fontSize="large" sx={{ color: accentGreen }} />,
                  title: 'Track Every Job Opportunity',
                  desc: 'Save listings, log your application progress, and stay on top of your job search.',
                },
                {
                  icon: <ContactsIcon fontSize="large" sx={{ color: accentGreen }} />,
                  title: 'Maintain Key Contacts',
                  desc: 'Keep recruiter and hiring manager info organized and accessible for networking.',
                },
                {
                  icon: <BuildCircleIcon fontSize="large" sx={{ color: accentGreen }} />,
                  title: 'Update Your Skills',
                  desc: 'Track your growth, list your certifications, and tailor your experience for every role.',
                },
                {
                  icon: <AccountCircleIcon fontSize="large" sx={{ color: accentGreen }} />,
                  title: 'Build a Professional Profile',
                  desc: 'Create your career hub with experience, interests, and achievements in one place.',
                },
              ].map((feature, index) => (
                <Grid item xs={12} md={6} key={index} sx={{ mb: 4 }}>
                  <Card
                    elevation={3}
                    sx={{
                      mb: 2,
                      backgroundColor: softGreen,
                      borderRadius: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                      p: 2,
                    }}
                  >
                    <CardContent>
                      <Stack alignItems="center" spacing={1}>
                        {feature.icon}
                        <Typography variant="h6" sx={{ color: accentGreen }}>
                          {feature.title}
                        </Typography>
                        <Typography color="text.secondary">{feature.desc}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
  
          {/* What's Coming */}
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" gutterBottom sx={{ color: accentGreen }}>
              What’s Coming Next
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              We're always improving the platform. Here’s what’s on the roadmap:
            </Typography>
            <Box
              component="ul"
              sx={{
                display: 'inline-block',
                textAlign: 'left',
                backgroundColor: softGreen,
                px: 3,
                py: 2,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <li>AI-powered job match suggestions</li>
              <li>Resume and cover letter generators</li>
              <li>Interview prep tools</li>
              <li>Visual application timeline</li>
            </Box>
          </Box>
  
          {/* Our Mission */}
          <Box textAlign="center" mb={10}>
            <Typography variant="h4" gutterBottom sx={{ color: accentGreen }}>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary">
              To empower people to manage their job search with clarity, confidence, and control.
            </Typography>
          </Box>
  
          {/* Meet the Team */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" gutterBottom sx={{ color: accentGreen }}>
              Meet the Team
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={6}>
              We’re a team of computer science students passionate about solving real problems with tech.
            </Typography>
            <Grid container spacing={6} justifyContent="center">
              {[
                { initials: 'S', name: 'Savannah', role: 'Frontend Developer' },
                { initials: 'R', name: 'Rutu', role: 'Backend Developer' },
                { initials: 'C', name: 'Casey', role: 'Backend Developer' },
              ].map((member, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Stack alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 80, height: 80, bgcolor: accentGreen }}>
                      {member.initials}
                    </Avatar>
                    <Typography variant="subtitle1">{member.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
  
          <Divider sx={{ my: 4, borderColor: accentGreen }} />
  
          {/* Footer Call-to-Action */}
          <Box textAlign="center">
            <RocketLaunchIcon fontSize="large" sx={{ color: accentGreen }} />
            <Typography variant="h6" mt={2} sx={{ color: accentGreen, mb: 2 }}>
              Ready to take control of your job search?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
              Start using Job Tracker today — it's free and built with your goals in mind.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default About;
  