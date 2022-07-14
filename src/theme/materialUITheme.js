import { createTheme } from '@mui/material';

export const getAppTheme = ({ themePrimary, themeSecondary }) => (
  createTheme({
    palette: {
      primary: themePrimary,
      secondary: themeSecondary,
      bodypart: {
        main: '#5359cc',
        contrastText: '#fff',
      },
      target: {
        main: '#856624',
        contrastText: '#fff',
      }
    },
  })
);
