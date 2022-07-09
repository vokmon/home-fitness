import create from 'zustand';

export const useAppUiStore = create((set, get) => ({
  snackBar: {
    open: false,
    autoHideDuration: 5000,
    severity: 'success',
    message: '',
  },
  setSnackBar: (snackBar) => {
    set({ snackBar });
  },
  closeSnackBar: () => {
    set({
      snackBar: {
        ...get().snackBar,
        open: false,
      }
    });
  },
}));
