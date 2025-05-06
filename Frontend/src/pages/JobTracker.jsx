import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Container,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return '#D0EDD4';
    case 'reject':
      return '#FBEAEA';
    default:
      return '#E0F2F1';
  }
};

const JobTracker = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [jobs, setJobs] = useState([
    {
      company: 'Forbes',
      role: 'Front End Developer',
      date: 'July 2nd 2020',
      status: 'Reject',
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
      status: 'Reject',
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

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

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

  const handleDelete = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
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
            '&:hover': {
              bgcolor: '#3a6c6e',
            },
          }}
        >
          Add Job
        </Button>
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: '#e6f0ee',
            borderRadius: 3,
            px: 4,
            py: 6,
            boxShadow: 1,
          }}
        >
          <Grid container spacing={4}>
            {jobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    backgroundColor: getStatusColor(job.status),
                    borderRadius: 3,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {job.company}
                    </Typography>
                    <Typography variant="body2">- {job.role}</Typography>
                    <Typography variant="body2">- {job.link || 'Link'}</Typography>
                    <Typography variant="body2">- Date: {job.date}</Typography>
                    <Typography variant="body2">
                      - Status:{' '}
                      <span style={{ color: job.status === 'Reject' ? 'red' : 'green' }}>
                        {job.status}
                      </span>
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 1 }}>
                    <IconButton size="small" onClick={() => handleEdit(index)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" disableRestoreFocus>
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', pt: 3, pb: 3 }}>
          {isEditing ? 'Edit Job' : 'New Job Opportunity'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 2 }}>
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Facebook"
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            slotProps={{
              inputLabel: { shrink: true },
              input: { 'aria-label': 'company name' },
            }}
          />
          <TextField
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Software Engineer"
            fullWidth
            variant="outlined"
            slotProps={{
              inputLabel: { shrink: true },
              input: { 'aria-label': 'role' },
            }}
          />
          <TextField
            label="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="http://www.example.com"
            fullWidth
            variant="outlined"
            slotProps={{
              inputLabel: { shrink: true },
              input: { 'aria-label': 'job link' },
            }}
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            variant="outlined"
            slotProps={{
              inputLabel: { shrink: true },
              input: { 'aria-label': 'application date' },
            }}
          />
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            variant="outlined"
            slotProps={{
              inputLabel: { shrink: true },
              input: { 'aria-label': 'application status' },
            }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Reject">Reject</MenuItem>
          </TextField>
          <TextField
            label="Note"
            multiline
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            helperText={`${note.length}/100`}
            fullWidth
            variant="outlined"
            slotProps={{
              inputLabel: { shrink: true },
              input: { maxLength: 100, 'aria-label': 'note' },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ bgcolor: '#CFE1E3' }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ bgcolor: '#4C8285' }} onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobTracker;
