import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import App from './App.jsx';

const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#2f73d3',
    },
    secondary: {
      main: '#48e497',
    },
    background: {
      default: '#202a32',
      paper: '#202a32',
    },
  },
};

const theme = createTheme(themeOptions);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
