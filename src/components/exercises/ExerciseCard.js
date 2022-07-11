import PropTypes from 'prop-types';
import { Chip, Stack, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { ExerciseType } from '../../types/ExerciseType';
import './ExerciseCard.module.css';

const ExerciseCard = ({ exercise, onSelect, showExerciseName, ...rest }) => (
  <Card
    {...rest}
    className={`exercise-card ${onSelect ? 'clickable' : ''}`}
    onClick={() => {
      if (onSelect) {
        onSelect(exercise);
      }
    }}
    elevation={3}
  >
    <CardMedia
      component='img'
      image={exercise.gifUrl}
      alt={exercise.name}
    />
    <CardContent sx={{ background: '#607d8b' }}>
      <Stack direction='row' className='chips'>
        <Chip label={exercise.bodyPart} color='bodypart' sx={{ textTransform: 'capitalize' }} />
        <Chip label={exercise.target} color='target' sx={{ textTransform: 'capitalize', ml: 2 }} />
      </Stack>
      {showExerciseName && (
        <Typography color='white' variant='body2' mt='11px' textTransform='capitalize'>
          {exercise.name}
        </Typography>
      )}
    </CardContent>
  </Card>
);

ExerciseCard.defaultProps = {
  exercises: {},
  onSelect: null,
  showExerciseName: true,
};

ExerciseCard.propTypes = {
  exercise: ExerciseType,
  onSelect: PropTypes.func,
  showExerciseName: PropTypes.bool,
};

export default ExerciseCard;