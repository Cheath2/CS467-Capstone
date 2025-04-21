import {
    Box,
    Typography,
    Button,
    Chip,
    Grid,
    TextField
} from '@mui/material';
import { useState } from 'react';

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

            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
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
                        sx={{
                            py: 1.5,
                            backgroundColor: '#4C8285',
                            '&:hover': {
                                backgroundColor: '#3a6a6d'
                            }
                        }}
                    >
                        Add Skill
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {skills.map((skill) => (
                    <Chip
                        key={skill}
                        label={skill}
                        onDelete={() => handleDeleteSkill(skill)}
                        sx={{
                            backgroundColor: '#e0f2f1',
                            color: '#00695c',
                            '& .MuiChip-deleteIcon': {
                                color: '#4C8285'
                            }
                        }}
                    />
                ))}
            </Box>

            <Button
                fullWidth
                variant="contained"
                sx={{
                    py: 1.5,
                    backgroundColor: '#4C8285',
                    '&:hover': {
                        backgroundColor: '#3a6a6d'
                    }
                }}
            >
                Save Skills
            </Button>
        </Box>
    );
};

export default Skills;