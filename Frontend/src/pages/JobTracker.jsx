import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { styles } from './JobTracker.styles';
import JobCard from '../components/JobCard';
import JobDialogForm from '../components/JobDialogForm';
import JobFilter from '../components/JobFilter';

const JobTracker = () => {
  // Modal and edit state
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Filter state for "All", "Active", or "Rejected"
  const [filter, setFilter] = useState('All');

  // Static list of job applications
  const [jobs, setJobs] = useState([
    {
      company: 'Forbes',
      role: 'Front End Developer',
      date: 'July 2nd 2020',
      status: 'Rejected',
      link: '',
      note: '',
    },
    {
      company: 'Code & Theory',
      role: 'Front End Developer',
      date: 'June 20th 2020',
      status: 'Active',
      link: '',
      note: '',
    },
    {
      company: 'Tegger',
      role: 'Software Engineer',
      date: 'June 2nd 2020',
      status: 'Active',
      link: '',
      note: '',
    },
    {
      company: 'Bloomingdale',
      role: 'Software Engineer',
      date: 'May 10th 2020',
      status: 'Rejected',
      link: '',
      note: '',
    },
    {
      company: 'Citi Bank',
      role: 'Software Engineer',
      date: 'June 22nd 2020',
      status: 'Active',
      link: '',
      note: '',
    },
  ]);

  // Form fields
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  // Resets form fields and modal/editing state
  const resetForm = () => {
    setCompany('');
    setRole('');
    setLink('');
    setDate('');
    setStatus('');
    setNote('');
    setIsEditing(false);
    setEditIndex(null);
  };

  // Save a new job or update an existing one
  const handleSave = () => {
    const newJob = { company, role, link, date, status, note };

    if (isEditing && editIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[editIndex] = newJob;
      setJobs(updatedJobs);
    } else {
      setJobs((prev) => [newJob, ...prev]);
    }

    resetForm();
    setOpen(false);
  };

  // Populate form with existing job for editing
  const handleEdit = (index) => {
    const job = jobs[index];
    setCompany(job.company);
    setRole(job.role);
    setLink(job.link);
    setDate(job.date);
    setStatus(job.status);
    setNote(job.note);
    setEditIndex(index);
    setIsEditing(true);
    setOpen(true);
  };

  // Remove job from list
  const handleDelete = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  return (
    <Box sx={styles.page}>
      {/* Hero section */}
      <Box sx={styles.heroBox}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={styles.heroHeading}>
          Track Your Job Applications
        </Typography>
        <Typography variant="h6" color="text.secondary">
          View your progress, reflect on your outcomes, and stay on track.
        </Typography>
      </Box>

      {/* Add Job Button */}
      <Box sx={styles.addButtonContainer}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          sx={styles.addButton}
        >
          Add Job
        </Button>
      </Box>

      {/* Filter toggle (All / Active / Rejected) */}
      <JobFilter currentFilter={filter} onChange={setFilter} />

      {/* Job cards list */}
      <Container maxWidth="lg">
        <Box sx={styles.cardContainer}>
          <Grid container spacing={4}>
            {jobs
              .filter((job) => filter === 'All' || job.status === filter)
              .map((job, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <JobCard
                    job={job}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>

      {/* Modal for adding/editing a job */}
      <JobDialogForm
        open={open}
        isEditing={isEditing}
        company={company}
        role={role}
        link={link}
        date={date}
        status={status}
        note={note}
        setCompany={setCompany}
        setRole={setRole}
        setLink={setLink}
        setDate={setDate}
        setStatus={setStatus}
        setNote={setNote}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default JobTracker;
