import exerciseData from '../assets/data/exercises-template.json';
import { DEFAULT_APP_SETTINGS } from '../constants/AppSettingConstants';

export const getSettings = (payload) => {
  const result = {};
  Object.keys((payload)).forEach((key) => {
    result[key] = payload[key] || DEFAULT_APP_SETTINGS[key];
  });

  return result;
};

export const getExercisesByBodyPartsAndEquipments = ({ bodyParts, equipments }) => {
  return exerciseData.filter((ex) =>
    bodyParts.includes(ex.bodyPart) &&
    equipments.includes(ex.equipment)
  );
};

export const groupObjectByField = ({ list, fieldName }) => {
  const result = {};
  list.forEach((l) => {
    const key = l[fieldName];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(l);
  });
  return result;
};

export const shuffle = (unshuffled) => (
  unshuffled
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
);

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getExerciseSessions = ({
  numberOfFullBodySessions,
  numberOfExercises,
  bodyParts,
  shuffleExercisesKeys,
  exercisesGroupByBodyParts,
}) => {
  const result = [];
  for (let h = 0; h < numberOfFullBodySessions; h++) {
    const resultLoop = [];
    for (let i = 0; i < numberOfExercises; i++) {
      const randomKey = getRandomInt(0, bodyParts.length - 1);
      const key = shuffleExercisesKeys[randomKey];
      const exerciseList = exercisesGroupByBodyParts[key];
      // console.log(randomKey, key, exerciseList);
      const shuffleList = shuffle(exerciseList);
      resultLoop.push(shuffleList[0]);
    }
    result.push(resultLoop);
  }
  return result;
};
