import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import api from '../api/apiClient';

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
      const response = await api.post('/job-search', form);

      // Log the entire response data so you can inspect it in the console
      console.log('🛠 job-search response.data:', response.data);

      // If the server returned an array under `jobs`, pass it along. Otherwise pass empty array.
      if (Array.isArray(response.data.jobs)) {
        onResults(response.data.jobs);
      } else {
        console.warn('⚠️ response.data.jobs is not an array:', response.data);
        onResults([]);
      }
    } catch (error) {
      console.error('❌ Error calling /api/job-search:', error.response?.data || error.message);
      onResults([]);  // always pass an array on failure
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