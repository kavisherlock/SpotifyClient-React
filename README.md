
## Spotify Client

A simple Spotify client using React.js. Used as a demo for my "When The Browser Reacts To You" introductory React talk in DevCon 2018 at Cerner Corporation.

Uses the Spotify API to get the logged-in user's playlists and displays them in a tiled format using the **PlaylistGrid** and **PlaylistTile** components.

The user can open a playlist which displays the tracks in that playlist using the **Tracklist** and the **TracklistItem**.

The User can play one of these tracks from here (note: the API oonly allows for 30 second samples). The user can also play the entire playlist directly from the grid. The **Player** component at the bottom allows the user to go to the next and previous song.

Uses Redux to manage the internal state.

### Future functionality:
* Searching for and playing tracks
* Adding and Removing tracks to/from a playlist
* Creating a new playlist
* React Router to directly go to a playlist
* Wicked animations

<hr>

Used the <a href="https://github.com/ReactJSResources/react-webpack-babel">Simple React Webpack Babel Starter Kit</a> to quickly set things up


### To run

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.
* Clone the project:

```
git clone https://github.com/kavisherlock/SpotifyClient-React
```

* Then install the dependencies:

```
npm install
```

* Run development server:

```
npm start
```

* Or you can run development server with [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard):

```
npm run dev
```

Open the web browser to `http://localhost:8888/`

### To build the production package

```
npm run build
```

### Running build locally

```
npm run serve:build
```
