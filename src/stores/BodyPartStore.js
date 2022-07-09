import create from 'zustand';

export const useBodyPartStore = create(set => ({
  bodyPartList: [],
  equipmentList: [],
  setDataList: ({ bodyPartList, equipmentList }) => {
    set({ bodyPartList, equipmentList });
  },
}));
