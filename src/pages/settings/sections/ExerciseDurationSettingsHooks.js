import { useState } from 'react';
import { useAppSettingsStore } from '../../../stores/AppSettingsStore';
import { useAppUiStore } from '../../../stores/AppUiStore';
import { useGetRemoteServiceWrapper } from '../../../hooks/RemoteServiceHooks';

export const useHandleSliderChange = (initValue) => {
  const [value, setValue] = useState(initValue);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
    setValue,
  };
};

export const useSubmitExerciseDurationSettings = () => {
  const setSessionDuration = useAppSettingsStore(state => state.setSessionDuration);
  const setSpecificPartDuration = useAppSettingsStore(state => state.setSpecificPartDuration);
  const setSnackBar = useAppUiStore(state => state.setSnackBar);

  const {
    callRemoteServiceWrapper,
  } = useGetRemoteServiceWrapper();

  const handleSubmitExerciseSettings = ({ sessionDurationValue, specificPartDurationValue }) => {
    callRemoteServiceWrapper(() => {
      setSessionDuration(sessionDurationValue);
      setSpecificPartDuration(specificPartDurationValue);
      setSnackBar({
        open: true,
        autoHideDuration: 5000,
        severity: 'success',
        message: 'Exercise Duration Settings is saved successfully.',
      });
    });
  };



  return {
    handleSubmitExerciseSettings,

  };
};

export const useCancelDurationSettings = ({ setSessionDurationValue, setSpecificPartDurationValue }) => {
  const sessionDuration = useAppSettingsStore(state => state.sessionDuration);
  const specificPartDuration = useAppSettingsStore(state => state.specificPartDuration);

  const handleCancelExerciseSettings = () => {
    setSessionDurationValue(sessionDuration);
    setSpecificPartDurationValue(specificPartDuration);
  };
  return {
    handleCancelExerciseSettings,
  };
};
