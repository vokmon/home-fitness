import PropTypes from 'prop-types';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { DEFAULT_APP_SETTINGS } from '../../constants/AppSettingConstants';
import { ExerciseType } from '../../types/ExerciseType';
import { Box, Chip, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import './ExerciseSession.css';
import { useTheme } from '@emotion/react';
import { useHandleCarousel, useHandleCountdownDate, usePrepareExerciseSessionList } from './ExerciseSessionHooks';
import CountdownComponent from './CountdownComponent';
import take_a_break from '../../assets/images/take_a_break.gif';
import ExerciseComplete from './ExerciseComplete';

function ExerciseSession({
  exerciseList,
  exerciseDurationInSecond,
  smallBreakInSecond,
  width,
}) {
  const theme = useTheme();
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));

  const transformExerciseList = usePrepareExerciseSessionList({
    exerciseList,
  });

  const {
    carouselRef,
    currentSlide,
    nextSlide,
    isCompleted,
  } = useHandleCarousel({
    transformExerciseList,
  });

  const {
    countdownRef,
    countdownDate,
    showTime,
    isPlaying,
    startExercise,
    pauseExercise,
    handleOnComplete,
    handleOnTick,
    isInitial,
  } = useHandleCountdownDate({
    exerciseDurationInSecond,
    smallBreakInSecond,
    transformExerciseList,
    currentSlide,
    nextSlide,
  });

  if (isCompleted) {
    return (
      <ExerciseComplete exerciseDurationInSecond={exerciseDurationInSecond} />
    );
  }
  return (
    <Stack justifyContent='center' overflow='hidden'>
      <Stack justifyContent='center' alignItems='center' flexDirection='row'>
        {isPlaying ? (
          <IconButton
            size='large'
            color='primary'
            aria-label='Pause Exercise'
            onClick={() => { pauseExercise(); }}
          >
            <PauseCircleFilledIcon color='secondary' sx={{ width: 50, height: 50 }} />
          </IconButton>
        ) : (
          <IconButton
            size='large'
            color='primary'
            aria-label='Start Exercise'
            onClick={() => { startExercise(); }}
          >
            <PlayArrowIcon sx={{ width: 50, height: 50 }} />
          </IconButton>
        )}

        {!showTime && (
          <Typography marginRight='10px'>Start</Typography>
        )}
        {
          showTime && isInitial && (
            <Typography marginRight='10px'>Start in</Typography>
          )
        }
        <CountdownComponent
          ref={countdownRef}
          date={countdownDate}
          showTime={showTime}
          onComplete={handleOnComplete}
          onTick={handleOnTick}
        />
      </Stack>
      <Box flexGrow={1}>
        <Carousel
          autoPlay={false}
          thumbWidth='5%'
          showIndicators={exerciseList.length > 1}
          showThumbs={matchesSmall && exerciseList.length > 1}
          showArrows={false}
          className='exercise-session'
          showStatus={false}
          ref={carouselRef}
          selectedItem={currentSlide}
        >
          {transformExerciseList.map((ex, index) => {
            const sx = {
              marginLeft: 'auto',
              marginRight: 'auto',
              width: {
                xs: '100%',
                lg: '30%',
                ...width,
              }
            };
            if (ex.isRestingCard) {
              // For some reason this cannot be refacted to another component
              // as the thumbnail will not work
              return (
                <Box key={ex.id} sx={{
                  ...sx,
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    lg: 'row',
                  },
                  gap: 2,
                  alignItem: 'center'
                }}>
                  <img
                    src={take_a_break}
                    srcSet={take_a_break}
                    loading='lazy'
                    style={{
                      width: '100%',
                    }}
                  />

                  <Box sx={{
                    // position: 'absolute'
                  }}>
                    <Typography>
                      Next
                    </Typography>
                    <img
                      src={transformExerciseList[index + 1].gifUrl}
                      srcSet={transformExerciseList[index + 1].gifUrl}
                      loading='lazy'
                      style={{
                        width: '200px',
                        marginBottom: '70px',
                      }}
                    />
                  </Box>

                  <Typography
                    className='legend'>
                    Take a {smallBreakInSecond}-second break
                  </Typography>
                </Box>
              );
            }
            return (
              <Box key={ex.gifUrl}
                sx={sx}
              >
                <img
                  src={`${ex.gifUrl}`}
                  srcSet={`${ex.gifUrl}`}
                  alt={ex.title}
                  loading='lazy'
                  style={{
                    width: '100%',
                  }}
                />

                <Stack
                  direction='row'
                  gap={3}
                  justifyContent='center'
                  alignItems='center'
                  className='legend chips'
                >
                  <Typography textTransform='capitalize'>{ex.name}</Typography>
                  {matchesSmall && (
                    <>
                      <Chip label={ex.bodyPart} color='bodypart' sx={{ textTransform: 'capitalize' }} />
                      <Chip label={ex.target} color='target' sx={{ textTransform: 'capitalize' }} />
                    </>
                  )}
                </Stack>
              </Box>
            );
          })}
        </Carousel>
      </Box>
    </Stack>
  );
}

ExerciseSession.defaultProps = {
  exerciseList: [],
  exerciseDurationInSecond: DEFAULT_APP_SETTINGS.exerciseDurationInSecond,
  smallBreakInSecond: DEFAULT_APP_SETTINGS.smallBreakInSecond,
  width: {},
};

ExerciseSession.propTypes = {
  exerciseList: PropTypes.arrayOf(ExerciseType),
  exerciseDurationInSecond: PropTypes.number,
  smallBreakInSecond: PropTypes.number,
  width: PropTypes.any,
};

export default ExerciseSession;
