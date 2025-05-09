// About.tsx
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
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ContactsIcon from '@mui/icons-material/Contacts';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Link } from 'react-router-dom';
import { styles, colors } from './AboutUs.styles';

const About = () => {
  const features = [
    {
      icon: <WorkOutlineIcon fontSize="large" sx={{ color: colors.accentGreen }} />,
      title: 'Track Every Job Opportunity',
      desc: 'Save listings, log your application progress, and stay on top of your job search.',
      path: '/',
    },
    {
      icon: <ContactsIcon fontSize="large" sx={{ color: colors.accentGreen }} />,
      title: 'Maintain Key Contacts',
      desc: 'Keep recruiter and hiring manager info organized and accessible for networking.',
      path: '/contacts',
    },
    {
      icon: <BuildCircleIcon fontSize="large" sx={{ color: colors.accentGreen }} />,
      title: 'Update Your Skills',
      desc: 'Track your growth, list your certifications, and tailor your experience for every role.',
      path: '/skills',
    },
    {
      icon: <AccountCircleIcon fontSize="large" sx={{ color: colors.accentGreen }} />,
      title: 'Build a Professional Profile',
      desc: 'Create your career hub with experience, interests, and achievements in one place.',
      path: '/profile',
    },
  ];

  return (
    <Box sx={styles.pageBackground}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={styles.heroText}>
            Organize Your Career
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Track jobs, manage contacts, grow your skills, and build a strong career profile—all in one place.
          </Typography>
        </Box>

        {/* Why Use Our App */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" gutterBottom sx={styles.heroText}>
            Why Use Our App?
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index} sx={{ mb: 4 }}>
                <Link to={feature.path} style={{ textDecoration: 'none' }}>
                  <Card sx={{ ...styles.cardBase, ...styles.cardHover }} elevation={3}>
                    <CardContent>
                      <Stack alignItems="center" spacing={1}>
                        {feature.icon}
                        <Typography variant="h6" sx={styles.heroText}>
                          {feature.title}
                        </Typography>
                        <Typography color="text.secondary">{feature.desc}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* What's Coming */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" gutterBottom sx={styles.heroText}>
            What’s Coming Next
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Card elevation={3} sx={styles.roadmapCard}>
                <CardContent>
                  <Typography variant="body1" color="text.secondary" mb={2} textAlign="center">
                    We're always improving the platform. Here’s what’s on the roadmap:
                  </Typography>
                  <Box component="ul" sx={styles.roadmapList}>
                    <li>AI-powered job match suggestions</li>
                    <li>Resume and cover letter generators</li>
                    <li>Interview prep tools</li>
                    <li>Visual application timeline</li>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Our Mission */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h4" gutterBottom sx={styles.heroText}>
            Our Mission
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={styles.italicMission}>
            To empower people to manage their job search with clarity, confidence, and control.
          </Typography>
        </Box>

        {/* Meet the Team */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h4" gutterBottom sx={styles.heroText}>
            Meet the Team
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={6} sx={{ mt: 2 }}>
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
                  <Avatar sx={styles.avatar}>{member.initials}</Avatar>
                  <Typography variant="subtitle1">{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={styles.divider} />

        {/* Footer Call-to-Action */}
        <Box textAlign="center">
          <RocketLaunchIcon fontSize="large" sx={styles.footerIcon} />
          <Typography variant="h6" mt={2} sx={styles.footerText}>
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
