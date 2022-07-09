import { useGetRemoteServiceWrapper } from '../../hooks/RemoteServiceHooks';
import { ExerciseService } from '../../services/ExerciseService';
import { useSearchStore } from './SearchStore';

export const useSearchExercises = () => {
  const searchText = useSearchStore(state => state.searchText);
  const setSearchText = useSearchStore(state => state.setSearchText);
  const setSearchResult = useSearchStore(state => state.setSearchResult);
  
  const {
    loading,
    callRemoteServiceWrapper,
  } = useGetRemoteServiceWrapper();

  const handleOnSubmit = (e) => {
    callRemoteServiceWrapper(async () => {
      e.preventDefault();
      const searchResult = await ExerciseService.searchExercises(searchText);
      setSearchText('');
      setSearchResult({
        searchText: searchText,
        exerciseList: searchResult,
      });
    });
  };

  return {
    handleOnSubmit,
    loading,
  };
};


export const useSelectExercise = () => {
  const selectedExercise = useSearchStore(state => state.selectedExercise);
  const setSelectedExercise = useSearchStore(state => state.setSelectedExercise);

  const openExerciseDialog = (selectedExercise) => {
    setSelectedExercise(selectedExercise);
  };

  const closeExerciseDialog = () => {
    setSelectedExercise(undefined);
  };
  return {
    open: Boolean(selectedExercise),
    closeExerciseDialog,
    openExerciseDialog,
    selectedExercise,
  };
};
