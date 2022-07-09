import PropTypes from 'prop-types';

export const ExerciseType = PropTypes.shape({
  bodyPart: PropTypes.string,
  equipment: PropTypes.string,
  gifUrl: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  target: PropTypes.string,
});
