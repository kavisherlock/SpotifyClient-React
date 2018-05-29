import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlaylistTile from './PlaylistTile';
import styles from "../app.sass"

const propTypes = {
  loadingPlaylists: PropTypes.bool,
  playlists: PropTypes.array,
}

const PlaylistGrid = (props) => {
  const {
    loadingPlaylists,
    playlists,
  } = props;

  if (loadingPlaylists || !playlists) {
    return <div>Loading playlists...</div>;
  }

  let playlistComponents = [];
  for (let i = 0; i < playlists.length; i++) {
    playlistComponents.push(
      <PlaylistTile
        key={i}
        playlist={playlists[i]}
      />
    );
  }

  return(
    <div className={styles.playlistGridContainer}>
      <div className={styles.playlistGrid}>
        {playlistComponents}
      </div>
    </div>
  );
};

PlaylistGrid.propTypes = propTypes;

const mapStateToProps = state => ({
  loadingPlaylists: state.loadingPlaylists,
  playlists: state.playlists,
});

export default connect(mapStateToProps)(PlaylistGrid);
