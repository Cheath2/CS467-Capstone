// Skills.styles.jsx

export const colors = {
    accentGreen: '#4C8285',
    hoverGreen: '#3a6a6d',
    chipBg: '#e0f2f1',
    chipText: '#00695c',
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
    actionButton: {
      py: 1.5,
      backgroundColor: colors.accentGreen,
      '&:hover': {
        backgroundColor: colors.hoverGreen,
      },
    },
    chipContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1,
      mb: 4,
    },
    chip: {
      backgroundColor: colors.chipBg,
      color: colors.chipText,
      '& .MuiChip-deleteIcon': {
        color: colors.accentGreen,
      },
    },
  };
  