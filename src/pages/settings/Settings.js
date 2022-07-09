import { Fade, Stack } from '@mui/material';
import ExerciseDurationSettings from './sections/ExerciseDurationSettings';
import ExerciseSettings from './sections/ExerciseSettings';

function Settings() {
  return (
    <Fade in>
      <Stack gap={0}>
        <ExerciseSettings />
        <ExerciseDurationSettings />
      </Stack>
    </Fade>
  );
}

export default Settings;
