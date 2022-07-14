import React from 'react';
import { useParams } from 'react-router-dom';
import ExerciseSession from '../../components/activities/ExerciseSession';
import { useAppSettingsStore } from '../../stores/AppSettingsStore';
import { useExerciseSessionStore } from '../../stores/ExerciseSessionStore';

function FullBodySessionPlay() {
  const { sessionId } = useParams();
  const fullBodyExerciseList = useExerciseSessionStore(state => state.fullBodyExerciseList);
  const exerciseDurationInSecond = useAppSettingsStore(state => state.exerciseDurationInSecond);
  const smallBreakInSecond = useAppSettingsStore(state => state.smallBreakInSecond);
  if (!fullBodyExerciseList || fullBodyExerciseList.length === 0) {
    return null;
  }
  const exerciseSession = fullBodyExerciseList[Number(sessionId)];
  return (
    <ExerciseSession
      exerciseList={exerciseSession}
      exerciseDurationInSecond={exerciseDurationInSecond}
      smallBreakInSecond={smallBreakInSecond}
    />
  );
}

export default FullBodySessionPlay;
