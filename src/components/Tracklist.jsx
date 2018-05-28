import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { backToPlaylists } from '../redux/actions';

import TracklistItem from './TracklistItem'
import styles from "../app.sass";

const propTypes = {
  loadingPlaylistTracks: PropTypes.bool,
  playlistName: PropTypes.string,
  tracks: PropTypes.array,
  _backToPlaylists: PropTypes.func,
};

const Tracklist = (props) => {
  const {
    loadingPlaylistTracks,
    playlistName,
    tracks,
    _backToPlaylists,
  } = props;

  if (loadingPlaylistTracks || !tracks) {
    return <div>Loading tracks...</div>;
  }

  let songComponents = [];
  for (let i = 0; i < tracks.length; i++) {
    songComponents.push(
      <TracklistItem
        key={i}
        name={tracks[i].track.name}
      />
    );
  }

  return(
    <div className={styles.tracklist}>
      <div className={styles.tracklistTitle}>
        {playlistName}
        <div className={styles.backButton} onClick={() => _backToPlaylists()}>
          {"<- Back"}
        </div>
      </div>
      {songComponents}
    </div>
  );
};

Tracklist.propTypes = propTypes;

const mapStateToProps = state => ({
  loadingPlaylistTracks: state.loadingPlaylistTracks,
  playlistName: state.currentPlaylistName,
  tracks: state.tracks,
});

const mapDispatchToProps = dispatch => ({
  _backToPlaylists: () => { dispatch(backToPlaylists()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);
