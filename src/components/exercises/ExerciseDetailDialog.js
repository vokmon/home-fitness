import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ExerciseType } from '../../types/ExerciseType';
import ExerciseCard from './ExerciseCard';

function ExerciseDetailDialog({
  exercise,
  open,
  onClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='lg'
      PaperProps={{
        sx: { maxHeight: '100%' }
      }}
    >
      <DialogTitle sx={{ textTransform: 'capitalize' }}>{exercise.name}</DialogTitle>
      <DialogContent>
        <ExerciseCard
          exercise={exercise}
          showExerciseName={false}
          width='100%' sx={{
            minWidth: {
              xs: 'unset',
              md: '430px',
            },
            marginTop: '12px',
          }} />
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onClose} variant='contained' >Close</Button>
      </DialogActions>
    </Dialog>
  );
}

ExerciseDetailDialog.defaultProps = {
  exercise: {},
  open: false,
  onClose: () => { },
};

ExerciseDetailDialog.propTypes = {
  exercise: ExerciseType,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ExerciseDetailDialog;
