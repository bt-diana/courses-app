import { createSlice } from '@reduxjs/toolkit';
import { CourseResource } from '../types';

type CoursesState = {
  data: CourseResource[];
};

type CoursesAction<T> = {
  type: string;
  payload: T;
};

const initialState: CoursesState = {
  data: [
    {
      id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
      title: 'JavaScript',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      creationDate: '08/03/2021',
      duration: 160,
      authors: [
        'f762978b-61eb-4096-812b-ebde22838167',
        '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
      ],
    },
    {
      id: 'b5630fcv-9bf7-4d39-b75a-3m5906fd0916',
      title: 'React',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      creationDate: '11/04/2025',
      duration: 610,
      authors: [
        'f762978b-61eb-4096-812b-ebde22838167',
        '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
      ],
    },
  ],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state: CoursesState, action: CoursesAction<CourseResource>) => {
      state.data.push(action.payload);
    },
    removeCourse: (state: CoursesState, action: CoursesAction<string>) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addCourse, removeCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
