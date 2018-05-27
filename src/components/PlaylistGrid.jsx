import React from 'react';
import PlaylistTile from './PlaylistTile';

import styles from "../app.sass"

const PlaylistGrid = () => {
  return(
    <div className={styles.playlistGridContainer}>
      <div className={styles.playlistGrid}>
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
        <PlaylistTile />
      </div>
    </div>
  );
};

export default PlaylistGrid;
