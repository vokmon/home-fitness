import PropTypes from 'prop-types';
import { Box, Pagination, Stack } from '@mui/material';
import React, { useState } from 'react';
import { ExerciseType } from '../../types/ExerciseType';
import ExerciseCard from '../exercises/ExerciseCard';

function ExercisesList({
  exercises,
  exercisesPerPage,
  onCardSelect,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Stack direction='row' sx={{ gap: { lg: '50px', xs: '40px' } }} flexWrap='wrap' justifyContent='center'>
        {currentExercises.map((exercise) => (
          <ExerciseCard
            key={`exercise-${exercise.id}`}
            exercise={exercise}
            onSelect={onCardSelect}
            sx={{ width: { xs: '100%', md: '20%' } }}
          />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems='center'>
        {exercises.length > exercisesPerPage && (
          <Pagination
            shape='rounded'
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size='small'
            variant='outlined'
            color='secondary'
          />
        )}
      </Stack>
    </Box>
  );
}

ExercisesList.defaultProps = {
  exercises: [],
  exercisesPerPage: 10,
  onCardSelect: null,
};

ExercisesList.propTypes = {
  exercises: PropTypes.arrayOf(ExerciseType),
  exercisesPerPage: PropTypes.number,
  onCardSelect: PropTypes.func,
};

export default ExercisesList;
