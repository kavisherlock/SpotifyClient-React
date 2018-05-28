import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPlaylistTracks } from '../redux/actions';

import styles from "../app.sass";

const propTypes = {
  accessToken: PropTypes.string,
  userId: PropTypes.string,
  playlistId: PropTypes.string,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  _loadPlaylistTracks: PropTypes.func,
};

class PlaylistTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleHoverEnd = this.handleHoverEnd.bind(this);
  }

  handleHover() {
    this.setState({ hovering: true });
  }

  handleHoverEnd() {
    this.setState({ hovering: false });
  }

  render() {
    const {
      name,
      imageUrl,
      _loadPlaylistTracks,
      accessToken,
      userId,
      playlistId,
    } = this.props;

    let tileOverlay = null;
    let imageClassNames = null;
    if (this.state.hovering) {
      imageClassNames = styles.transparentImage;
      tileOverlay = (
        <div className={styles.tileOverlay}>
          <div className={styles.tileTitle}>{name}</div>
          <div className={styles.tileButtons}>
            <div
              className={styles.tileButton}
              onClick={() => _loadPlaylistTracks(accessToken, userId, playlistId, name)}
            >
              Open
            </div>
            <div className={styles.tileButton}>Play</div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={styles.playlistTile}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHoverEnd}
      >
        <div>
          <img
            className={imageClassNames}
            src={imageUrl}
            alt="playlist-pic"
            width={250}
          />
          {tileOverlay}
        </div>
      </div>
    );
  }
}

PlaylistTile.propTypes = propTypes;

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  userId: state.userData.id,
});

const mapDispatchToProps = dispatch => ({
  _loadPlaylistTracks: (accessToken, userId, playlistId, name) => { dispatch(loadPlaylistTracks(accessToken, userId, playlistId, name)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTile);
