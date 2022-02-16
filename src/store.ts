import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { photosApi } from './api/photosApi';
import { languageSlice } from './features/language/language.slice';
import postsSlice from 'features/posts/posts.sclice';

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
    posts: postsSlice.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(photosApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
