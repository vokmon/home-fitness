import { ThemeProvider } from '@emotion/react';
import { Box, Fade } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { useGetFullbodyExerciseSessions, usePrepareAppData } from './AppHooks';
import AppUiContainer from './components/app/AppUiContainer';
import Header from './components/navigators/header/Header';
import RouterConfiguration from './routes/RouterConfiguration';
import { useAppSettingsStore } from './stores/AppSettingsStore';
import { getAppTheme } from './theme/materialUITheme';

function App() {
  const theme = useAppSettingsStore(state => state.theme);
  const appTheme = getAppTheme(theme);

  usePrepareAppData();
  useGetFullbodyExerciseSessions();

  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Fade in>
          <Box className='App' display='flex' flexDirection='column' height='100vh'>
            <Header />
            <Box flexGrow={1} overflow='auto' padding={2} boxSizing='border-box'>
              <RouterConfiguration />
            </Box>
          </Box>
        </Fade>
      </BrowserRouter >
      <AppUiContainer />
    </ThemeProvider>
  );
}

export default App;
