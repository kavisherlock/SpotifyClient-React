import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MdPlaylistPlay from 'react-icons/lib/md/playlist-play';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import Button from './Button';
import { loadPlaylistTracks, playPlaylistTracks } from '../redux/actions';

import styles from "../app.sass";

const propTypes = {
  accessToken: PropTypes.string,
  userId: PropTypes.string,
  playlistId: PropTypes.string,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  _loadPlaylistTracks: PropTypes.func,
  _playPlaylistTracks: PropTypes.func,
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
      accessToken,
      userId,
      playlistId,
      _loadPlaylistTracks,
      _playPlaylistTracks,
    } = this.props;

    let tileOverlay = null;
    let imageClassNames = null;
    if (this.state.hovering) {
      imageClassNames = styles.transparentImage;
      tileOverlay = (
        <div className={styles.tileOverlay}>
          <div className={styles.tileTitle}>{name}</div>
          <div className={styles.tileButtons}>
            <Button
              icon={<MdPlaylistPlay size={32} style={{ paddingTop: '3px' }} />}
              handleButtonClick={() => _loadPlaylistTracks(accessToken, userId, playlistId, name)}
            />
            <Button
              icon={<MdPlayArrow size={32} />}
              handleButtonClick={() => _playPlaylistTracks(accessToken, userId, playlistId)}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={styles.playlistTile}
        onMouseOver={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
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
  _playPlaylistTracks: (accessToken, userId, playlistId) => { dispatch(playPlaylistTracks(accessToken, userId, playlistId)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTile);
