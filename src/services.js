/**
 * Service calls to get data from the Spotify Web API
 */
import SpotifyWebApi from "spotify-web-api-js";
import queryString from "query-string";
import { ALBUM_GROUP_TYPES } from "./utils";

const spotify = new SpotifyWebApi();

/**
 * Initialize the Spotify Web API with the access token
 * @param {string} accessToken
 */
export const initializeSpotify = (accessToken) =>
  spotify.setAccessToken(accessToken);

/**
 * Get all of the user's followed artists
 */
const getAllFollowedArtists = (artists, resolve, after) => {
  const queryParams = { limit: 50 };
  if (!!after) {
    queryParams.after = after;
  }
  spotify.getFollowedArtists(queryParams).then((response) => {
    const retrievedArtists = artists.concat(response.artists.items);
    const cursor = response?.artists?.cursors?.after;
    if (cursor) {
      getAllFollowedArtists(retrievedArtists, resolve, cursor);
    } else {
      resolve(retrievedArtists.map((artist) => artist.id));
    }
  });
};

/**
 * Get an artist's most recent albums
 */
const getArtistAlbums = ({ artistId, country }) =>
  spotify
    .getArtistAlbums(artistId, {
      includeGroups: ALBUM_GROUP_TYPES.join(),
      limit: 10,
      country,
    })
    .then((response) => response.items);

/**
 * Get the user's country code
 */
const getUserCountryCode = () =>
  spotify.getMe().then((response) => response.country);

/**
 * Get the Albums from all of the user's followed artists
 */
export const getAlbumsFromFollowedArtists = async () => {
  const country = await getUserCountryCode();
  const artistIds = await new Promise((resolve) => {
    getAllFollowedArtists([], resolve);
  });
  let allAlbums = [];
  for (const artistId of artistIds) {
    const albumsFromArtist = await getArtistAlbums({
      artistId,
      country,
    });
    allAlbums = allAlbums.concat(albumsFromArtist);
  }
  return Promise.resolve(allAlbums);
};

/**
 * Get tracks for an album
 */
const getAlbumTracks = async ({ albumId, offset, limit, market }) => {
  return spotify
    .getAlbumTracks(albumId, {
      offset,
      limit,
      market,
    })
    .then((response) => Promise.resolve(response))
    .catch((err) => {
      console.error(`Failed getting album tracks. `, err);
      return Promise.resolve([]);
    });
};

/**
 * Get info about a specific album given it's ID
 */
export const getAlbumInfo = async (albumId) => {
  const country = await getUserCountryCode();
  const album = await spotify
    .getAlbum(albumId, { market: country })
    .then((response) => Promise.resolve(response))
    .catch((err) => Promise.reject(err));

  let moreTracksUrl = album?.tracks?.next;
  // Get rest of the tracks while there are still some left
  while (!!moreTracksUrl) {
    // Get query params from the URL
    const { offset, limit, market } = queryString.parseUrl(moreTracksUrl).query;

    // Get rest of the tracks
    const restOfTracks = await getAlbumTracks({
      albumId,
      offset,
      limit,
      market,
    });
    // Update the next tracks URL
    moreTracksUrl = restOfTracks.next;

    // Update fields in the main album object
    album.tracks = {
      ...album.tracks,
      preivous: restOfTracks.previous,
      next: moreTracksUrl,
      items: album.tracks.items.concat(restOfTracks.items),
    };
  }

  return album;
};
