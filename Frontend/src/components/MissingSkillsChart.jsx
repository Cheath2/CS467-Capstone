// src/components/MissingSkillsChart.jsx
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Box, Typography, CircularProgress } from '@mui/material';
import api from '../api/apiClient';

// Updated to use a broader range of distinct colors
const COLORS = [
  '#4C8285', '#FF6B6B', '#6C5CE7', '#00B894', '#FDCB6E',
  '#E17055', '#0984E3', '#FAB1A0', '#2D3436', '#55EFC4'
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { skill, mentionedPercent } = payload[0].payload;
    return (
      <Box sx={{ backgroundColor: 'white', border: '1px solid #ccc', p: 2 }}>
        <Typography variant="body2">
          <strong>{skill}</strong> is mentioned in {mentionedPercent}% of your job applications.
        </Typography>
      </Box>
    );
  }
  return null;
};

const MissingSkillsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissingSkills = async () => {
      try {
        const res = await api.get('/skills/frequency');
        const filtered = res.data.filter(skill => !skill.userKnows);
        const topSkills = filtered.sort((a, b) => b.mentionedInJobs - a.mentionedInJobs).slice(0, 5);
        setData(topSkills);
      } catch (err) {
        console.error('Failed to load missing skill data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMissingSkills();
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;

  if (!data.length) return <Typography align="center" sx={{ mt: 4 }}>You're all caught up! No missing high-demand skills 🎉</Typography>;

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Skills You're Missing Most
      </Typography>
      <Typography align="center" variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        These are top skills mentioned in your job applications that aren't yet on your list.
      </Typography>

      <ResponsiveContainer width="100%" height={360}>
        <PieChart margin={{ top: 5, bottom: 5 }}>
          <Pie
            data={data}
            dataKey="mentionedPercent"
            nameKey="skill"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#4C8285"
            label={({ skill }) => skill}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          {/* Center label inside the donut */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={14}
            fill="#4C8285"
          >
            Top Skills
          </text>

          <Legend verticalAlign="bottom" height={50} />
        </PieChart>
      </ResponsiveContainer>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Hover over a slice to learn more. Add these skills manually through your skills list.
        </Typography>
      </Box>
    </Box>
  );
};

export default MissingSkillsChart;