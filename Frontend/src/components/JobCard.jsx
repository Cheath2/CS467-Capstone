import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
  } from '@mui/material';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { styles, getStatusColor } from '../pages/JobTracker.styles';
  
  // Represents a single job entry card with edit/delete actions
  const JobCard = ({ job, index, onEdit, onDelete }) => (
    <Card sx={styles.jobCard(getStatusColor(job.status))}>
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
  
      {/* Edit and Delete action buttons */}
      <Box sx={styles.cardActions}>
        <IconButton size="small" onClick={() => onEdit(index)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(index)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
  
  export default JobCard;
  