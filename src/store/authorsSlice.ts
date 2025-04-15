import { createSlice } from '@reduxjs/toolkit';
import { AuthorResource } from '../types';

type AuthorsState = {
  data: AuthorResource[];
};

type AuthorsAction<T> = {
  type: string;
  payload: T;
};

const initialState: AuthorsState = {
  data: [
    {
      id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
      name: 'Vasiliy Dobkin',
    },
    {
      id: 'f762978b-61eb-4096-812b-ebde22838167',
      name: 'Nicolas Kim',
    },
    {
      id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
      name: 'Anna Sidorenko',
    },
    {
      id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
      name: 'Valentina Larina',
    },
  ],
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addAuthor: (state: AuthorsState, action: AuthorsAction<AuthorResource>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
