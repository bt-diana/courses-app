import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorResource } from '../types';
import { DataState, Status } from '../types';
import getAuthors from '../api/getAuthors';

type AuthorsState = {
  authors: AuthorResource[];
  courseAuthors: AuthorResource[];
} & DataState;

const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
  try {
    const res = await getAuthors();
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Error';
    return message;
  }
});

const initialState: AuthorsState = {
  authors: [],
  courseAuthors: [],
  status: Status.idle,
  error: null,
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
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
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export { fetchAuthors };
export default authorsSlice.reducer;
