import { useState } from 'react';
import { useAppUiStore } from '../stores/AppUiStore';

export const useGetRemoteServiceWrapper = (initLoadingState = false) => {
  const [loading, setLoading] = useState(initLoadingState);
  const setSnackBar = useAppUiStore(state => state.setSnackBar);

  const callRemoteServiceWrapper = async (func) => {
    try {
      setLoading(true);
      await func();
      setLoading(false);
      return Promise.resolve();
    } catch (error) {
      console.error({
        ERROR: error,
      });
      const message = typeof error?.response?.data === 'string' ? error?.response?.data : 'An error occurs while processing. Please check the log.';
      setSnackBar({
        open: true,
        autoHideDuration: 30000,
        severity: 'error',
        message,
      });
      setLoading(false);
      return Promise.reject();
    }
  };

  return {
    loading,
    callRemoteServiceWrapper,
  };
};
