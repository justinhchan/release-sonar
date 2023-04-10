import { getAllFollowedArtists } from "@/api/followedArtistsApi";
import { FollowedArtist } from "@/types";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

export default function useFollowedArtists() {
  const [isLoading, setIsLoading] = useState(false);
  const [followedArtists, setFollowedArtists] = useState<FollowedArtist[]>([]);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    setIsLoading(true);
    fetchArtists().catch((err) => {
      console.error("An error occured when fetching followed artists.", err);
      showBoundary({ ...err, message: "Unable to load followed artists." });
    });

    async function fetchArtists() {
      const artists = await getAllFollowedArtists();
      setFollowedArtists(artists);
      setIsLoading(false);
    }
  }, [showBoundary]);

  return { isLoading, followedArtists };
}
