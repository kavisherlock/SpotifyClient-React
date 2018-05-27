import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlaylistGrid from './PlaylistGrid';
// import SongList from './SongList';

import { loadPlaylists } from '../redux/actions';

import styles from "../app.sass"

const propTypes = {
  accessToken: PropTypes.string,
  _loadPlaylists: PropTypes.func,
};

class Container extends React.Component {
  componentDidMount() {
    this.props._loadPlaylists(this.props.accessToken);
  }

  render() {
    return (
      <div className={styles.musicContainer}>
        <PlaylistGrid />
      </div>
    );
  }
}

Container.propTypes = propTypes;

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch => ({
  _loadPlaylists: (accessToken) => { dispatch(loadPlaylists(accessToken)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
