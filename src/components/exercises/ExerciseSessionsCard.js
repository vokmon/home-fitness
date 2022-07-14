import PropTypes from 'prop-types';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { ExerciseType } from '../../types/ExerciseType';
import { Box, Button, ImageList, ImageListItem, ImageListItemBar, Stack, Typography } from '@mui/material';

function ExerciseSessionsCard({
  title,
  exerciseList,
  onStartSession,
}) {
  if (!exerciseList || exerciseList.length === 0) {
    return null;
  }

  return (
    <Stack>
      <Stack flexDirection='row' gap={3}>
        {title && (
          <Typography variant='h6' textTransform='capitalize' >{title}</Typography>
        )}
        <Button onClick={onStartSession} variant='contained' endIcon={<FitnessCenterIcon />}>
          Select
        </Button>
      </Stack>
      <ImageList
        cols={8} gap={15}
      >
        {exerciseList.map((item) => (
          <ImageListItem key={item.gifUrl} sx={{
            border: '1px solid rgba(0,0,0,0.1)',
            boxSizing: 'border-box',
            borderRadius: '5px',
            marginBottom: '5px',
          }}>
            <img
              src={`${item.gifUrl}`}
              srcSet={`${item.gifUrl}`}
              alt={item.title}
              loading='lazy'
              style={{
                width: '100%',
                minWidth: '200px',
              }}
            />
            <ImageListItemBar
              subtitle={<Box style={{ whiteSpace: 'break-spaces' }}>{item.name}</Box>}
              style={{
                width: '100%',
                minHeight: '48px',
                textTransform: 'capitalize',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Stack>
  );
}

ExerciseSessionsCard.defaultProps = {
  title: '',
  exerciseList: [],
  onStartSession: () => { },
};

ExerciseSessionsCard.propTypes = {
  title: PropTypes.string,
  exerciseList: PropTypes.arrayOf(ExerciseType),
  onStartSession: PropTypes.func,
};

export default ExerciseSessionsCard;
