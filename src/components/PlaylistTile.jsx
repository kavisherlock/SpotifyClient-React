import React from 'react';
import PropTypes from 'prop-types';

import styles from "../app.sass"

const propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
};

const PlaylistTile = (props) => {
  const {
    name,
    imageUrl,
  } = props;

  return(
    <div className={styles.playlistTile}>
      {name}
      <div>
        <img
          src={imageUrl}
          alt="playlist-pic"
          width={250}
        />
      </div>
    </div>
  );
};

PlaylistTile.propTypes = propTypes;

export default PlaylistTile;
