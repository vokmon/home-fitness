import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useExerciseSessionStore } from '../../../stores/ExerciseSessionStore';
import ExerciseSessionsCard from '../../../components/exercises/ExerciseSessionsCard';

function SpecificPartsExerciseList() {
  const specificExerciseList = useExerciseSessionStore(state => state.specificExerciseList);

  if (!specificExerciseList || Object.keys(specificExerciseList).length === 0) {
    return null;
  }

  return (
    <Accordion defaultExpanded >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant='h5'>Specific body part</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          gap={5}
          flexDirection='column'
        >
          {
            Object.keys(specificExerciseList).map((key, index) => (
              <Stack key={`specific-part-exercise-key-${index}`}>
                {specificExerciseList[key].map((exerciseList, exIndex) => (
                  <ExerciseSessionsCard
                    key={`specific-part-exercise-${key}-${exIndex}`}
                    title={specificExerciseList[key].length > 1 ? `${key} ${exIndex + 1}` : key}
                    exerciseList={exerciseList}
                  />
                ))}
              </Stack>
            ))
          }
        </Stack>
      </AccordionDetails>
    </Accordion >
  );
}

export default SpecificPartsExerciseList;
