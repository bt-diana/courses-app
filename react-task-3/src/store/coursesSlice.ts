import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseResource } from '../types';
import { DataState, Status } from '../types';
import {
  deleteCourse,
  getCourses,
  postCourse,
  putCourse,
} from '../api/courses';

type CoursesState = {
  courses: CourseResource[];
} & DataState;

const fetchCourses = createAsyncThunk('courses/fetchCourses', async () =>
  getCourses()
);

const addCourse = createAsyncThunk(
  'courses/addCourse',
  async (courseData: Omit<CourseResource, 'id'>) => postCourse(courseData)
);

const editCourse = createAsyncThunk(
  'courses/editCourse',
  async (course: CourseResource) => await putCourse(course.id, course)
);

const initialState: CoursesState = {
  courses: [],
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
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(addCourse.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.courses.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(editCourse.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.courses = state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course
        );
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export { fetchCourses, addCourse, editCourse };
export default coursesSlice.reducer;
