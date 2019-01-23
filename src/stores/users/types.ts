export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
}

export type ApiResponse = Record<string, any>;

export enum UserActionTypes {
  FETCH_REQUEST = '@@user/FETCH_REQUEST',
  FETCH_SUCCESS = '@@user/FETCH_SUCCESS',
  FETCH_ERROR = '@@user/FETCH_ERROR',
  SELECTED = '@@user/SELECTED'
}

export interface IUserState {
  readonly loading: boolean;
  readonly data: IUser[];
  readonly errors?: string;
}
