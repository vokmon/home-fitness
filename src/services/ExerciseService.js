import exerciseData from '../assets/data/exercises-template.json';
import { DEFAULT_APP_SETTINGS } from '../constants/AppSettingConstants';

const getSettings = (payload) => {
  const result = {};
  Object.keys((payload)).forEach((key) => {
    result[key] = payload[key] || DEFAULT_APP_SETTINGS[key];
  });

  return result;
};

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
      // bodyParts,
      // equipments,
      // sessionDuration,
      exerciseDurationInSecond,
      smallBreakInSecond
    } = settings;
    // console.log(settings);
    // eslint-disable-next-line no-unused-vars
    const exerciseDurationInMinute = (exerciseDurationInSecond + smallBreakInSecond) / 60;
    // console.log(exerciseDurationInMinute);
  },

  getSpecificExerciseSessions: async (payload) => {
    // const {
    //   bodyParts,
    //   equipments,
    //   specificPartDuration,
    //   exerciseDurationInSecond,
    //   smallBreakInSecond
    // } = payload;
    console.log(payload);
  },
};