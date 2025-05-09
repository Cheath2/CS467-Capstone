import {
    Box,
    Typography,
    Button,
    Chip,
    Grid,
    TextField
  } from '@mui/material';
  import { useState } from 'react';
  import { styles } from './Skills.styles';
  
  const Skills = () => {
    const [skills, setSkills] = useState(['JavaScript', 'React', 'Node.js']);
    const [newSkill, setNewSkill] = useState('');
  
    const handleAddSkill = () => {
      if (newSkill.trim() && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
        setNewSkill('');
      }
    };
  
    const handleDeleteSkill = (skillToDelete) => {
      setSkills(skills.filter(skill => skill !== skillToDelete));
    };
  
    return (
      <Box sx={styles.container}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Skills
        </Typography>
        <Typography variant="body1" align="center" sx={styles.subheading}>
          Add and manage your technical skills
        </Typography>
  
        <Grid container spacing={2} alignItems="center" sx={styles.formRow}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Add New Skill"
              variant="outlined"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddSkill}
              sx={styles.actionButton}
            >
              Add Skill
            </Button>
          </Grid>
        </Grid>
  
        <Box sx={styles.chipContainer}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onDelete={() => handleDeleteSkill(skill)}
              sx={styles.chip}
            />
          ))}
        </Box>
  
        <Button
          fullWidth
          variant="contained"
          sx={styles.actionButton}
        >
          Save Skills
        </Button>
      </Box>
    );
  };
  
  export default Skills;
  