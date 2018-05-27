import React from 'react';
import 'normalize.css';

import Profile from './components/ProfileHeader';
import Player from './components/Player';
import Container from './components/Container';

import "styles/base/_main.sass"  // Global styles
import "styles/base/_common.sass"  // Global styles
import styles from "./app.sass"  // Css-module styles
import me from "./images/me5.jpg"

const App = () => (
  <div className={styles.app}>
    <Profile name={"Kavish"} imageUrl={me} />
    <Container />
    <Player />
  </div>
);

export default App;
