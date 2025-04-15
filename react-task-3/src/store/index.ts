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
