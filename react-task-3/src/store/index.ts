import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import authorsReducer from './authorsSlice';

const store = configureStore({
  reducer: {
    coursesSlice: coursesReducer,
    authorsSlice: authorsReducer,
  },
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const getCourses = (state: RootState) => state.coursesSlice.courses;
export const getCoursesStatus = (state: RootState) => state.coursesSlice.status;
export const getCoursesError = (state: RootState) => state.coursesSlice.error;

export const getAuthors = (state: RootState) => state.authorsSlice.authors;
export const getCourseAuthors = (state: RootState) =>
  state.authorsSlice.courseAuthors;
export const getAuthorsStatus = (state: RootState) => state.authorsSlice.status;
export const getAuthorsError = (state: RootState) => state.authorsSlice.error;
