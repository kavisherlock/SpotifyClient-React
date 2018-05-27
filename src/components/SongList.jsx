import React from 'react';
import SongListItem from './SongListItem'

import styles from "../app.sass"

const SongList = () => {
  return(
    <div className={styles.songList}>
      <SongListItem />
      <SongListItem />
      <SongListItem />
      <SongListItem />
      <SongListItem />
      <SongListItem />
      <SongListItem />
      <SongListItem />
      <SongListItem />
    </div>
  );
};

export default SongList;
