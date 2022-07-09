import { createTheme } from '@mui/material';

export const getAppTheme = ({ themePrimary, themeSecondary }) => (
  createTheme({
    palette: {
      primary: themePrimary,
      secondary: themeSecondary,
      bodypart: {
        main: '#FFA9A9',
        contrastText: '#fff',
      },
      target: {
        main: '#FCC757',
        contrastText: '#fff',
      }
    },
  })
);
