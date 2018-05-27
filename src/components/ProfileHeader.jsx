import React from 'react';
import PropTypes from 'prop-types';

import styles from "../app.sass"

const propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

const defaultProps = {
  imageUrl: null,
};

const Profile = (props) => {
  const {
    name,
    imageUrl,
  } = props;

  let userImage = null;
  if (imageUrl) {
    userImage = (
      <img
        className={styles.userImage}
        src={imageUrl}
        alt={"profile-image"}
        height={90}
      />
    );
  }

  return(
    <div className={styles.profileHeader}>
      {userImage}
      <span className={styles.userName}>{name}</span>
    </div>
  );
};

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default Profile;
