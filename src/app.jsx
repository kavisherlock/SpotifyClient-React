import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'normalize.css';

import ProfileHeader from './components/ProfileHeader';
import Player from './components/Player';
import Container from './components/Container';

import { loginUser } from './redux/actions';

import "styles/base/_main.sass"  // Global styles
import "styles/base/_common.sass"  // Global styles
import styles from "./app.sass"  // Css-module styles

const client_id = 'a7a7cf84fb924dfc9c4240e081d05ddc'; // Your client id
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
const stateKey = 'spotify_auth_state';
const scope = 'streaming user-read-private user-read-email user-modify-playback-state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const propTypes = {
  loggingIn: PropTypes.bool,
  loggedIn: PropTypes.bool,
  _loginUser: PropTypes.func,
};

class App extends React.Component {
  componentDidMount() {
    let hashParams = {};
	  let e = null, r = /([^&;=]+)=?([^&;]*)/g,
	    q = window.location.hash.substring(1);
    // eslint-disable-next-line
	  while ( e = r.exec(q)) {
	    hashParams[e[1]] = decodeURIComponent(e[2]);
	  }

	  if(!hashParams.access_token) {
      const state = generateRandomString(16);
  	  localStorage.setItem(stateKey, state);

      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);
      window.location.href = url;
    } else {
      this.props._loginUser(hashParams.access_token);
	  }
  }

  render() {
    const {
      loggingIn,
      loggedIn,
    } = this.props;

    if (loggingIn) {
      return <div>Logging in...</div>;
    }

    if (!loggedIn) {
      return <div />;
    }

    return (
      <div className={styles.app}>
        <ProfileHeader />
        <Container />
        <Player />
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = state => ({
  loggingIn: state.loggingIn,
  loggedIn: state.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  _loginUser: (accessToken) => { dispatch(loginUser(accessToken)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
