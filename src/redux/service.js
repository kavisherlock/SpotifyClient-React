const ServiceFactory = () => (
  {
    loginUser: accessToken => (
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
      }).then(response => response.json())
    ),

    fetchPlaylists: accessToken => (
      fetch('https://api.spotify.com/v1/me/playlists?limit=30', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
      }).then(response => response.json())
    ),

    fetchPlaylistTracks: (accessToken, userId, playlistId) => (
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
      }).then(response => response.json())
    ),
  }
);

export default ServiceFactory();
