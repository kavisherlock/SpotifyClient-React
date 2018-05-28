import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlaylistGrid from './PlaylistGrid';
import Tracklist from './Tracklist';

import { loadPlaylists } from '../redux/actions';

import styles from "../app.sass"

const propTypes = {
  accessToken: PropTypes.string,
  currentView: PropTypes.string,
  _loadPlaylists: PropTypes.func,
};

class Container extends React.Component {
  componentDidMount() {
    this.props._loadPlaylists(this.props.accessToken);
  }

  render() {
    let viewer = null;
    if (this.props.currentView === 'PLAYLISTS') {
      viewer = <PlaylistGrid />;
    } else if (this.props.currentView === 'TRACKS') {
      viewer = <Tracklist />;
    }

    return (
      <div className={styles.musicContainer}>
        {viewer}
      </div>
    );
  }
}

Container.propTypes = propTypes;

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  currentView: state.currentView,
});

const mapDispatchToProps = dispatch => ({
  _loadPlaylists: (accessToken) => { dispatch(loadPlaylists(accessToken)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
