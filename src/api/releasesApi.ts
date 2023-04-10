import { spotifyApi, getUserCountryCode } from "@/api/spotifyApi";
import { Release } from "@/types";
import { getOffsetFromUrl } from "@/utils";

// Get albums and singles from an artist
const getAlbumsFromArtist = async ({
  artistId,
  market,
  offset,
}: {
  artistId: string;
  market: string;
  offset?: number;
}) =>
  await spotifyApi.getArtistAlbums(artistId, {
    include_groups: "album,single",
    limit: 50,
    market,
    ...(offset ? { offset: offset } : {}),
  });

// Get all releases from a list of artist ids
export const getAllReleasesFromArtists = async (artistIds: string[]) => {
  let releases: Release[] = [];
  const market = await getUserCountryCode();

  // Get releases for each artist id (.forEach() is not designed for async)
  for (const artistId of artistIds) {
    const { items, next } = await getAlbumsFromArtist({
      artistId,
      market,
    });
    // Append initial albums to the full list of releases
    releases = [...releases, ...(items as Release[])];

    // Get the rest of the albums for the artist if there are still some left
    let nextAlbumsUrl = next;
    while (!!nextAlbumsUrl) {
      // Use offset from the next url because albums.offset is the current offset instead of next
      const offset = getOffsetFromUrl(nextAlbumsUrl);

      // Get the next list of albums
      const moreAlbums = await getAlbumsFromArtist({
        artistId,
        market,
        offset,
      });

      // Update next albums url - `next` will be null if there are no more albums
      nextAlbumsUrl = moreAlbums.next;

      // Append albums to the full list of releases
      releases = [...releases, ...(moreAlbums.items as Release[])];
    }
  }
  return releases;
};
