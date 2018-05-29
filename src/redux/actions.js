export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOAD_PLAYLISTS = 'LOAD_PLAYLISTS';
export const LOAD_PLAYLISTS_SUCCESS = 'LOAD_PLAYLISTS_SUCCESS';
export const LOAD_PLAYLISTS_FAILURE = 'LOAD_PLAYLISTS_FAILURE';
export const LOAD_PLAYLIST_TRACKS = 'LOAD_PLAYLIST_TRACKS';
export const LOAD_PLAYLIST_TRACKS_SUCCESS = 'LOAD_PLAYLIST_TRACKS_SUCCESS';
export const LOAD_PLAYLIST_TRACKS_FAILURE = 'LOAD_PLAYLIST_TRACKS_FAILURE';
export const BACK_TO_PLAYLISTS = 'BACK_TO_PLAYLISTS';
export const PLAY_PLAYLIST = 'PLAY_PLAYLIST';
export const TOGGLE_PLAY_PLAYLIST = 'TOGGLE_PLAY_PLAYLIST';
export const TOGGLE_PLAY_TRACK = 'TOGGLE_PLAY_TRACK';

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

export function loadPlaylistTracks(accessToken, userId, playlist) {
  return {
    type: LOAD_PLAYLIST_TRACKS,
    data: {
      accessToken,
      userId,
      playlist,
    }
  };
}

export function backToPlaylists() {
  return {
    type: BACK_TO_PLAYLISTS,
  };
}

export function playPlaylist() {
  return {
    type: PLAY_PLAYLIST,
  };
}

export function togglePlayPlaylist(accessToken, userId, playlist, nowPlayingPlaylistId) {
  return {
    type: TOGGLE_PLAY_PLAYLIST,
    data: {
      accessToken,
      userId,
      playlist,
      nowPlayingPlaylistId,
    },
  };
}

export function togglePlayTrack(trackIndex, track) {
  return {
    type: TOGGLE_PLAY_TRACK,
    data: {
      track,
      trackIndex,
    },
  };
}
