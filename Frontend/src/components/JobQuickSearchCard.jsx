import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const experienceOptions = ['Entry Level', 'Mid Level', 'Senior Level'];
const jobTypeOptions = ['Full-Time', 'Part-Time'];

const JobQuickSearchCard = ({ onResults }) => {
  const [form, setForm] = useState({
    role: '',
    experience: '',
    location: '',
    salary: '',
    jobType: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/job-search', form);
      onResults(res.data.jobs);
    } catch (error) {
      onResults('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ p: 2, mb: 2, mt: 8 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 4, color: '#4C8285', fontWeight: 'bold',
         }}>
          AI-Powered Job Search
        </Typography>

        <Box display="flex" flexDirection="column" gap={4}>
          <TextField label="Job Role" name="role" value={form.role} onChange={handleChange} fullWidth />
          <TextField label="Location" name="location" value={form.location} onChange={handleChange} fullWidth />
          <TextField label="Salary Expectation" name="salary" value={form.salary} onChange={handleChange} fullWidth />

          <TextField select label="Experience Level" name="experience" value={form.experience} onChange={handleChange} fullWidth>
            {experienceOptions.map((level) => (
              <MenuItem key={level} value={level}>{level}</MenuItem>
            ))}
          </TextField>

          <TextField select label="Job Type" name="jobType" value={form.jobType} onChange={handleChange} fullWidth>
            {jobTypeOptions.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>

          <Button variant="contained" onClick={handleSearch} disabled={loading} sx={{ backgroundColor: '#4C8285' }} >
            {loading ? <CircularProgress size={24} /> : 'Search Jobs'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobQuickSearchCard;