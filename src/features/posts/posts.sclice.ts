import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { apiService } from 'api/apiService';
import { RootState } from 'src/store';

export type Post = {
  albumId: string;
  title: string;
  id: number;
  url: string;
  thumbnailUrl: string;
};

export type PostState = {
  loading: boolean;
  error: string;
  data: Post[];
  one: Post | undefined;
};

const initialState: PostState = {
  data: [],
  one: undefined,
  error: '',
  loading: false,
};

type ThunkApiConfig = {
  rejectValue: string;
  state: RootState;
};
export const postActions = {
  fetchAll: createAsyncThunk<Post[], void, ThunkApiConfig>(
    '@post/fetchAll',
    async (_, thunkApi) => {
      try {
        const response = await apiService.posts.getAll();
        const json: Post[] = await response.json();
        return json;
      } catch (e) {
        return thunkApi.rejectWithValue('Errore chiamata fetchOne');
      }
    },
  ),

  fetchOne: createAsyncThunk<Post, number, { rejectValue: string }>(
    '@post/fetchOne',
    async (id, thunkApi) => {
      try {
        const response = await apiService.posts.getOne(id);
        const json: Post = await response.json();
        return json;
      } catch (e) {
        return thunkApi.rejectWithValue('Errore chiamata fetchOne');
      }
    },
  ),
};

const postsSlice = createSlice({
  initialState,
  name: '@posts',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postActions.fetchOne.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(postActions.fetchOne.fulfilled, (s, a) => {
        s.one = a.payload;
        s.loading = false;
      })
      .addCase(postActions.fetchOne.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      .addCase(postActions.fetchAll.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(postActions.fetchAll.fulfilled, (s, a) => {
        s.data = a.payload;
        s.loading = false;
      })
      .addCase(postActions.fetchAll.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      });
  },
});

// SELECTORS:
const postStateSelector = (state: RootState) => {
  return state.posts;
};

export const postDataSelector = createSelector(postStateSelector, posts => {
  return posts.data;
});

export const postLoadingSelector = createSelector(postStateSelector, posts => {
  return posts.loading;
});

export const postErrorSelector = createSelector(postStateSelector, posts => {
  return posts.error;
});

export const hasError = createSelector(postErrorSelector, error => {
  return !!error;
});

export default postsSlice;
