import React from 'react';
import { useParams } from 'react-router-dom';
import ExerciseSession from '../../components/activities/ExerciseSession';
import { useAppSettingsStore } from '../../stores/AppSettingsStore';
import { useExerciseSessionStore } from '../../stores/ExerciseSessionStore';

function SpecificPartSessionPlay() {
  const { bodyPart, sessionId } = useParams();
  const specificExerciseList = useExerciseSessionStore(state => state.specificExerciseList);
  const exerciseDurationInSecond = useAppSettingsStore(state => state.exerciseDurationInSecond);
  const smallBreakInSecond = useAppSettingsStore(state => state.smallBreakInSecond);
  if (!specificExerciseList || !specificExerciseList[bodyPart] || specificExerciseList[bodyPart].length === 0) {
    return null;
  }

  const exerciseSession = specificExerciseList[bodyPart][Number(sessionId)];
  return (
    <ExerciseSession
      exerciseList={exerciseSession}
      exerciseDurationInSecond={exerciseDurationInSecond}
      smallBreakInSecond={smallBreakInSecond}
    />
  );
}

export default SpecificPartSessionPlay;
