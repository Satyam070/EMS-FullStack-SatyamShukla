import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3a36db', // Updated modern blue
      light: '#6e66ff',
      dark: '#0012a9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff7a60', // Modern coral/orange
      light: '#ff8f80',
      dark: '#e54430',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fe',
      paper: '#ffffff',
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px 0 rgba(0,0,0,0.05)',
    '0 4px 8px 0 rgba(0,0,0,0.05)',
    '0 8px 16px 0 rgba(0,0,0,0.05)',
    '0 12px 24px 0 rgba(0,0,0,0.05)',
    ...Array(20).fill('0 16px 32px 0 rgba(0,0,0,0.08)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '8px 24px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
          borderRadius: 12,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

export default theme;
