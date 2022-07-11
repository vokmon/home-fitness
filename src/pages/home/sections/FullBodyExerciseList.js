import { Stack } from '@mui/material';
import ExerciseSessionsCard from '../../../components/exercises/ExerciseSessionsCard';
import { useExerciseSessionStore } from '../../../stores/ExerciseSessionStore';

function FullBodyExerciseList() {
  const fullBodyExerciseList = useExerciseSessionStore(state => state.fullBodyExerciseList);
  return (
    fullBodyExerciseList && fullBodyExerciseList.length > 0 && (
      <Stack
        gap={5}
        flexDirection='column'
      >
        {
          fullBodyExerciseList.map((f, index) => (
            <Stack key={`full-body-exercise-${index}`}>
              <ExerciseSessionsCard
                title={`Full body ${fullBodyExerciseList.length > 1 ? index + 1 : ''}`}
                exerciseList={f}
              />
            </Stack>
          ))
        }
      </Stack>
    )
  );
}

export default FullBodyExerciseList;
