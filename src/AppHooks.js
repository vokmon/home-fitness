import { useEffect } from 'react';
import { useGetRemoteServiceWrapper } from './hooks/RemoteServiceHooks';
import { ExerciseService } from './services/ExerciseService';
import { useAppSettingsStore } from './stores/AppSettingsStore';
import { useBodyPartStore } from './stores/BodyPartStore';
import { useExerciseSessionStore } from './stores/ExerciseSessionStore';

export const usePrepareAppData = () => {
  const {
    callRemoteServiceWrapper,
  } = useGetRemoteServiceWrapper();

  const setDataList = useBodyPartStore(state => state.setDataList);

  useEffect(() => {
    callRemoteServiceWrapper(async () => {
      const allBodyPartsPromise = ExerciseService.getAllBodyParts();
      const allEquipmentsPromise = ExerciseService.getAllEquipments();
      const [allBodyParts, allEquipments] = await Promise.all([allBodyPartsPromise, allEquipmentsPromise]);
      setDataList({
        bodyPartList: allBodyParts,
        equipmentList: allEquipments,
      });
    });
  }, []);
};

export const useGetExerciseSessions = () => {
  const {
    callRemoteServiceWrapper,
  } = useGetRemoteServiceWrapper();

  const bodyParts = useAppSettingsStore(state => state.bodyParts);
  const equipments = useAppSettingsStore(state => state.equipments);
  const sessionDuration = useAppSettingsStore(state => state.sessionDuration);
  const exerciseDurationInSecond = useAppSettingsStore(state => state.exerciseDurationInSecond);
  const specificPartDuration = useAppSettingsStore(state => state.specificPartDuration);
  const smallBreakInSecond = useAppSettingsStore(state => state.smallBreakInSecond);
  const numberOfFullBodySessions = useAppSettingsStore(state => state.numberOfFullBodySessions);
  const numberOfBodyPartSessions = useAppSettingsStore(state => state.numberOfBodyPartSessions);
  const setExerciseSessionsList = useExerciseSessionStore(state => state.setExerciseSessionsList);

  const getExerciseSessions = () => {
    callRemoteServiceWrapper(async () => {
      const fullBodyExercisePayload = {
        bodyParts,
        equipments,
        sessionDuration,
        exerciseDurationInSecond,
        smallBreakInSecond,
        numberOfFullBodySessions,
      };
      const fullBodyExerciseList = await ExerciseService.getFullbodyExerciseSessions(fullBodyExercisePayload);

      const specificExercisePayload = {
        bodyParts,
        equipments,
        specificPartDuration,
        exerciseDurationInSecond,
        smallBreakInSecond,
        numberOfBodyPartSessions,
      };
      const specificExerciseList = await ExerciseService.getSpecificExerciseSessions(specificExercisePayload);
      setExerciseSessionsList({ fullBodyExerciseList, specificExerciseList });
    });
  };

  return {
    getExerciseSessions,
  };
};

export const usePrepareExerciseSessions = () => {
  const bodyParts = useAppSettingsStore(state => state.bodyParts);
  const equipments = useAppSettingsStore(state => state.equipments);
  const sessionDuration = useAppSettingsStore(state => state.sessionDuration);
  const exerciseDurationInSecond = useAppSettingsStore(state => state.exerciseDurationInSecond);
  const specificPartDuration = useAppSettingsStore(state => state.specificPartDuration);
  const smallBreakInSecond = useAppSettingsStore(state => state.smallBreakInSecond);
  const numberOfFullBodySessions = useAppSettingsStore(state => state.numberOfFullBodySessions);
  const numberOfBodyPartSessions = useAppSettingsStore(state => state.numberOfBodyPartSessions);
  const setExerciseSessionsList = useExerciseSessionStore(state => state.setExerciseSessionsList);
  const {
    getExerciseSessions,
  } = useGetExerciseSessions();
  useEffect(() => {
    getExerciseSessions();
  }, [
    bodyParts,
    equipments,
    sessionDuration,
    exerciseDurationInSecond,
    smallBreakInSecond,
    specificPartDuration,
    numberOfFullBodySessions,
    numberOfBodyPartSessions,
    setExerciseSessionsList,
  ]);
};
