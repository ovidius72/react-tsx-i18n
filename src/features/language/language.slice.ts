import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
  lang: string;
}

const initialState: LanguageState = {
  lang: 'en',
};

export const languageSlice = createSlice({
  initialState,
  name: '@language',
  reducers: {
    setCatalog: (state, a: PayloadAction<string>) => {
      state.lang = a.payload;
    },
  },
});

export const languageActions = { ...languageSlice.actions };
