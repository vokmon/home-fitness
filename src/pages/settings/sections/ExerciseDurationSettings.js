import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Slider, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSettingsStore } from '../../../stores/AppSettingsStore';
import { useCancelDurationSettings, useHandleSliderChange, useSubmitExerciseDurationSettings } from './ExerciseDurationSettingsHooks';

const sessionMinutes = [
  15, 20, 30, 40, 50, 60,
];

const specificPartMinutes = [
  8, 15, 20, 30,
];

const sessionDurations = sessionMinutes.map((e) => ({
  value: e,
  label: `${e}`
}));

const specificPartDurations = specificPartMinutes.map((e) => ({
  value: e,
  label: `${e}`
}));

function valuetext(value) {
  return `${value} Minutes`;
}

function ExerciseDurationSettings() {
  const sessionDuration = useAppSettingsStore(state => state.sessionDuration);
  const specificPartDuration = useAppSettingsStore(state => state.specificPartDuration);

  const {
    value: sessionDurationValue,
    handleChange: handleSessionDurationValueChange,
    setValue: setSessionDurationValue,
  } = useHandleSliderChange(sessionDuration);

  const {
    value: specificPartDurationValue,
    handleChange: handleSpecificPartDurationValueChange,
    setValue: setSpecificPartDurationValue,
  } = useHandleSliderChange(specificPartDuration);

  const { handleSubmitExerciseSettings } = useSubmitExerciseDurationSettings();
  const {
    handleCancelExerciseSettings,
  } = useCancelDurationSettings({
    setSessionDurationValue,
    setSpecificPartDurationValue,
  });
  return (
    <Accordion defaultExpanded >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>Session Duration Settings (Minutes)</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          gap={2}
          sx={{
            width: {
              xs: '100%',
              md: '90%',
            }
          }}>
          <Stack width='100%' flexDirection='column'>
            <Typography>Exercise Duration</Typography>
            <Slider
              aria-label='Exercise Duration (Minutes)'
              value={sessionDurationValue}
              onChange={handleSessionDurationValueChange}
              getAriaValueText={valuetext}
              step={5}
              min={sessionDurations[0].value}
              max={sessionDurations[sessionDurations.length - 1].value}
              valueLabelDisplay='auto'
              marks={sessionDurations}
              color='info'
            />
          </Stack>
          <Stack width='100%' flexDirection='column'>
            <Typography>Specific Part Duration</Typography>
            <Slider
              aria-label='Specific Part Duration (Minutes)'
              value={specificPartDurationValue}
              onChange={handleSpecificPartDurationValueChange}
              getAriaValueText={valuetext}
              step={2}
              min={specificPartDurations[0].value}
              max={specificPartDurations[specificPartDurations.length - 1].value}
              valueLabelDisplay='auto'
              marks={specificPartDurations}
              color='info'
            />
          </Stack>
        </Box>
        <Box display='flex' gap={2}>
          <Button ml='auto' variant='contained' color='secondary' onClick={() => {
            handleSubmitExerciseSettings({ sessionDurationValue, specificPartDurationValue });
          }} >Apply</Button>

          <Button variant='contained' color='primary' onClick={() => {
            handleCancelExerciseSettings();
          }} >Cancel</Button>
        </Box>
      </AccordionDetails>
    </Accordion >
  );
}

export default ExerciseDurationSettings;
