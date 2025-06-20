import { combineReducers, configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import authorsReducer from './authorsSlice';

const rootReducer = combineReducers({
  coursesSlice: coursesReducer,
  authorsSlice: authorsReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export default setupStore;

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export const getCourses = (state: RootState) => state.coursesSlice.courses;
export const getCoursesStatus = (state: RootState) => state.coursesSlice.status;
export const getCoursesError = (state: RootState) => state.coursesSlice.error;

export const getAuthors = (state: RootState) => state.authorsSlice.authors;
export const getCourseAuthors = (state: RootState) =>
  state.authorsSlice.courseAuthors;
export const getAuthorsStatus = (state: RootState) => state.authorsSlice.status;
export const getAuthorsError = (state: RootState) => state.authorsSlice.error;
