import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useExerciseSessionStore } from '../../../stores/ExerciseSessionStore';
import ExerciseSessionsCard from '../../../components/exercises/ExerciseSessionsCard';
import { URL } from '../../../routes/RouteConstants';

function SpecificPartsExerciseList() {
  const specificExerciseList = useExerciseSessionStore(state => state.specificExerciseList);
  const navigate = useNavigate();

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
                    onStartSession={() => {
                      navigate(URL.SPECIFIC_PART_PLAY.replace(':bodyPart', key).replace(':sessionId', exIndex));
                    }}
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
