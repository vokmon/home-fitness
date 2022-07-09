import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useBodyPartStore } from '../../../stores/BodyPartStore';
import { useAppSettingsStore } from '../../../stores/AppSettingsStore';
import { useHandleMultipleSelect, useSubmitExerciseSettings, useCancelExerciseSettings } from './ExerciseSettingsHooks';

function ExerciseSettings() {
  const bodyPartList = useBodyPartStore(state => state.bodyPartList);
  const appSettingsBodyParts = useAppSettingsStore(state => state.bodyParts);
  const equipmentList = useBodyPartStore(state => state.equipmentList);
  const appSettingsEquipments = useAppSettingsStore(state => state.equipments);

  const {
    value: selectedBodyParts,
    handleValueChange: handleBodyPartsChange,
    setValue: setSelectedBodyParts,
  } = useHandleMultipleSelect(appSettingsBodyParts);

  const {
    value: selectedEquipments,
    handleValueChange: handleEquipmentsChange,
    setValue: setSelectedEquipments,
  } = useHandleMultipleSelect(appSettingsEquipments);

  const {
    handleSubmitExerciseSettings,
  } = useSubmitExerciseSettings();

  const {
    handleCancelExerciseSettings,
  } = useCancelExerciseSettings({
    setSelectedBodyParts,
    setSelectedEquipments,
  });
  return (
    <Accordion defaultExpanded >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>Exercise Settings</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel>Body Parts</InputLabel>
          <Select
            multiple
            value={selectedBodyParts}
            onChange={handleBodyPartsChange}
            input={<OutlinedInput label='Body Parts' />}
            renderValue={(selected) => selected.join(', ')}
            fullWidth
            sx={{ textTransform: 'capitalize' }}
          >
            {bodyPartList.map((bodyPart) => (
              <MenuItem key={bodyPart} value={bodyPart}>
                <Checkbox color='secondary' checked={selectedBodyParts.indexOf(bodyPart) > -1} />
                <ListItemText primary={bodyPart} sx={{ textTransform: 'capitalize' }} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel>Equipments</InputLabel>
          <Select
            multiple
            value={selectedEquipments}
            onChange={handleEquipmentsChange}
            input={<OutlinedInput label='Equipments' />}
            renderValue={(selected) => selected.join(', ')}
            fullWidth
            sx={{ textTransform: 'capitalize' }}
          >
            {equipmentList.map((equipment) => (
              <MenuItem key={equipment} value={equipment}>
                <Checkbox color='secondary' checked={selectedEquipments.indexOf(equipment) > -1} />
                <ListItemText primary={equipment} sx={{ textTransform: 'capitalize' }} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <Box display='flex' gap={2}>
          <Button ml='auto' variant='contained' color='secondary' onClick={() => {
            handleSubmitExerciseSettings({ selectedBodyParts, selectedEquipments });
          }} >Apply</Button>

          <Button variant='contained' color='primary' onClick={() => {
            handleCancelExerciseSettings();
          }} >Cancel</Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default ExerciseSettings;
