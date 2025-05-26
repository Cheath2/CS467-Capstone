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
    DialogActions,
    DialogContentText,
    Snackbar,
    Alert
} from '@mui/material';
import { Delete, Add, Edit } from '@mui/icons-material';
import api from '../api/apiClient';
import { useState, useEffect } from 'react';

const Contacts = () => {
    // State for loaded contacts, form inputs, and errors
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', notes: '' });


    // New state for delete confirmation
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    // New state for Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // New Helper for showing snackbar
    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };
  
    // Fetch persisted contacts on component mount
    useEffect(() => {
      const fetchContacts = async () => {
        try {
          const { data } = await api.get('/contacts');  // GET /api/contacts
          setContacts(data);
        } catch (err) {
          console.error('Error loading contacts:', err);
          showSnackbar('Could not load contacts', 'error');
        }
      };
      fetchContacts();
    }, []);
  
    // Add new contact via API
    const handleAddContact = async () => {
      if (!newContact.name || !newContact.email) return;
      try {
        const { data: saved } = await api.post('/contacts', newContact); // POST /api/contacts
        setContacts([...contacts, saved]);                         // update UI
        setNewContact({ name: '', email: '', phone: '', notes: '' });
        showSnackbar('Contact added');
      } catch (err) {
        console.error('Couldn\'t save contact:', err);
        showSnackbar('Failed to add contact', 'error');
      }
    };
  
    // ⬇️ NEW DELETE CONFIRMATION FUNCTION
    const confirmDeleteContact = async () => {
        try {
          await api.delete(`/contacts/${contactToDelete._id}`);
          setContacts(contacts.filter(c => c._id !== contactToDelete._id));
          showSnackbar('Contact deleted'); // ⬅️ NEW
        } catch (err) {
          console.error('Couldn\'t delete contact:', err);
          showSnackbar('Failed to delete contact', 'error'); // ⬅️ NEW
        } finally {
          setDeleteDialogOpen(false);
          setContactToDelete(null);
        }
    };
    
    // Update contact 
    const handleUpdateContact = async () => {
        try {
            const { data: updated } = await api.put(`/contacts/${selectedContact._id}`, selectedContact);
            setContacts((prev) =>
            prev.map((c) => (c._id === updated._id ? updated : c))
            );
            setEditDialogOpen(false);
            setSelectedContact(null);
            showSnackbar('Contact updated');
        } catch (err) {
            console.error('Failed to update contact:', err);
            showSnackbar('Failed to update contact', 'error');
        }
    };

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const openEditDialog = (contact) => {
    setSelectedContact({ ...contact });
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
                Your Contacts
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                Manage your professional network
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Phone"
                        variant="outlined"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleAddContact}
                        sx={{
                            minWidth: 0,
                            height: '56px',
                            backgroundColor: '#4C8285',
                            '&:hover': {
                                backgroundColor: '#3a6a6d'
                            }
                        }}
                    >
                        <Add />
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Notes"
                        variant="outlined"
                        multiline
                        rows={2}
                        value={newContact.notes}
                        onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                        placeholder="e.g. Google recruiter from Grace Hopper Conference"
                    />
                </Grid>

            </Grid>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {contacts.map((contact, index) => (
                    <Box key={index}>
                        <ListItem
                            secondaryAction={
                                <>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => openEditDialog(contact)}
                                        sx={{ mr: 1 }}
                                    >
                                        <Edit sx={{ color: '#4C8285' }} />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => {
                                            setContactToDelete(contact); 
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <Delete sx={{ color: '#4C8285' }} />
                                    </IconButton>
                                    </>
                            }
                        >
                            <ListItemText
                                primary={contact.name}
                                secondary={
                                    <>
                                        {contact.email} | {contact.phone}
                                        <br />
                                        {contact.notes}
                                    </>
                                }
                            />
                        </ListItem>
                        {index < contacts.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
            {selectedContact && (
                <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
                    <DialogTitle>Edit Contact</DialogTitle>
                    <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        margin="dense"
                        value={selectedContact.name}
                        onChange={(e) => setSelectedContact({ ...selectedContact, name: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="dense"
                        value={selectedContact.email}
                        onChange={(e) => setSelectedContact({ ...selectedContact, email: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Phone"
                        margin="dense"
                        value={selectedContact.phone}
                        onChange={(e) => setSelectedContact({ ...selectedContact, phone: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Notes"
                        multiline
                        rows={2}
                        margin="dense"
                        value={selectedContact.notes}
                        onChange={(e) => setSelectedContact({ ...selectedContact, notes: e.target.value })}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleUpdateContact}
                        sx={{ backgroundColor: '#4C8285', '&:hover': { backgroundColor: '#3a6a6d' } }}
                    >
                        Save
                    </Button>
                    </DialogActions>
                </Dialog>
                )}

                {/* NEW DELETE CONFIRMATION DIALOG */}
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the contact "{contactToDelete?.name}"?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={confirmDeleteContact}
                        sx={{ backgroundColor: '#4C8285', '&:hover': { backgroundColor: '#3a6a6d' } }}
                    >
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>

                {/* NEW SNACKBAR */}
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

export default Contacts;