import { getAllReleasesFromArtists } from "@/api/releasesApi";
import { Release } from "@/types";
import { useEffect, useState, useCallback } from "react";
import { useErrorBoundary } from "react-error-boundary";

const GROUP_SIZE = 20;

export default function useReleases(artistIds: string[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);
  const [nextIndex, setNextIndex] = useState(GROUP_SIZE);
  const { showBoundary } = useErrorBoundary();

  const showMore = useCallback(() => {
    setNextIndex((prevIndex) => prevIndex + GROUP_SIZE);
  }, []);

  useEffect(() => {
    if (artistIds.length > 0) {
      setIsLoading(true);
      fetchReleases().catch((err) => {
        console.error(
          "An error occured when fetching releases from followed artists.",
          err
        );
        showBoundary({ ...err, message: "Unable to load the releases." });
      });
    }

    async function fetchReleases() {
      const unfilteredReleases = await getAllReleasesFromArtists(artistIds);
      const filteredReleases = removeDuplicateReleases(unfilteredReleases);
      setReleases(sortReleasesByReleaseDate(filteredReleases));
      setIsLoading(false);
    }
  }, [artistIds, showBoundary]);

  const releasesToShow = releases.slice(0, nextIndex);

  return {
    isLoading,
    releases: releasesToShow,
    showMore,
    groupSize: GROUP_SIZE,
    totalCount: releases.length,
  };
}

function sortReleasesByReleaseDate(releases: Release[]) {
  return releases.sort((release1, release2) => {
    if (release1.release_date > release2.release_date) {
      return -1;
    } else if (release1.release_date < release2.release_date) {
      return 1;
    } else {
      return release1.name.toUpperCase() > release2.name.toUpperCase() ? 1 : -1;
    }
  });
}

function removeDuplicateReleases(releases: Release[]) {
  return releases.filter(
    (release, index, self) =>
      self.findIndex(
        (other) =>
          other.id === release.id ||
          (other.release_date === release.release_date &&
            other.name === release.name)
      ) === index
  );
}
