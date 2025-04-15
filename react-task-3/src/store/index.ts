import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import authorsReducer from './authorsSlice';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    authors: authorsReducer,
  },
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const getCourses = (state: RootState) => state.courses.data;
export const getCoursesStatus = (state: RootState) => state.courses.status;
export const getCoursesError = (state: RootState) => state.courses.error;

export const getAuthors = (state: RootState) => state.authors.data;
export const getAuthorsStatus = (state: RootState) => state.authors.status;
export const getAuthorsError = (state: RootState) => state.authors.error;
