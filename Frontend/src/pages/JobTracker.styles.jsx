export const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#D0EDD4';
      case 'rejected':
        return '#FBEAEA';
      default:
        return '#E0F2F1';
    }
  };

export const colors = {
    backgroundBeige: '#f7f7f3',
    accentGreen: '#4C8285',
    hoverGreen: '#3a6c6e',
    lightGreen: '#e6f0ee',
    cancelButton: '#CFE1E3',
  };
  
  export const styles = {
    page: {
      backgroundColor: colors.backgroundBeige,
    },
    heroBox: {
      textAlign: 'center',
      mb: 6,
    },
    heroHeading: {
      color: colors.accentGreen,
    },
    addButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      mb: 6,
    },
    addButton: {
      bgcolor: colors.accentGreen,
      px: 4,
      py: 1.5,
      fontWeight: 'bold',
      borderRadius: 3,
      textTransform: 'none',
      boxShadow: 3,
      '&:hover': {
        bgcolor: colors.hoverGreen,
      },
    },
    cardContainer: {
      backgroundColor: colors.lightGreen,
      borderRadius: 3,
      px: 4,
      py: 6,
      boxShadow: 1,
    },
    jobCard: (statusColor) => ({
      backgroundColor: statusColor,
      borderRadius: 3,
      boxShadow: 3,
    }),
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      px: 2,
      pb: 1,
    },
    dialogTitle: {
      fontWeight: 'bold',
      textAlign: 'center',
      pt: 3,
      pb: 3,
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      py: 2,
    },
    textFieldMarginTop: {
      mt: 1,
    },
    dialogActions: {
      justifyContent: 'center',
      pb: 3,
    },
    cancelButton: {
      bgcolor: colors.cancelButton,
    },
    saveButton: {
      bgcolor: colors.accentGreen,
    },
    filterContainer: {
        textAlign: 'right',
        mb: 4,
        mr: 25,
      },
      filterButton: {
        color: '#4C8285',
        borderColor: '#4C8285',
        fontWeight: 'bold',
        textTransform: 'none',
        '&.Mui-selected, &.MuiButton-contained': {
          backgroundColor: '#4C8285',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#3a6c6d',
          },
        },
      },
      datePicker: {
        mt: 1,
        '& .MuiInputBase-root': {
          backgroundColor: '#fff',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#4C8285',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#3a6c6d',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#3a6c6d',
        },
      },
  };
  