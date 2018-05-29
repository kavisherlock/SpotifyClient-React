import { call, put, takeLatest } from 'redux-saga/effects';

import Service from './service';

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOAD_PLAYLISTS,
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_FAILURE,
  LOAD_PLAYLIST_TRACKS,
  LOAD_PLAYLIST_TRACKS_SUCCESS,
  LOAD_PLAYLIST_TRACKS_FAILURE,
  TOGGLE_PLAY_PLAYLIST,
  TOGGLE_PLAY_TRACK,
} from './actions';

function* fetchUser(action) {
  try {
    const userData = yield call(Service.loginUser, action.data.accessToken);
    yield put({ type: LOGIN_USER_SUCCESS, data: { userData } });
  } catch (e) {
    yield put({ type: LOGIN_USER_FAILURE, data: { userLoginError: e } });
  }
}

function* fetchPlaylists(action) {
  try {
    const playlists = yield call(Service.fetchPlaylists, action.data.accessToken);
    yield put({ type: LOAD_PLAYLISTS_SUCCESS, data: { playlists: playlists.items } });
  } catch (e) {
    yield put({ type: LOAD_PLAYLISTS_FAILURE, data: { playlistsError: e } });
  }
}

function* fetchPlaylistTracks(action) {
  try {
    const tracks = yield call(Service.fetchPlaylistTracks,
      action.data.accessToken,
      action.data.userId,
      action.data.playlist.id);
    yield put({ type: LOAD_PLAYLIST_TRACKS_SUCCESS, data: { tracks: tracks.items } });
  } catch (e) {
    yield put({ type: LOAD_PLAYLIST_TRACKS_FAILURE, data: { tracksError: e } });
  }
}

function* togglePlayPlaylist(action) {
  if (action.data.nowPlayingPlaylistId !== action.data.playlist.id) {
    try {
      const tracks = yield call(Service.fetchPlaylistTracks,
        action.data.accessToken,
        action.data.userId,
        action.data.playlist.id);
      yield put({ type: TOGGLE_PLAY_TRACK, data: { track: tracks.items[0].track } });
    } catch (e) {
      yield put({ type: LOAD_PLAYLIST_TRACKS_FAILURE, data: { tracksError: e } });
    }
  }
}

// MAIN FETCH SAGA
function* fetchSaga() {
  yield [
    takeLatest(LOGIN_USER, fetchUser),
    takeLatest(LOAD_PLAYLISTS, fetchPlaylists),
    takeLatest(LOAD_PLAYLIST_TRACKS, fetchPlaylistTracks),
    takeLatest(TOGGLE_PLAY_PLAYLIST, togglePlayPlaylist),
  ];
}

export { fetchUser, fetchPlaylists, fetchSaga, togglePlayPlaylist };
export default [fetchSaga];
