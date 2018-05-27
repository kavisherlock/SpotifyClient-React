export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOAD_PLAYLISTS = 'LOAD_PLAYLISTS';
export const LOAD_PLAYLISTS_SUCCESS = 'LOAD_PLAYLISTS_SUCCESS';
export const LOAD_PLAYLISTS_FAILURE = 'LOAD_PLAYLISTS_FAILURE';

export function loginUser(accessToken) {
  return {
    type: LOGIN_USER,
    data: {
      accessToken,
    }
  };
}

export function loadPlaylists(accessToken) {
  return {
    type: LOAD_PLAYLISTS,
    data: {
      accessToken,
    }
  };
}
