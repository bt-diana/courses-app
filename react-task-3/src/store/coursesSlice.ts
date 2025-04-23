import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseResource } from '../types';
import { DataState, Status } from '../types';
import {
  deleteCourse,
  getCourses,
  postCourse,
  putCourse,
} from '../api/courses';
import { UNKNOWN_ERROR_MESSAGE } from '../variables';

type CoursesState = {
  courses: CourseResource[];
} & DataState;

enum coursesThunkType {
  fetchCourses = 'courses/fetchCourses',
  addCourse = 'courses/addCourse',
  editCourse = 'courses/editCourse',
  removeCourse = 'courses/removeourse',
}

const fetchCourses = createAsyncThunk(coursesThunkType.fetchCourses, async () =>
  getCourses()
);

const addCourse = createAsyncThunk(
  coursesThunkType.addCourse,
  async (courseData: Omit<CourseResource, 'id'>) => postCourse(courseData)
);

const editCourse = createAsyncThunk(
  coursesThunkType.editCourse,
  async (course: CourseResource) => await putCourse(course.id, course)
);

const removeCourse = createAsyncThunk(
  coursesThunkType.removeCourse,
  async (id: string) => await deleteCourse(id)
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
        state.error = action.error.message ?? UNKNOWN_ERROR_MESSAGE;
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
        state.error = action.error.message ?? UNKNOWN_ERROR_MESSAGE;
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
        state.error = action.error.message ?? UNKNOWN_ERROR_MESSAGE;
      })

      .addCase(removeCourse.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.courses = state.courses.filter(
          ({ id }) => id !== action.payload.id
        );
      })
      .addCase(removeCourse.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? UNKNOWN_ERROR_MESSAGE;
      });
  },
});

export { fetchCourses, addCourse, editCourse, removeCourse };
export default coursesSlice.reducer;
