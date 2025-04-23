import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit';
import { AuthorResource } from '../types';
import { DataState, Status } from '../types';
import { deleteAuthor, getAuthors, postAuthor } from '../api/authors';
import { UNKNOWN_ERROR_MESSAGE } from '../constants';

type AuthorsState = {
  authors: AuthorResource[];
  courseAuthors: string[];
} & DataState;

enum authorsThunkType {
  fetchAuthors = 'authors/fetchAuthors',
  addAuthor = 'authors/addAuthor',
  removeAuthor = 'authors/removeAuthor',
}

const fetchAuthors = createAsyncThunk(
  authorsThunkType.fetchAuthors,
  async () => await getAuthors()
);

const addAuthor = createAsyncThunk(
  authorsThunkType.addAuthor,
  async (name: string) => await postAuthor(name)
);

const removeAuthor = createAsyncThunk(
  authorsThunkType.removeAuthor,
  async (id: string) => await deleteAuthor(id)
);

const initialState: AuthorsState = {
  authors: [],
  courseAuthors: [],
  status: Status.idle,
  error: null,
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setCourseAuthors: (state, action: Action & { payload: string[] }) => {
      state.courseAuthors = action.payload;
    },
    clearCourseAuthors: (state) => {
      state.courseAuthors = [];
    },
    addCourseAuthor: (state, action: Action & { payload: string }) => {
      state.courseAuthors.push(action.payload);
    },
    removeCourseAuthor: (state, action: Action & { payload: string }) => {
      state.courseAuthors = state.courseAuthors.filter(
        (courseId) => courseId !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.authors = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? UNKNOWN_ERROR_MESSAGE;
      })

      .addCase(addAuthor.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(addAuthor.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.authors.push(action.payload);
      })
      .addCase(addAuthor.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? UNKNOWN_ERROR_MESSAGE;
      })

      .addCase(removeAuthor.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(removeAuthor.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.authors = state.authors.filter(
          ({ id }) => id !== action.payload.id
        );
      })
      .addCase(removeAuthor.rejected, (state, action) => {
        state.status = Status.failed;
        state.error = action.error.message ?? UNKNOWN_ERROR_MESSAGE;
      });
  },
});

export { fetchAuthors, addAuthor, removeAuthor };
export const {
  setCourseAuthors,
  addCourseAuthor,
  removeCourseAuthor,
  clearCourseAuthors,
} = authorsSlice.actions;
export default authorsSlice.reducer;
