import * as PIXI from 'pixi.js';
import 'pixi-sound';
import { useEffect } from 'react';
import startCountdown from '../assets/audio/start-countdown.mp3';

const SOUND_KEYS = {
  startCountdown: 'startCountdown',
  exerciseComplete: 'exerciseComplete',
};

const resources = [{
  id: SOUND_KEYS.startCountdown,
  src: startCountdown,
},
];

export const useInitialSounds = () => {
  useEffect(() => {
    const loader = PIXI.Loader.shared;

    resources.forEach((r) => {
      if ((!loader.resources[r.id])) {
        loader.add(r.id, r.src);
      }
    });

    loader.load();
  }, []);
};


export const usePlaySound = () => {
  const pixiLoader = PIXI.Loader.shared;
  const getCountdownSound = () => {
    return pixiLoader?.resources[SOUND_KEYS.startCountdown]?.sound;
  };

  return {
    getCountdownSound,
  };
};