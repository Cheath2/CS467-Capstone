// src/components/JobCard.jsx
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'active': return '#D0EDD4';
    case 'rejected': return '#FBEAEA';
    default: return '#E0F2F1';
  }
};

const JobCard = ({ job, index, onEdit, onDelete }) => {
  const formattedDate = job.date
    ? new Date(job.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'No date';

  return (
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
        <Typography variant="body2">
          -{' '}
          {job.link ? (
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              {job.link}
            </a>
          ) : (
            'No link'
          )}
        </Typography>
        <Typography variant="body2">- Date: {formattedDate}</Typography>
        <Typography variant="body2">
          - Status:{' '}
          <span style={{ color: job.status === 'Rejected' ? 'red' : 'green' }}>
            {job.status}
          </span>
        </Typography>

        {/* ✅ Skills pill-style display */}
        {job.skills && job.skills.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {job.skills.map((skill, idx) => (
              <Box
                key={idx}
                sx={{
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  px: 2,
                  py: 0.5,
                  borderRadius: 5,
                  fontWeight: 500,
                  fontSize: '0.75rem',
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>
        )}

        {/* ✅ Notes display */}
        {job.note && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            - Note: {job.note}
          </Typography>
        )}
      </CardContent>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 1 }}>
        <IconButton size="small" onClick={() => onEdit(index)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(index)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default JobCard;
