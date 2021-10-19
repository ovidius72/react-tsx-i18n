import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getStoredLanguage, setStoredLanguage } from 'src/i18n';
import { RootState } from '../../store';

export interface LanguageState {
  lang: string;
}

const initialState: LanguageState = {
  lang: getStoredLanguage(),
};

export const languageSlice = createSlice({
  initialState,
  name: '@language',
  reducers: {
    setCatalog: (state, a: PayloadAction<string>) => {
      state.lang = a.payload;
      setStoredLanguage(a.payload);
    },
  },
});

const selfState = (state: RootState) => state.language;
export const selectedLanguageSelector = createDraftSafeSelector(
  selfState,
  s => s.lang,
);
export const languageActions = { ...languageSlice.actions };
