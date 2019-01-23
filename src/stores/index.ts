// import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux';
// import { routerReducer, RouterState } from 'react-router-redux';
import { all, fork } from 'redux-saga/effects';

import { userSaga } from './users/saga';

// export interface IApplicationState {
//   layout: any,
// }

export function* rootSaga() {
  yield all([fork(userSaga)]);
}
