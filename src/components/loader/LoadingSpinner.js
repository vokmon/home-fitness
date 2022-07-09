import PropTypes from 'prop-types';
import { Stack, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({
  message,
}) => (
  <Stack className='loading-spinner-loading' alignItems='center' justifyContent='center'>
    <CircularProgress size={40} color='info' />
    <Typography className='loading-message' mt='20px'>
      {message}
    </Typography>
  </Stack>
);

LoadingSpinner.defaultProps = {
  message: '',
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

export default LoadingSpinner;
