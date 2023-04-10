import SpotifyWebApi from "spotify-web-api-js";

const ENDPOINT = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "6abf22ae9b974482aafcb22ee4884dc5";
const SCOPES = "user-follow-read user-read-private";

// Save the API as constant value to be used whenever once intialized
export const spotifyApi = new SpotifyWebApi();

// Create a url to start Spotify account authentication to use the app
export const createAuthUrl = () =>
  `${ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${window.location.href}&scope=${SCOPES}&response_type=token&show_dialog=true`;

// Get the country code for the user to be used as their market
export const getUserCountryCode = () => {
  return spotifyApi.getMe().then((response) => response.country);
};
