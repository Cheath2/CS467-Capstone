import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { Delete, Add, Edit } from '@mui/icons-material';
import api from '../api/apiClient';
import { useState, useEffect } from 'react';

const Skills = () => {
    // state to hold all saved skills from backend
  const [skills, setSkills] = useState([]);

  // state for new skill input
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });

  // state for editing an existing skill
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // state for confirming deletion
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  // snackbar feedback system
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // available levels for dropdown
  const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

  // Trigger snackbar with message
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Load existing skills from the backend when component mounts
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await api.get('/skills');
        setSkills(data);
      } catch (err) {
        console.error('Error loading skills:', err);
        showSnackbar('Could not load skills', 'error');
      }
    };
    fetchSkills();
  }, []);

  // add new skill to backend
  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) return;
    try {
      const { data: saved } = await api.post('/skills', newSkill);
      setSkills([...skills, saved]);
      setNewSkill({ name: '', level: 'Beginner' });
      showSnackbar('Skill added');
    } catch (err) {
      console.error('Failed to add skill:', err);
      showSnackbar('Failed to add skill', 'error');
    }
  };

  // confirm skill deletion
  const confirmDeleteSkill = async () => {
    try {
      await api.delete(`/skills/${skillToDelete._id}`);
      setSkills(skills.filter((s) => s._id !== skillToDelete._id));
      showSnackbar('Skill deleted');
    } catch (err) {
      console.error('Failed to delete skill:', err);
      showSnackbar('Failed to delete skill', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setSkillToDelete(null);
    }
  };

  // update edited skill in backend
  const handleUpdateSkill = async () => {
    try {
      const { data: updated } = await api.put(`/skills/${selectedSkill._id}`, selectedSkill);
      setSkills((prev) =>
        prev.map((s) => (s._id === updated._id ? updated : s))
      );
      setEditDialogOpen(false);
      setSelectedSkill(null);
      showSnackbar('Skill updated');
    } catch (err) {
      console.error('Failed to update skill:', err);
      showSnackbar('Failed to update skill', 'error');
    }
  };

  // trigger edit modal with skill data 
  const openEditDialog = (skill) => {
    setSelectedSkill({ ...skill });
    setEditDialogOpen(true);
  };

  return (
    <Box sx={{
      maxWidth: 'md',
      width: '100%',
      mx: 'auto',
      p: 4,
      mt: 4,
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: 'background.paper'
    }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Skills
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Add and manage your technical skills
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Skill Name"
            variant="outlined"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            select
            fullWidth
            label="Proficiency"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
          >
            {levelOptions.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddSkill}
            sx={{
              minWidth: 0,
              height: '56px',
              backgroundColor: '#4C8285',
              '&:hover': { backgroundColor: '#3a6a6d' }
            }}
          >
            <Add />
          </Button>
        </Grid>
      </Grid>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {skills.map((skill, index) => (
          <Box key={skill._id}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => openEditDialog(skill)}
                    sx={{ mr: 1 }}
                  >
                    <Edit sx={{ color: '#4C8285' }} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      setSkillToDelete(skill);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Delete sx={{ color: '#4C8285' }} />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={skill.name}
                secondary={`Proficiency: ${skill.level}`}
              />
            </ListItem>
            {index < skills.length - 1 && <Divider />}
          </Box>
        ))}
      </List>

        {/* Edit Dialog */}
      {selectedSkill && (
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Edit Skill</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Skill Name"
              margin="dense"
              value={selectedSkill.name}
              onChange={(e) => setSelectedSkill({ ...selectedSkill, name: e.target.value })}
            />
            <TextField
              select
              fullWidth
              label="Proficiency"
              margin="dense"
              value={selectedSkill.level}
              onChange={(e) => setSelectedSkill({ ...selectedSkill, level: e.target.value })}
            >
              {levelOptions.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleUpdateSkill}
              sx={{ backgroundColor: '#4C8285', '&:hover': { backgroundColor: '#3a6a6d' } }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the skill "{skillToDelete?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={confirmDeleteSkill}
            sx={{ backgroundColor: '#4C8285', '&:hover': { backgroundColor: '#3a6a6d' } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
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

export default Skills;
