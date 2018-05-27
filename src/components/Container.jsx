import React from 'react';
import PlaylistGrid from './PlaylistGrid';
// import SongList from './SongList';

import styles from "../app.sass"

const Container = () => {
  return(
    <div className={styles.musicContainer}>
      <PlaylistGrid />
    </div>
  );
};

export default Container;
