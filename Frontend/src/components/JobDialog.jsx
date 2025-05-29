// src/components/JobDialog.jsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Button,
    Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useEffect } from 'react'; // ✅ added

const JobDialog = ({
    open,
    onClose,
    onSave,
    isEditing,
    company,
    setCompany,
    role,
    setRole,
    link,
    setLink,
    date,
    setDate,
    status,
    setStatus,
    note,
    setNote,
    skills,
    setSkills,
    error,
}) => {
    const [skillsText, setSkillsText] = useState(''); 

    useEffect(() => {
        if (open) {
            setSkillsText(skills.join(', '));
        }
    }, [open, skills]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableRestoreFocus>
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', pt: 3, pb: 3 }}>
                {isEditing ? 'Edit Job' : 'New Job Opportunity'}
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 2 }}>
                <TextField
                    label="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Facebook"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 1 }}
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: { 'aria-label': 'company name' },
                    }}
                />

                <TextField
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    fullWidth
                    variant="outlined"
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: { 'aria-label': 'role' },
                    }}
                />

                <TextField
                    label="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="http://www.example.com"
                    fullWidth
                    variant="outlined"
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: { 'aria-label': 'job link' },
                    }}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Application Date"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        format="MM/dd/yyyy"
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                variant: 'outlined',
                                margin: 'normal',
                                size: 'medium',
                                InputLabelProps: { shrink: true },
                                sx: {
                                    input: { color: '#333' },
                                },
                            },
                        }}
                    />
                </LocalizationProvider>

                <TextField
                    select
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    fullWidth
                    variant="outlined"
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: { 'aria-label': 'application status' },
                    }}
                >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                </TextField>

                <TextField
                    label="Skills (comma separated)"
                    value={skillsText}
                    onChange={(e) => setSkillsText(e.target.value)}
                    onBlur={() =>
                        setSkills(
                            skillsText
                                .split(',')
                                .map((s) => s.trim())
                                .filter((s) => s.length > 0)
                        )
                    }
                    placeholder="e.g. JavaScript, React, Node.js"
                    fullWidth
                    variant="outlined"
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: { 'aria-label': 'skills list' },
                    }}
                />

                <TextField
                    label="Note"
                    multiline
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    helperText={`${(note || '').length}/100`}
                    fullWidth
                    variant="outlined"
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: { maxLength: 100, 'aria-label': 'note' },
                    }}
                />

                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button onClick={onClose} sx={{ bgcolor: '#CFE1E3' }}>
                    Cancel
                </Button>
                <Button variant="contained" sx={{ bgcolor: '#4C8285' }} onClick={onSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default JobDialog;
