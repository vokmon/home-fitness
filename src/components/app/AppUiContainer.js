import { Alert, AlertTitle, Portal, Slide, Snackbar } from '@mui/material';
import { useAppUiStore } from '../../stores/AppUiStore';

function AppUiContainer() {
  const snackBar = useAppUiStore(state => state.snackBar);
  const closeSnackBar = useAppUiStore(state => state.closeSnackBar);

  return (
    <Portal container={document.body}>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={snackBar.autoHideDuration}
        onClose={closeSnackBar}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        TransitionComponent={Slide}
      >

        <Alert variant='standard' onClose={closeSnackBar} severity={snackBar.severity} sx={{ width: '100%' }}>
          <AlertTitle sx={{ textTransform: 'capitalize' }}>{snackBar.severity}</AlertTitle>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </Portal>
  );
}

export default AppUiContainer;
