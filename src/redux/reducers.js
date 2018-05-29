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
  BACK_TO_PLAYLISTS,
  TOGGLE_PLAY_PLAYLIST,
  TOGGLE_PLAY_TRACK,
} from './actions';

const blankId = { id: '' };

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
  loadingPlaylistTracks: false,
  currentPlaylist: null,
  tracks: [],
  tracksError: null,
  lastPlayingTrack: null,
  lastPlayingPlaylist: null,
  nowPlayingPlaylist: blankId,
  nowPlayingTrack: blankId,
  audio: null,
}

const Reducers = (state = defaultState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case LOGIN_USER:
      newState.accessToken = action.data.accessToken;
      newState.loggingIn = true;
      newState.userLoginError = null;
      return newState;

    case LOGIN_USER_SUCCESS:
      newState.loggingIn = false;
      newState.loggedIn = true;
      newState.userData = action.data.userData;
      return newState;

    case LOGIN_USER_FAILURE:
      newState.loggingIn = false;
      newState.userLoginError = action.data.userLoginError;
      return newState;

    case LOAD_PLAYLISTS:
      newState.loadingPlaylists = true;
      newState.playlistsError = null;
      return newState;

    case LOAD_PLAYLISTS_SUCCESS:
      newState.loadingPlaylists = false;
      newState.playlists = action.data.playlists;
      return newState;

    case LOAD_PLAYLISTS_FAILURE:
      newState.loadingPlaylists = false;
      newState.playlistsError = action.data.playlistsError;
      return newState;

    case LOAD_PLAYLIST_TRACKS:
      newState.currentPlaylist = action.data.playlist;
      newState.loadingPlaylistTracks = true;
      newState.tracksError = null;
      return newState;

    case LOAD_PLAYLIST_TRACKS_SUCCESS:
      newState.loadingPlaylistTracks = false;
      newState.tracks = action.data.tracks;
      newState.currentView = 'TRACKS';
      return newState;

    case LOAD_PLAYLIST_TRACKS_FAILURE:
      newState.loadingPlaylistTracks = false;
      newState.tracksError = action.data.tracksError;
      return newState;

    case BACK_TO_PLAYLISTS:
      newState.currentView = 'PLAYLISTS';
      newState.currentPlaylist = null;
      return newState;

    case TOGGLE_PLAY_PLAYLIST:
      if (state.audio) {
        state.audio.pause();
        if (newState.nowPlayingPlaylist.id === action.data.playlist.id) {
          newState.lastPlayingTrack = Object.assign({}, state.nowPlayingTrack);
          newState.lastPlayingPlaylist = Object.assign({}, state.nowPlayingPlaylist);
          newState.nowPlayingTrack = blankId;
          newState.nowPlayingPlaylist = blankId;
          return newState;
        }
      }
      newState.nowPlayingPlaylist = action.data.playlist;
      return newState;

    case TOGGLE_PLAY_TRACK:
      let newTrack = action.data.track;
      if (!newTrack) {
        newTrack = state.tracks[action.data.trackIndex].track;
      }
      if (state.audio) {
        state.audio.pause();
        if (newState.nowPlayingTrack.id === newTrack.id) {
          newState.lastPlayingTrack = Object.assign({}, state.nowPlayingTrack);
          newState.lastPlayingPlaylist = Object.assign({}, state.nowPlayingPlaylist);
          newState.nowPlayingTrack = blankId;
          newState.nowPlayingPlaylist = blankId;
          return newState;
        }
      }

      if (state.currentPlaylist) {
        newState.nowPlayingPlaylist = Object.assign({}, state.currentPlaylist);
      }
      newState.nowPlayingTrack = Object.assign({}, newTrack);
      newState.audio = new Audio(newTrack.preview_url);
      newState.audio.play();
      return newState;

    default:
      return state;
  }
};

export default Reducers;
