import exerciseData from '../assets/data/exercises-template.json';
import {
  getExercisesByBodyPartsAndEquipments,
  getSettings,
  groupObjectByField,
  getExerciseSessions,
  shuffle,
} from './ExerciseServiceHelper';

export const ExerciseService = {
  getAllBodyParts: async () => {
    const bodyParts = exerciseData.map((e) => e.bodyPart);
    const uniqueBodyParts = [...new Set(bodyParts)];
    return uniqueBodyParts.sort();
  },

  getAllEquipments: async () => {
    const equipments = exerciseData.map((e) => e.equipment);
    const uniqueEquipments = [...new Set(equipments)];
    return uniqueEquipments.sort();
  },

  searchExercises: async (searchText) => {
    if (Boolean(!searchText) || searchText.trim().length === 0) {
      return exerciseData;
    }

    const lowercaseSearchText = searchText.toLowerCase();
    return exerciseData.filter((ex) =>
      ex.bodyPart.includes(lowercaseSearchText) ||
      ex.equipment.includes(lowercaseSearchText) ||
      ex.name.includes(lowercaseSearchText) ||
      ex.target.includes(lowercaseSearchText)
    );
  },

  getFullbodyExerciseSessions: async (payload) => {
    const settings = getSettings(payload);
    const {
      bodyParts,
      equipments,
      sessionDuration,
      exerciseDurationInSecond,
      smallBreakInSecond,
      numberOfFullBodySessions,
    } = settings;
    const exerciseDurationInMinute = (exerciseDurationInSecond + smallBreakInSecond) / 60;
    const numberOfExercises = Math.round(sessionDuration / exerciseDurationInMinute);
    const exercisesByBodyPartsAndEquipments = getExercisesByBodyPartsAndEquipments({
      bodyParts,
      equipments,
    });

    const exercisesGroupByBodyParts = groupObjectByField({ list: exercisesByBodyPartsAndEquipments, fieldName: 'bodyPart' });
    const shuffleExercisesKeys = Object.keys(exercisesGroupByBodyParts);

    const fullBodyList = getExerciseSessions(
      {
        numberOfFullBodySessions,
        numberOfExercises,
        bodyParts,
        shuffleExercisesKeys,
        exercisesGroupByBodyParts,
      }
    );
    return fullBodyList;
  },

  getSpecificExerciseSessions: async (payload) => {
    const {
      bodyParts,
      equipments,
      specificPartDuration,
      exerciseDurationInSecond,
      smallBreakInSecond,
      numberOfBodyPartSessions,
    } = payload;
    const exerciseDurationInMinute = (exerciseDurationInSecond + smallBreakInSecond) / 60;
    const numberOfExercises = Math.round(specificPartDuration / exerciseDurationInMinute);

    const result = {};
    bodyParts.forEach((b) => {
      result[b] = [];
      for (let i = 0; i < numberOfBodyPartSessions; i++) {
        const exercisesByBodyPartsAndEquipments = getExercisesByBodyPartsAndEquipments({
          bodyParts: [b],
          equipments,
        });
        const shuffleExercisesByBodyPartsAndEquipments = shuffle(exercisesByBodyPartsAndEquipments);
        result[b].push(shuffleExercisesByBodyPartsAndEquipments.splice(0, numberOfExercises));
      }
    });

    return result;
  },
};