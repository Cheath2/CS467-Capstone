// Profile.styles.jsx

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
    avatarSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mb: 4,
    },
    avatar: {
      width: 100,
      height: 100,
      mb: 2,
      bgcolor: colors.accentGreen,
      fontSize: '2.5rem',
    },
    updateButton: {
      py: 1.5,
      mt: 2,
      backgroundColor: colors.accentGreen,
      '&:hover': {
        backgroundColor: colors.hoverGreen,
      },
    },
  };
  