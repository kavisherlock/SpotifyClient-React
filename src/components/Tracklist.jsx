import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MdArrowBack from 'react-icons/lib/md/arrow-back';

import { backToPlaylists } from '../redux/actions';
import TracklistItem from './TracklistItem'
import Button from './Button';
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

  const backButton = (
    <div className={styles.backButton}>
      <Button
        width={56}
        height={24}
        margin={20}
        icon={<MdArrowBack size={14}/>}
        text="Back"
        handleButtonClick={() => _backToPlaylists()}
      />
    </div>
  );

  if (loadingPlaylistTracks || !tracks) {
    return (
      <div>
        Loading tracks...
        {backButton}
      </div>
    );
  }

  let songComponents = [];
  for (let i = 0; i < tracks.length; i++) {
    songComponents.push(
      <TracklistItem
        key={i}
        index={i + 1}
        track={tracks[i].track}
      />
    );
  }

  return(
    <div className={styles.tracklist}>
      <div className={styles.tracklistTitle}>
        {playlistName}
        {backButton}
      </div>
      {songComponents}
    </div>
  );
};

Tracklist.propTypes = propTypes;

const mapStateToProps = state => ({
  loadingPlaylistTracks: state.loadingPlaylistTracks,
  playlistName: state.currentPlaylist ? state.currentPlaylist.name : '',
  tracks: state.tracks,
});

const mapDispatchToProps = dispatch => ({
  _backToPlaylists: () => { dispatch(backToPlaylists()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);
