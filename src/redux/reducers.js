import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOAD_PLAYLISTS,
  LOAD_PLAYLISTS_SUCCESS,
  LOAD_PLAYLISTS_FAILURE,
} from './actions';

const defaultState = {
  loggingIn: false,
  loggedIn: false,
  accessToken: '',
  userData: null,
  userLoginError: null,
  currentView: 'PLAYLISTS',
  loadingPlaylists: false,
  playlists: [],
  playlistsError: null,
}

const Reducers = (state = defaultState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case LOGIN_USER:
      newState.loggingIn = true;
      newState.userLoginError = '';
      return state;

    case LOGIN_USER_SUCCESS:
      newState.loggingIn = false;
      newState.loggedIn = true;
      newState.accessToken = action.data.accessToken;
      newState.userData = action.data.userData;
      return newState;

    case LOGIN_USER_FAILURE:
      newState.loggingIn = false;
      newState.userLoginError = action.data.userLoginError;
      return newState;

    case LOAD_PLAYLISTS:
      newState.loadingPlaylists = true;
      newState.playlistsError = '';
      return state;

    case LOAD_PLAYLISTS_SUCCESS:
      newState.loadingPlaylists = false;
      newState.playlists = action.data.playlists;
      return newState;

    case LOAD_PLAYLISTS_FAILURE:
      newState.loadingPlaylists = false;
      newState.playlistsError = action.data.playlistsError;
      return newState;

    default:
      return state;
  }
};

export default Reducers;
