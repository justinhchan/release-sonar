import { spotifyApi } from "@/api/spotifyApi";
import { FollowedArtist } from "@/types";

// Get artists followed by the user
const getFollowedArtists = async (after?: string) => {
  const { artists } = await spotifyApi.getFollowedArtists({
    limit: 50,
    ...(after ? { after: after } : {}),
  });

  return artists;
};

// Get all artists followed by the user
export const getAllFollowedArtists = async () => {
  // Get the initial list of artists
  const { cursors, items } = await getFollowedArtists();
  let allArtists: FollowedArtist[] = [...items];

  // Get the rest of the artists - `after` will be null if there are no more artists to fetch
  let after = cursors.after;
  while (after) {
    const moreArtists = await getFollowedArtists(after);
    // Update whether we need to keep fetching after this
    after = moreArtists.cursors.after;

    // Append artists to the full list
    allArtists = [...allArtists, ...moreArtists.items];
  }

  return allArtists;
};
