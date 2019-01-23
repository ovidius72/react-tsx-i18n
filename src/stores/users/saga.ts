import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fetchError, fetchSuccess } from './actions';
import { UserActionTypes } from './types';

const API_ENDPOINT = process.env.API_URL;

function* handleFetch() {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, '/users');
    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchSuccess(res));
    }
  } catch (e) {
    yield put(fetchError('An unknown error occurred.'));
  }
}

function* watchFetchRequest() {
  yield takeEvery(UserActionTypes.FETCH_REQUEST, handleFetch);
}

export function* userSaga() {
  yield all([fork(watchFetchRequest)]);
}
