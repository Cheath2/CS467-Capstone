// Register.styles.jsx

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
    registerButton: {
      py: 1.5,
      backgroundColor: colors.accentGreen,
      '&:hover': {
        backgroundColor: colors.hoverGreen,
      },
    },
    divider: {
      my: 3,
    },
    link: {
      color: colors.accentGreen,
    },
  };
  