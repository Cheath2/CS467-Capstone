// Contacts.styles.jsx

export const colors = {
    accentGreen: '#4C8285',
    hoverGreen: '#3a6a6d',
  };
  
  export const styles = {
    container: {
      maxWidth: 'md',
      width: '100%',
      mx: 'auto',
      p: 4,
      mt: 4,
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: 'background.paper',
    },
    subheading: {
      mb: 4,
    },
    formRow: {
      mb: 3,
    },
    addButton: {
      minWidth: 0,
      height: '56px',
      backgroundColor: colors.accentGreen,
      '&:hover': {
        backgroundColor: colors.hoverGreen,
      },
    },
    deleteIcon: {
      color: colors.accentGreen,
    },
    contactList: {
      width: '100%',
      bgcolor: 'background.paper',
    },
  };
  