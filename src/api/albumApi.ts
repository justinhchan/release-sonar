import { spotifyApi, getUserCountryCode } from "@/api/spotifyApi";
import { Release } from "@/types";
import { getOffsetFromUrl } from "@/utils";

// Get the tracks for an album
const getAlbumTracks = async ({
  id,
  offset,
  market,
}: {
  id: string;
  offset: number;
  market: string;
}) =>
  await spotifyApi.getAlbumTracks(id, {
    offset,
    market,
  });

// Get a fully populated album
export const getAlbum = async (id: string): Promise<Release> => {
  const market = await getUserCountryCode();
  const album = await spotifyApi.getAlbum(id, { market });

  // Get the rest of the music tracks for the album if there are still some left
  let nextTracksUrl = album.tracks.next;

  while (!!nextTracksUrl) {
    // Use offset from the next url because album.tracks.offset is the current offset instead of next
    const offset = getOffsetFromUrl(nextTracksUrl);

    // Get then next set of tracks
    const moreTracks = await getAlbumTracks({
      id,
      offset,
      market,
    });

    // Update next tracks url - `next` will be null if there are no more tracks
    nextTracksUrl = moreTracks.next;

    // Append the track items and update the paging fields
    album.tracks = {
      ...album.tracks,
      previous: moreTracks.previous,
      next: nextTracksUrl,
      items: [...album.tracks.items, ...moreTracks.items],
    };
  }

  return album as Release;
};
