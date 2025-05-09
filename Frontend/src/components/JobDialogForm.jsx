import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
  } from '@mui/material';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  import { styles } from '../pages/JobTracker.styles';
  
  // Dialog component for creating or editing a job entry
  const JobDialogForm = ({
    open,
    isEditing,
    company,
    role,
    link,
    date,
    status,
    note,
    onClose,
    onSave,
    setCompany,
    setRole,
    setLink,
    setDate,
    setStatus,
    setNote,
  }) => {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableRestoreFocus>
        <DialogTitle sx={styles.dialogTitle}>
          {isEditing ? 'Edit Job' : 'New Job Opportunity'}
        </DialogTitle>
  
        <DialogContent sx={styles.dialogContent}>
          {/* Provides date handling context for DatePicker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* Company input */}
            <TextField
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Facebook"
              fullWidth
              variant="outlined"
              sx={styles.textFieldMarginTop}
              slotProps={{
                inputLabel: { shrink: true },
                input: { 'aria-label': 'company name' },
              }}
            />
  
            {/* Role input */}
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
  
            {/* Link input */}
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
  
            {/* Date picker */}
            <DatePicker
              label="Date"
              value={date ? new Date(date) : null}
              onChange={(newValue) => setDate(newValue?.toISOString() || '')}
              sx={styles.datePicker}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  inputProps: { 'aria-label': 'application date' },
                },
              }}
            />
  
            {/* Status select */}
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
              <MenuItem value="Reject">Reject</MenuItem>
            </TextField>
  
            {/* Note input */}
            <TextField
              label="Note"
              multiline
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              helperText={`${note.length}/100`}
              fullWidth
              variant="outlined"
              slotProps={{
                inputLabel: { shrink: true },
                input: { maxLength: 100, 'aria-label': 'note' },
              }}
            />
          </LocalizationProvider>
        </DialogContent>
  
        {/* Dialog action buttons */}
        <DialogActions sx={styles.dialogActions}>
          <Button onClick={onClose} sx={styles.cancelButton}>
            Cancel
          </Button>
          <Button variant="contained" sx={styles.saveButton} onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default JobDialogForm;
  