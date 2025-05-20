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
        <Typography variant="body2">- {job.link || 'Link'}</Typography>
        <Typography variant="body2">- Date: {job.date}</Typography>
        <Typography variant="body2">
          - Status:{' '}
          <span style={{ color: job.status === 'Rejected' ? 'red' : 'green' }}>
            {job.status}
          </span>
        </Typography>
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
