import { useState } from 'react';
import { useGetRemoteServiceWrapper } from '../../../hooks/RemoteServiceHooks';
import { useAppSettingsStore } from '../../../stores/AppSettingsStore';
import { useAppUiStore } from '../../../stores/AppUiStore';

export const useHandleMultipleSelect = (initValue = []) => {
  const [value, setValue] = useState([...initValue]);
  const handleValueChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return {
    value,
    handleValueChange,
    setValue,
  };
};

export const useSubmitExerciseSettings = () => {
  const setBodyParts = useAppSettingsStore(state => state.setBodyParts);
  const setEquipments = useAppSettingsStore(state => state.setEquipments);
  const setSnackBar = useAppUiStore(state => state.setSnackBar);

  const {
    callRemoteServiceWrapper,
  } = useGetRemoteServiceWrapper();

  const handleSubmitExerciseSettings = ({ selectedBodyParts, selectedEquipments }) => {
    callRemoteServiceWrapper(() => {
      setBodyParts(selectedBodyParts);
      setEquipments(selectedEquipments);
      setSnackBar({
        open: true,
        autoHideDuration: 5000,
        severity: 'success',
        message: 'Exercise Settings is saved successfully.',
      });
    });
  };



  return {
    handleSubmitExerciseSettings,

  };
};

export const useCancelExerciseSettings = ({ setSelectedBodyParts, setSelectedEquipments }) => {
  const appSettingsBodyParts = useAppSettingsStore(state => state.bodyParts);
  const appSettingsEquipments = useAppSettingsStore(state => state.equipments);

  const handleCancelExerciseSettings = () => {
    setSelectedBodyParts([...appSettingsBodyParts]);
    setSelectedEquipments([...appSettingsEquipments]);
  };
  return {
    handleCancelExerciseSettings,
  };
};
