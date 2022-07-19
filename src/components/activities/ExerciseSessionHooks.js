import { useMemo, useRef, useState } from 'react';
import { usePlaySound } from '../../hooks/SoundHooks';

export const usePrepareExerciseSessionList = ({
  exerciseList
}) => {
  const result = useMemo(() => {
    let transformExerciseList = exerciseList;
    if (exerciseList.length > 1) {
      transformExerciseList = [];
      exerciseList.forEach((ex, index) => {
        transformExerciseList.push(ex);
        if (index < exerciseList.length - 1) {
          transformExerciseList.push({
            id: `resting-${index}`,
            isRestingCard: true,
          });
        }
      });
    }
    return transformExerciseList;
  }, [exerciseList]);

  return result;
};

export const useHandleCarousel = ({
  transformExerciseList,
}) => {
  const carouselRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const previousSlide = () => {
    setCurrentSlide((previousState) => (previousState === 0 ? 0 : previousState - 1));
  };

  const nextSlide = () => {
    if (currentSlide === transformExerciseList.length - 1) {
      setIsCompleted(true);
    } else {
      setCurrentSlide((previousState) => (previousState === transformExerciseList.length - 1 ? previousState : previousState + 1));
    }
  };

  return {
    carouselRef,
    currentSlide,
    previousSlide,
    nextSlide,
    isCompleted,
  };
};

export const useHandleCountdownDate = ({
  exerciseDurationInSecond,
  smallBreakInSecond,
  transformExerciseList,
  currentSlide,
  nextSlide,
}) => {
  const countdownRef = useRef();
  const [isInitial, setIsInitial] = useState(true);
  const [countdownDate, setCountdownDate] = useState(Date.now() + 5000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const { getCountdownSound } = usePlaySound();
  const countdownSound = getCountdownSound();

  const startExercise = () => {
    setIsPlaying(true);
    setShowTime(true);
    countdownRef.current.start();
  };

  const pauseExercise = () => {
    setIsPlaying(false);
    countdownSound.pause();
    countdownRef.current.pause();
  };

  const handleOnComplete = () => {
    if (isInitial) {
      setIsInitial(false);
      const newDate = Date.now() + (exerciseDurationInSecond * 1000);
      setCountdownDate(newDate);
      setTimeout(() => {
        countdownRef.current.start();
      });
    } else {
      nextSlide();
      const currentCard = transformExerciseList[currentSlide];
      const time = currentCard.isRestingCard ? smallBreakInSecond : exerciseDurationInSecond;
      const newDate = Date.now() + (time * 1000);
      setCountdownDate(newDate);
      setTimeout(() => {
        countdownRef.current.start();
      });
    }
  };

  const handleOnTick = (tick) => {
    if (tick.total === 4000) {
      countdownSound.play({ start: 0, volume: 0.3 });
    }
  };

  return {
    countdownRef,
    showTime,
    countdownDate,
    isPlaying,
    startExercise,
    pauseExercise,
    handleOnComplete,
    handleOnTick,
    isInitial,
  };
};

