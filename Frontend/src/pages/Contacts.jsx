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
    Grid
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import api from '../api/apiClient';
import { useState, useEffect } from 'react';

const Contacts = () => {
    // State for loaded contacts, form inputs, and errors
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
    const [error, setError] = useState('');
  
    // Fetch persisted contacts on component mount
    useEffect(() => {
      const fetchContacts = async () => {
        try {
          const { data } = await api.get('/contacts');  // GET /api/contacts
          setContacts(data);
        } catch (err) {
          console.error('Error loading contacts:', err);
          setError('Could not load contacts');
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
        setNewContact({ name: '', email: '', phone: '' });
        setError('');
      } catch (err) {
        console.error('Couldn\'t save contact:', err);
        setError('Failed to save contact');
      }
    };
  
    // Delete contact via API
    const handleDeleteContact = async (id) => {
      try {
        await api.delete(`/contacts/${id}`);                      // DELETE /api/contacts/:id
        setContacts(contacts.filter(c => c._id !== id));
        setError('');
      } catch (err) {
        console.error('Couldn\'t delete contact:', err);
        setError('Failed to delete contact');
      }
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
            </Grid>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {contacts.map((contact, index) => (
                    <Box key={index}>
                        <ListItem
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDeleteContact(index)}
                                >
                                    <Delete sx={{ color: '#4C8285' }} />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={contact.name}
                                secondary={`${contact.email} | ${contact.phone}`}
                            />
                        </ListItem>
                        {index < contacts.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default Contacts;