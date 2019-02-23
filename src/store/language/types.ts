import { boolean } from 'yup';

export interface ILanguage {
  code: string;
  label: string;
  id: string;
}

export type ApiResponseLanguage = Record<string, any>;

export enum LanguageActionTypes {
  FETCH_REQUEST = '@@language/FETCH_REQUEST',
  FETCH_SUCCESS = '@@language/FETCH_SUCCESS',
  FETCH_ERROR = '@@language/FETCH_ERROR',
  SELECTED = '@@language/SELECTED'
}

export interface ILanguageState {
  readonly loading: boolean;
  readonly data: ILanguage;
  readonly errors?: string;
}
