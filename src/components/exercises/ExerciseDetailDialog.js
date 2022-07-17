import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ExerciseType } from '../../types/ExerciseType';
import ExerciseSession from '../activities/ExerciseSession';
import { DEFAULT_APP_SETTINGS } from '../../constants/AppSettingConstants';

function ExerciseDetailDialog({
  exercise,
  open,
  onClose,
  exerciseDurationInSecond,
  smallBreakInSecond,
  ...rest
}) {
  return (
    <Dialog
      {...rest}
      open={open}
      onClose={onClose}
      maxWidth='lg'
      PaperProps={{
        sx: { maxHeight: '100%' }
      }}
    >
      <DialogTitle sx={{ textTransform: 'capitalize' }}>{exercise.name}</DialogTitle>
      <DialogContent sx={{ height: '540px' }}>
        <ExerciseSession
          exerciseList={[exercise]}
          exerciseDurationInSecond={exerciseDurationInSecond}
          smallBreakInSecond={smallBreakInSecond}
          width={{
            sm: '60%',
            md: '40%',
            lg: '40%',
          }}
        />
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
  exerciseDurationInSecond: DEFAULT_APP_SETTINGS.exerciseDurationInSecond,
  smallBreakInSecond: DEFAULT_APP_SETTINGS.smallBreakInSecond,
};

ExerciseDetailDialog.propTypes = {
  exercise: ExerciseType,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  exerciseDurationInSecond: PropTypes.number,
  smallBreakInSecond: PropTypes.number,
};

export default ExerciseDetailDialog;
