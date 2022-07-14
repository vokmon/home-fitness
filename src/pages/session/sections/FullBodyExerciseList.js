import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExerciseSessionsCard from '../../../components/exercises/ExerciseSessionsCard';
import { URL } from '../../../routes/RouteConstants';
import { useExerciseSessionStore } from '../../../stores/ExerciseSessionStore';

function FullBodyExerciseList() {
  const fullBodyExerciseList = useExerciseSessionStore(state => state.fullBodyExerciseList);
  const navigate = useNavigate();
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
                onStartSession={() => {
                  navigate(URL.FULL_BODY_PLAY.replace(':sessionId', index));
                }}
              />
            </Stack>
          ))
        }
      </Stack>
    )
  );
}

export default FullBodyExerciseList;
