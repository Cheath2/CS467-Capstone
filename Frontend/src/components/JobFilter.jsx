import { Box, Button, ButtonGroup } from '@mui/material';
import { styles } from '../pages/JobTracker.styles';

const JobFilter = ({ currentFilter, onChange }) => {
  const filters = ['All', 'Active', 'Rejected'];

  return (
    <Box sx={styles.filterContainer}>
      <ButtonGroup variant="outlined">
        {filters.map((type) => (
          <Button
            key={type}
            onClick={() => onChange(type)}
            variant={currentFilter === type ? 'contained' : 'outlined'}
            sx={styles.filterButton}
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default JobFilter;
