import { Box, Button, Fade, Stack, TextField, Typography } from '@mui/material';
import ExerciseDetailDialog from '../../components/exercises/ExerciseDetailDialog';
import ExercisesList from '../../components/list/ExercisesList';
import LoadingSpinner from '../../components/loader/LoadingSpinner';
import { useAppSettingsStore } from '../../stores/AppSettingsStore';
import { useSearchExercises, useSelectExercise } from './SearchHooks';
import { useSearchStore } from './SearchStore';

function Search() {
  const searchText = useSearchStore(state => state.searchText);
  const setSearchText = useSearchStore(state => state.setSearchText);
  const searchResult = useSearchStore(state => state.searchResult);
  const exerciseDurationInSecond = useAppSettingsStore(state => state.exerciseDurationInSecond);
  const smallBreakInSecond = useAppSettingsStore(state => state.smallBreakInSecond);

  const { searchText: searchResultSearchText, exerciseList } = searchResult;
  const {
    open,
    closeExerciseDialog,
    openExerciseDialog,
    selectedExercise,
  } = useSelectExercise();

  const {
    handleOnSubmit,
    loading,
  } = useSearchExercises();

  return (
    <>
      <Fade in>
        <Stack alignItems='center' mt='20px' justifyContent='center' p='10px'>
          <Typography fontWeight={700} mb='20px' textAlign='center'>
            Search All Exercises
          </Typography>
          <form onSubmit={handleOnSubmit}>
            <Box
              position='relative'
              mb='30px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              sx={{
                flexDirection: {
                  md: 'row',
                  lg: 'row',
                  xs: 'column',
                },
              }}
            >
              <TextField
                height='76px'
                sx={
                  {
                    input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
                    width: { lg: '700px', xs: '300px' }, backgroundColor: '#fff', borderRadius: '40px'
                  }}
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); }}
                placeholder='Search Exercises e.g. abs, waist, dumbbell, body weight'
                type='text'
                autoFocus
              />
              <Button
                variant='contained'
                className='search-btn'
                sx={{
                  ml: 2,
                  height: '46px',
                  mt: {
                    md: 0,
                    lg: 0,
                    xs: 2,
                  }
                }}
                color='secondary'
                type='submit'
              >
                Search
              </Button>
            </Box>
          </form>
          {loading && (
            <LoadingSpinner message={'Searching exercises'} />
          )}
          {!loading && exerciseList && exerciseList.length > 0 && (
            <>
              <Typography variant='h6' textAlign='center' fontWeight='bold' mb='46px'>
                Showing Results for <br />
                &quot;{searchResultSearchText}&quot;
              </Typography>
              <ExercisesList
                exercises={exerciseList}
                exercisesPerPage={10}
                onCardSelect={(exercise) => {
                  openExerciseDialog(exercise);
                }}
              />
            </>
          )}
          {
            !loading && Boolean(searchResultSearchText) && exerciseList.length === 0 && (
              <Typography variant='h6' textAlign='center' fontWeight='bold' mb='46px'>
                No Exercise found for the search<br />
                &quot;{searchResultSearchText}&quot;
              </Typography>
            )
          }
        </Stack>
      </Fade>
      <ExerciseDetailDialog
        open={open}
        exercise={selectedExercise}
        onClose={closeExerciseDialog}
        exerciseDurationInSecond={exerciseDurationInSecond}
        smallBreakInSecond={smallBreakInSecond}
        fullWidth
      />
    </>
  );
}

export default Search;
