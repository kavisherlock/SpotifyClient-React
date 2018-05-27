import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import Service from './service';

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOAD_PLAYLISTS,
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_FAILURE,
} from './actions';

function* fetchUser(action) {
  try {
    const userData = yield call(Service.loginUser, action.data.accessToken);
    yield put({ type: LOGIN_USER_SUCCESS, data: { accessToken: action.data.accessToken, userData } });
  } catch (e) {
    yield put({ type: LOGIN_USER_FAILURE, data: { userLoginError: e } });
  }
}

function* fetchPlaylists(action) {
  try {
    const playlists = yield call(Service.fetchPlaylists, action.data.accessToken);
    yield put({ type: LOAD_PLAYLISTS_SUCCESS, data: { playlists: playlists.items } });
  } catch (e) {
    yield put({ type: LOAD_PLAYLISTS_FAILURE, data: { userLoginError: e } });
  }
}

// MAIN FETCH SAGA
function* fetchSaga() {
  yield [
    takeLatest(LOGIN_USER, fetchUser),
    takeEvery(LOAD_PLAYLISTS, fetchPlaylists),
  ];
}

export { fetchUser, fetchPlaylists };
export default [fetchSaga];
