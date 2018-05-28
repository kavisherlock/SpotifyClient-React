import React from 'react';

import styles from "../app.sass";

const Profile = () => {
  return(
    <div className={styles.player}>
      <iframe
        src="https://open.spotify.com/embed?uri=spotify:track:06nfjCVr0EWxR1dQtHlasg&theme=white"
        width="98%"
        frameBorder="0"
        allow="encrypted-media"
      />
    </div>
  );
};

export default Profile;
