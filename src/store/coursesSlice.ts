import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseResource } from '../types';
import { DataState, Status } from '../types';
import getCourses from '../api/getCourses';
import postCourse from '../api/postCourse';
import putCourse from '../api/putCourse';

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

const addCourse = createAsyncThunk(
  'courses/addCourse',
  async (courseData: Omit<CourseResource, 'id'>) => {
    try {
      const res = await postCourse(courseData);
      return res;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error';
      return message;
    }
  }
);

const editCourse = createAsyncThunk(
  'courses/editCourse',
  async (course: CourseResource) => {
    try {
      const res = await putCourse(course.id, course);
      return res;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error';
      return message;
    }
  }
);

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
      })

      .addCase(addCourse.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.data.push(action.payload);
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
        state.data = state.data.map((course) =>
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
