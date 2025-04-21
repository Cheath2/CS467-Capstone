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
import { useState } from 'react';

const Contacts = () => {
    const [contacts, setContacts] = useState([
        { name: 'Jane Smith', email: 'jane@example.com', phone: '(987) 654-3210' },
        { name: 'Mike Johnson', email: 'mike@example.com', phone: '(456) 789-0123' }
    ]);
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });

    const handleAddContact = () => {
        if (newContact.name && newContact.email) {
            setContacts([...contacts, newContact]);
            setNewContact({ name: '', email: '', phone: '' });
        }
    };

    const handleDeleteContact = (index) => {
        setContacts(contacts.filter((_, i) => i !== index));
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