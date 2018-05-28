import React from 'react';
import PropTypes from 'prop-types';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import { connect } from 'react-redux';

import { playTrack } from '../redux/actions';

import styles from "../app.sass";

const propTypes = {
  accessToken: PropTypes.string,
  trackId: PropTypes.string,
  index: PropTypes.number,
  trackName: PropTypes.string,
  albumName: PropTypes.string,
  artistName: PropTypes.string,
  previewUrl: PropTypes.string,
  _playTrack: PropTypes.func,
};

class TracklistItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    }

    this.playTrack = this.playTrack.bind(this);
  }

  playTrack() {
    const {
      index,
      accessToken,
      trackId,
      previewUrl,
      _playTrack,
    } = this.props;

    const audio = new Audio(previewUrl);
    audio.play();
    _playTrack(accessToken, index, trackId, previewUrl);
  }

  render() {
    const {
      index,
      trackName,
      artistName,
      albumName,
    } = this.props;

    let leftIndex = index;
    if (this.state.hovering) {
      leftIndex = (
        <div className={styles.playButton} onClick={this.playTrack}>
          <MdPlayArrow size={24} />
        </div>
      );
    }

    return(
      <div
        className={styles.tracklistItem}
        onMouseOver={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
        onDoubleClick={this.playTrack}
      >
        <div style={{ width: 20, height: 20 }}>
          {leftIndex}
        </div>
        <div className={styles.trackInfo}>
          <div style={{ width: '35%' }}>{trackName}</div>
          <div style={{ width: '35%' }}>{artistName}</div>
          <div style={{ width: '30%' }}>{albumName}</div>
        </div>
      </div>
    );
  }
}

TracklistItem.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
  _playTrack: (accessToken, index, trackId, previewUrl) => { dispatch(playTrack(accessToken, index, trackId, previewUrl)) }
});

export default connect(null, mapDispatchToProps)(TracklistItem);
