import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseResource } from '../types';
import { DataState, Status } from '../types';
import getCourses from '../api/getCourses';

type CoursesState = DataState<CourseResource[]>;

const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  try {
    const res = await getCourses();
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Error';
    return message;
  }
});

const initialState: CoursesState = {
  data: [],
  status: Status.idle,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.data = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export { fetchCourses };
export default coursesSlice.reducer;
