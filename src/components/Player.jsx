import React from 'react';
import PropTypes from 'prop-types';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import MdFastRewind from 'react-icons/lib/md/fast-rewind';
import MdFastForward from 'react-icons/lib/md/fast-forward';
import { connect } from 'react-redux';

import Button from './Button';
import styles from "../app.sass";
import { togglePlayTrack } from '../redux/actions';

const propTypes = {
  prop: PropTypes.object,
  lastPlayingTrack: PropTypes.object,
  nowPlayingTrack: PropTypes.object,
  nowPlayingTrackIndex: PropTypes.number,
  _togglePlayTrack: PropTypes.func,
};


const Player = (props) => {
  const {
    nowPlayingTrack,
    nowPlayingTrackIndex,
    lastPlayingTrack,
    _togglePlayTrack,
  } = props;

  if (nowPlayingTrack.id.length === 0 && (!lastPlayingTrack || lastPlayingTrack.id.length === 0)) {
    return <div className={styles.player} />
  }

  let track = nowPlayingTrack;
  if (nowPlayingTrack.id.length === 0) {
    track = lastPlayingTrack;
  }

  let artists = track.artists[0].name;
  for (let j = 1; j < track.artists.length; j++) {
    artists = `${artists}, ${track.artists[j].name}`
  }

  return(
    <div className={styles.player}>
      <div className={styles.trackInfo}>
        <img
          src={track.album.images[0].url}
          alt="playlist-pic"
          width={100}
        />
        <div>
          <div>{track.name}</div>
          <div>{artists}</div>
          <div>{track.album.name}</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.circleButtons}
          icon={<MdFastRewind size={32} />}
          handleButtonClick={() => _togglePlayTrack(nowPlayingTrackIndex - 1, null)}
        />
        <Button
          className={styles.circleButtons}
          icon={nowPlayingTrack.id.length === 0 ? <MdPlayArrow size={32} /> : <MdStop size={32} />}
          handleButtonClick={() => _togglePlayTrack(null, track)}
        />
        <Button
          className={styles.circleButtons}
          icon={<MdFastForward size={32} />}
          handleButtonClick={() => _togglePlayTrack(nowPlayingTrackIndex + 1, null)}
        />
      </div>
    </div>
  );
};

Player.propTypes = propTypes;

const mapStateToProps = state => ({
  nowPlayingTrack: state.nowPlayingTrack,
  nowPlayingTrackIndex: state.nowPlayingTrackIndex,
  lastPlayingTrack: state.lastPlayingTrack,
});

const mapDispatchToProps = dispatch => ({
  _togglePlayTrack: (trackIndex, track) => { dispatch(togglePlayTrack(trackIndex, track)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
