import create from 'zustand';

export const useSearchStore = create(set => ({
  searchText: '',
  searchResult: {
    searchText: '',
    exerciseList: [],
  },
  selectedExercise: undefined,
  setSearchText: (text) => {
    set({ searchText: text });
  },
  setSelectedExercise: (selectedExercise) => set({ selectedExercise }),
  setSearchResult: ({ searchText, exerciseList }) => set({ searchResult: { searchText, exerciseList } })
}));
