import React from 'react';
import PropTypes from 'prop-types';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import { connect } from 'react-redux';

import { togglePlayTrack } from '../redux/actions';

import styles from "../app.sass";

const propTypes = {
  index: PropTypes.number,
  track: PropTypes.object,
  nowPlayingTrackId: PropTypes.string,
  _togglePlayTrack: PropTypes.func,
};

class TracklistItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    }
  }

  render() {
    const {
      index,
      track,
      nowPlayingTrackId,
      _togglePlayTrack,
    } = this.props;

    let leftIndex = nowPlayingTrackId === track.id ? <MdStop size={24} /> : index;
    if (this.state.hovering) {
      leftIndex = (
        <div
          className={styles.playButton}
          onClick={() => _togglePlayTrack(index)}
        >
          {
            nowPlayingTrackId === track.id ?
            <MdStop size={24} /> :
            <MdPlayArrow size={24} />
          }
        </div>
      );
    }

    let artists = track.artists[0].name;
    for (let j = 1; j < track.artists.length; j++) {
      artists = `${artists}, ${track.artists[j].name}`
    }

    return(
      <div
        className={styles.tracklistItem}
        style={nowPlayingTrackId === track.id ? { backgroundColor: '#eee6e6' } : null}
        onMouseOver={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
        onDoubleClick={() => _togglePlayTrack(index)}
      >
        <div style={{ width: 20, height: 20 }}>
          {leftIndex}
        </div>
        <div className={styles.trackInfo}>
          <div style={{ width: '35%' }}>{track.name}</div>
          <div style={{ width: '35%' }}>{artists}</div>
          <div style={{ width: '30%' }}>{track.album.name}</div>
        </div>
      </div>
    );
  }
}

TracklistItem.propTypes = propTypes;

const mapStateToProps = state => ({
  nowPlayingTrackId: state.nowPlayingTrack.id
});

const mapDispatchToProps = dispatch => ({
  _togglePlayTrack: (index) => { dispatch(togglePlayTrack(index - 1)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(TracklistItem);
