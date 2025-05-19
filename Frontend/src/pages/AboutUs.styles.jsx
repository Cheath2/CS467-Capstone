export const colors = {
  accentGreen: '#4C8285',
  backgroundBeige: '#f7f7f3',
  softGreen: '#e6f0ee',
  hoverGreen: '#dbe9e6',
};

export const styles = {
  pageBackground: {
    backgroundColor: colors.backgroundBeige,
  },
  heroText: {
    color: colors.accentGreen,
  },
  cardBase: {
    mb: 2,
    backgroundColor: colors.softGreen,
    borderRadius: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    p: 2,
  },
  cardHover: {
    '&:hover': {
      boxShadow: 6,
      transform: 'scale(1.02)',
      transition: 'transform 0.2s',
      backgroundColor: colors.hoverGreen,
    },
  },
  roadmapCard: {
    backgroundColor: colors.softGreen,
    borderRadius: 3,
    p: 3,
    mt: 2,
  },
  roadmapList: {
    textAlign: 'left',
    pl: 3,
    color: 'text.secondary',
    fontSize: '1rem',
    lineHeight: 1.8,
    listStyleType: 'disc',
  },
  italicMission: {
    fontStyle: 'italic',
    mt: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    bgcolor: colors.accentGreen,
  },
  divider: {
    my: 4,
    borderColor: colors.accentGreen,
  },
  footerIcon: {
    color: colors.accentGreen,
  },
  footerText: {
    color: colors.accentGreen,
    mb: 2,
  },
};
