import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MdPlaylistPlay from 'react-icons/lib/md/playlist-play';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import Button from './Button';
import { loadPlaylistTracks, togglePlayPlaylist } from '../redux/actions';

import styles from "../app.sass";

const propTypes = {
  accessToken: PropTypes.string,
  userId: PropTypes.string,
  playlist: PropTypes.object,
  nowPlayingPlaylistId: PropTypes.string,
  _loadPlaylistTracks: PropTypes.func,
  _togglePlayPlaylist: PropTypes.func,
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
      accessToken,
      userId,
      playlist,
      nowPlayingPlaylistId,
      _loadPlaylistTracks,
      _togglePlayPlaylist,
    } = this.props;

    let tileOverlay = null;
    let imageClassNames = null;
    if (this.state.hovering) {
      imageClassNames = styles.transparentImage;
      tileOverlay = (
        <div className={styles.tileOverlay}>
          <div className={styles.tileTitle}>{playlist.name}</div>
          <div className={styles.tileButtons}>
            <Button
              icon={<MdPlaylistPlay size={32} style={{ paddingTop: '3px' }} />}
              handleButtonClick={() => _loadPlaylistTracks(accessToken, userId, playlist)}
            />
            <Button
              icon={nowPlayingPlaylistId !== playlist.id ? <MdPlayArrow size={32} /> : <MdStop size={32} />}
              handleButtonClick={() => _togglePlayPlaylist(accessToken, userId, playlist, nowPlayingPlaylistId)}
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
            src={playlist.images[0].url}
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
  nowPlayingPlaylistId: state.nowPlayingPlaylist.id,
});

const mapDispatchToProps = dispatch => ({
  _loadPlaylistTracks: (accessToken, userId, playlist) => { dispatch(loadPlaylistTracks(accessToken, userId, playlist)); },
  _togglePlayPlaylist: (accessToken, userId, playlist, nowPlayingPlaylistId) => { dispatch(togglePlayPlaylist(accessToken, userId, playlist, nowPlayingPlaylistId)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTile);
