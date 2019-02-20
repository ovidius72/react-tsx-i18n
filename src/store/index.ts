import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { ILayoutState, layoutReducer } from './layout';
import { userReducer } from './users/reducer';
import { userSaga } from './users/sagas';
import { IUserState } from './users/types';

export interface IApplicationState {
  layout: ILayoutState;
  users: IUserState;
  router: RouterState;
}

export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = (history: History<any>) => {
  return combineReducers<IApplicationState>({
    router: connectRouter(history),
    layout: layoutReducer,
    users: userReducer
  });
};

export function* rootSaga() {
  yield all([fork(userSaga)]);
}
