import create from 'zustand';

export const useExerciseSessionStore = create(set => ({
  fullBodyExerciseList: [],
  specificExerciseList: {},
  setExerciseSessionsList: ({ fullBodyExerciseList, specificExerciseList }) => {
    set({ fullBodyExerciseList, specificExerciseList });
  },
}));
