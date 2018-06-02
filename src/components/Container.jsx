import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';

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
    return (
      <div className={styles.musicContainer}>
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: '200' }}
          leave={{ animation: 'slideUp', duration: '200' }}
        >
          <VelocityTransitionGroup
            enter={{ animation: 'slideDown', duration: '500' }}
            leave={{ animation: 'slideUp', duration: '500' }}
          >
            {this.props.currentView === 'TRACKS' ? <Tracklist /> : null}
          </VelocityTransitionGroup>
          {this.props.currentView === 'PLAYLISTS' ? <PlaylistGrid /> : null}
        </VelocityTransitionGroup>
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
