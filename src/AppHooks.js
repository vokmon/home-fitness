import { useEffect } from 'react';
import { useGetRemoteServiceWrapper } from './hooks/RemoteServiceHooks';
import { ExerciseService } from './services/ExerciseService';
import { useAppSettingsStore } from './stores/AppSettingsStore';
import { useBodyPartStore } from './stores/BodyPartStore';

export const usePrepareAppData = () => {
  const {
    callRemoteServiceWrapper,
  } = useGetRemoteServiceWrapper();

  const setDataList = useBodyPartStore(state => state.setDataList);

  useEffect(() => {
    let ignore = false;
    callRemoteServiceWrapper(async () => {
      const allBodyPartsPromise = ExerciseService.getAllBodyParts();
      const allEquipmentsPromise = ExerciseService.getAllEquipments();
      const [allBodyParts, allEquipments] = await Promise.all([allBodyPartsPromise, allEquipmentsPromise]);
      if (!ignore) {
        setDataList({
          bodyPartList: allBodyParts,
          equipmentList: allEquipments,
        });
      }
    });

    return () => {
      ignore = true;
    };
  }, []);
};

export const useGetFullbodyExerciseSessions = () => {
  const {
    callRemoteServiceWrapper,
  } = useGetRemoteServiceWrapper();

  const bodyParts = useAppSettingsStore(state => state.bodyParts);
  const equipments = useAppSettingsStore(state => state.equipments);
  const sessionDuration = useAppSettingsStore(state => state.sessionDuration);
  const exerciseDurationInSecond = useAppSettingsStore(state => state.exerciseDurationInSecond);
  const smallBreakInSecond = useAppSettingsStore(state => state.smallBreakInSecond);

  useEffect(() => {
    let ignore = false;
    callRemoteServiceWrapper(async () => {
      const payload = {
        bodyParts, equipments, sessionDuration, exerciseDurationInSecond, smallBreakInSecond
      };
      // eslint-disable-next-line no-unused-vars
      const result = await ExerciseService.getFullbodyExerciseSessions(payload);
      if (ignore) {
        return;
      }
      // console.log(result);
    });
    return () => {
      ignore = true;
    };
  }, [bodyParts, equipments, sessionDuration, exerciseDurationInSecond, smallBreakInSecond]);
};

export const useGetSpecificExerciseSessions = () => {
  const {
    callRemoteServiceWrapper,
  } = useGetRemoteServiceWrapper();

  const bodyParts = useAppSettingsStore(state => state.bodyParts);
  const equipments = useAppSettingsStore(state => state.equipments);
  const specificPartDuration = useAppSettingsStore(state => state.specificPartDuration);
  const exerciseDurationInSecond = useAppSettingsStore(state => state.exerciseDurationInSecond);
  const smallBreakInSecond = useAppSettingsStore(state => state.smallBreakInSecond);

  useEffect(() => {
    let ignore = false;
    callRemoteServiceWrapper(async () => {
      const payload = {
        bodyParts, equipments, specificPartDuration, exerciseDurationInSecond, smallBreakInSecond
      };
      const result = await ExerciseService.getSpecificExerciseSessions(payload);
      if (ignore) {
        return;
      }
      console.log(result);
    });

    return () => {
      ignore = true;
    };
  }, [bodyParts, equipments, specificPartDuration, exerciseDurationInSecond, smallBreakInSecond]);
};