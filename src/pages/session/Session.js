import { Box, Button, Fade } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { useExerciseSessionStore } from '../../stores/ExerciseSessionStore';
import { useGetExerciseSessions } from '../../AppHooks';
import FullBodyExerciseList from './sections/FullBodyExerciseList';
import SpecificPartsExerciseList from './sections/SpecificPartsExerciseList';

function Home() {
  const fullBodyExerciseList = useExerciseSessionStore(state => state.fullBodyExerciseList);
  const specificExerciseList = useExerciseSessionStore(state => state.specificExerciseList);
  console.log(fullBodyExerciseList, specificExerciseList);
  const {
    getExerciseSessions,
  } = useGetExerciseSessions();
  return (
    <Fade in>
      <Box boxSizing='border-box'>
        <Button
          color='secondary'
          onClick={() => {
            getExerciseSessions();
          }}
          variant='contained'
          endIcon={<CachedIcon />}
        >
          Get new exercises
        </Button>
        <br /><br /><br />
        <FullBodyExerciseList />
        <br /><br />
        <SpecificPartsExerciseList />
      </Box>
    </Fade>
  );
}

export default Home;
