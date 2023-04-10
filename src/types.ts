export type ActiveNavLink = "artists" | "releases" | undefined;
export type FollowedArtist = SpotifyApi.ArtistObjectFull;

export interface Release extends SpotifyApi.AlbumObjectFull {
  tracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>;
  total_tracks: number;
}
