import React from 'react';
import PropTypes from 'prop-types';

import styles from "../app.sass";

const propTypes = {
  name: PropTypes.string,
};

const TracklistItem = (props) => {
  return(
    <div className={styles.tracklistItem}>
      {props.name}
    </div>
  );
};

TracklistItem.propTypes = propTypes;

export default TracklistItem;
