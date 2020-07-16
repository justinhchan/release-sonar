// Authorization
const endpoint = "https://accounts.spotify.com/authorize";
const clientId = "6abf22ae9b974482aafcb22ee4884dc5";
const redirectUri = window.location.href;
const scopes = ["user-follow-read", "user-read-private"];
const authorizationURI = `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const AUTHORIZATION = {
  URI: authorizationURI,
};

// Album Types
export const ALBUM_GROUP_TYPES = ["album", "single"];

// Date Formatting
export const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dateTimeFormat.format(date);
};

// Sorting Albums
const compareAlbumReleaseDates = (album1, album2) => {
  if (album1.release_date > album2.release_date) {
    return -1;
  } else if (album1.release_date < album2.release_date) {
    return 1;
  } else {
    return album1.name.toUpperCase() > album2.name.toUpperCase();
  }
};

export const sortAlbumsByReleaseDate = ({ albums }) =>
  albums.sort(compareAlbumReleaseDates);

export const removeDuplicateAlbums = ({ albums }) =>
  albums.filter(
    (album, index, self) =>
      self.findIndex(
        (a) => a.release_date === album.release_date && a.name === album.name
      ) === index
  );

// Cookies
const COOKIE_NAME = "ReleaseSonar";
export const setTokenCookie = (token, seconds) => {
  document.cookie = COOKIE_NAME + "=" + token + "; Max-Age=" + seconds;
};

export const getTokenFromCookie = () => {
  return {
    access_token: document.cookie.split(COOKIE_NAME + "=")[1],
  };
};
