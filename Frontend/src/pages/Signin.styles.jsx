// Signin.styles.jsx

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
    signInButton: {
      py: 1.5,
      backgroundColor: colors.accentGreen,
      '&:hover': {
        backgroundColor: colors.hoverGreen,
      },
    },
    forgotPasswordBox: {
      textAlign: 'right',
      mt: 1,
    },
    link: {
      color: colors.accentGreen,
    },
    divider: {
      my: 3,
    },
  };
  