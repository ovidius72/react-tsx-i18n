import { Reducer } from 'redux';

import { IUserState, UserActionTypes } from './types';

const initialState: IUserState = {
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<IUserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case UserActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case UserActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
