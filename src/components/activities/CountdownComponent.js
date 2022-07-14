import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import { Box } from '@mui/material';

// eslint-disable-next-line react/display-name
const CountdownComponent = forwardRef(({
  date,
  showTime,
  ...rest
}, ref) => {
  return (
    <Countdown
      {...rest}
      ref={ref}
      date={date}
      autoStart={false}
      renderer={({ minutes, seconds, completed }) => {
        if (!showTime) {
          return null;
        }
        if (completed) {
          // Render a complete state
          return null;
        } else {
          // Render a countdown
          return (
            <Box minWidth={100}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </Box>
          );
        }
      }}
    />
  );
});

CountdownComponent.defaultProps = {
  date: 0,
  showTime: true,
};

CountdownComponent.propTypes = {
  date: PropTypes.number,
  showTime: PropTypes.bool,
};

export default CountdownComponent;
