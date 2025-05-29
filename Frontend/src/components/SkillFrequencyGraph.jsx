import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { Tooltip } from 'recharts';
import api from '../api/apiClient';

// 🧠 Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const jobPercent = payload.find(p => p.dataKey === 'mentionedPercent')?.value;
  const profPercent = payload.find(p => p.dataKey === 'proficiencyPercent')?.value;

  const levelLabel = profPercent === 100
    ? 'Advanced'
    : profPercent === 66
    ? 'Intermediate'
    : profPercent === 33
    ? 'Beginner'
    : 'No experience';

  return (
    <Box sx={{
      backgroundColor: 'white',
      border: '1px solid #ccc',
      padding: 1.5,
      borderRadius: 1
    }}>
      <Typography variant="subtitle2">{label}</Typography>
      <Typography variant="body2">
        % Mentioned in Jobs: <strong>{jobPercent}%</strong>
      </Typography>
      <Typography variant="body2">
        Proficiency: <strong>{levelLabel} ({profPercent}%)</strong>
      </Typography>
    </Box>
  );
};

const SkillFrequencyGraph = () => {
  const [frequencyData, setFrequencyData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const fetchFrequency = async () => {
      try {
        const { data } = await api.get('/skills/frequency');

        // Normalize and merge skills by lowercase name
        const mergedMap = {};

        data.forEach(skill => {
          const key = skill.skill.toLowerCase();
          if (!mergedMap[key]) {
            mergedMap[key] = {
              skill: key.charAt(0).toUpperCase() + key.slice(1), // capitalize nicely
              mentionedPercent: skill.mentionedPercent,
              proficiencyPercent: skill.userKnows
                ? skill.comfort === 'Advanced' ? 100
                : skill.comfort === 'Intermediate' ? 66
                : 33
                : 0
            };
          } else {
            // Merge by averaging or taking max
            mergedMap[key].mentionedPercent = Math.max(
              mergedMap[key].mentionedPercent,
              skill.mentionedPercent
            );
            mergedMap[key].proficiencyPercent = Math.max(
              mergedMap[key].proficiencyPercent,
              skill.userKnows
                ? skill.comfort === 'Advanced' ? 100
                : skill.comfort === 'Intermediate' ? 66
                : 33
                : 0
            );
          }
        });

        const transformed = Object.values(mergedMap);
        setFrequencyData(transformed);
      } catch (err) {
        console.error('Failed to fetch skill frequency:', err);
        showSnackbar('Failed to load skill frequency', 'error');
      }
    };

    fetchFrequency();
  }, []);


  return (
    <Box sx={{ width: '100%', mt: 6 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Skill Preparedness Comparison
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 2 }}>
        Compare how often each skill is mentioned in your job applications vs. how prepared you feel.
      </Typography>

      {frequencyData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={frequencyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis
              domain={[0, 100]}
              label={{
                value: '% vs Proficiency',
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="mentionedPercent" name="% Mentioned in Jobs" fill="#4C8285" />
            <Bar dataKey="proficiencyPercent" name="Proficiency (%)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography align="center">No frequency data available yet.</Typography>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SkillFrequencyGraph;
