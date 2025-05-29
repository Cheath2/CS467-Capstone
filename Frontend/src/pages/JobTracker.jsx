// src/pages/JobTracker.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  Container,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '../api/apiClient';
import JobCard from '../components/JobCard';
import JobDialog from '../components/JobDialog';

const JobTracker = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState('Active'); // ✅ default value
  const [note, setNote] = useState('');
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');

  const [filterStatus, setFilterStatus] = useState('All');

  const resetForm = () => {
    setCompany('');
    setRole('');
    setLink('');
    setDate(null);
    setStatus('Active'); // ✅ default value
    setNote('');
    setSkills([]);
    setIsEditing(false);
    setEditIndex(null);
    setError('');
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs');
        setJobs(data);
      } catch (err) {
        console.error('Error loading jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  const handleSave = async () => {
      if (!skills || skills.length === 0) {
         // ADD this to check for empty skills
         setError("Please enter at least one skill");
         return;
      }
    const jobPayload = {
      company,
      role,
      link,
      date: date ? new Date(date).toISOString() : null, // ✅ convert to ISO
      status: status.toLowerCase(),
      note,
      skills,
    };

    console.log('💾 Saving job:', jobPayload); // ✅ log outgoing data

    try {
      if (isEditing && editIndex !== null) {
        const jobToEdit = jobs[editIndex];
        const res = await api.put(`/jobs/${jobToEdit._id}`, jobPayload);
        console.log('📝 PUT response:', res.data); // ✅ log response
        const updated = res.data;
        const updatedJobs = [...jobs];
        updatedJobs[editIndex] = updated;
        setJobs(updatedJobs);
      } else {
        const res = await api.post('/jobs', jobPayload);
        console.log('🆕 POST response:', res.data); // ✅ log response
        setJobs([res.data, ...jobs]);
      }
      resetForm();
      setOpen(false);
    } catch (err) {
      console.error("Couldn't save job:", err.response?.data || err.message);
      setError('Failed to save job');
    }
  };

  const handleEdit = (index) => {
    const job = jobs[index];
    setCompany(job.company || '');
    setRole(job.role || '');
    setLink(job.link || '');
    setDate(job.date ? new Date(job.date) : null); // ✅ convert if not null
    setStatus(job.status || 'Active');
    setNote(job.note || '');
    setSkills(job.skills || []);
    setEditIndex(index);
    setIsEditing(true);
    setError('');
    setOpen(true);
  };

  const handleDelete = async (index) => {
    try {
      const job = jobs[index];
      await api.delete(`/jobs/${job._id}`);
      setJobs(jobs.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Couldn't delete job:", err);
      setError('Failed to delete job');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f7f7f3' }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#4C8285' }}>
          Track Your Job Applications
        </Typography>
        <Typography variant="h6" color="text.secondary">
          View your progress, reflect on your outcomes, and stay on track.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          sx={{
            bgcolor: '#4C8285',
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: 3,
            textTransform: 'none',
            boxShadow: 3,
            '&:hover': { bgcolor: '#3a6c6e' },
          }}
        >
          Add Job
        </Button>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ backgroundColor: '#e6f0ee', borderRadius: 3, px: 4, py: 6, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <TextField
              select
              label="Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              size="small"
              variant="outlined"
              sx={{
                width: 200,
                borderRadius: 3,
                fontWeight: 'bold',
                px: 2,
                pl: 1,
                py: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#3a6c6e',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: 3,
                  '& fieldset': { border: 'none' },
                  '&:hover': { backgroundColor: '#3a6c6e' },
                },
                '& .MuiInputLabel-root': {
                  color: '#3a6c6e',
                  fontWeight: 'bold',
                  '&.Mui-focused': {
                    color: '#3a6c6e',
                  },
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
          </Box>

          <Grid container spacing={4}>
            {jobs
              .filter((job) => {
                if (filterStatus === 'All') return true;
                return job.status.toLowerCase() === filterStatus.toLowerCase();
              })
              .map((job, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <JobCard job={job} index={index} onEdit={handleEdit} onDelete={handleDelete} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>

      <JobDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        isEditing={isEditing}
        company={company}
        setCompany={setCompany}
        role={role}
        setRole={setRole}
        link={link}
        setLink={setLink}
        date={date}
        setDate={setDate}
        status={status}
        setStatus={setStatus}
        note={note}
        setNote={setNote}
        skills={skills}
        setSkills={setSkills}
        error={error}
      />
    </Box>
  );
};

export default JobTracker;
