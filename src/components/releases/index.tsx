import Release from "@/components/releases/Release";
import ReleaseSkeleton from "@/components/releases/ReleaseSkeleton";
import useReleases from "@/hooks/useReleases";
import { FollowedArtist } from "@/types";
import { getFormattedDate } from "@/utils";
import { Grid, Text, Button } from "@mantine/core";
import { useMemo } from "react";

const GRID_COL_PROPS = {
  xs: 6,
  sm: 4,
  md: 3,
  lg: 2,
} as const;

interface Props {
  artists: FollowedArtist[];
}

export default function Releases({ artists }: Props) {
  const artistIds = useMemo(() => {
    return artists.map((a) => a.id);
  }, [artists]);

  const { isLoading, releases, groupSize, showMore, totalCount } =
    useReleases(artistIds);

  const shouldShowMoreReleasesButton = totalCount !== releases.length;

  return (
    <>
      <Grid gutter="md">
        {isLoading ? (
          <>
            {[...Array(groupSize)].map((_, index) => {
              return (
                <Grid.Col {...GRID_COL_PROPS} key={index}>
                  <ReleaseSkeleton />
                </Grid.Col>
              );
            })}
          </>
        ) : (
          <>
            {releases.length > 0 ? (
              <>
                {releases.map(
                  ({ id, name, images, release_date, artists, album_type }) => {
                    const imageUrl = images.at(0)?.url;
                    const formattedReleaseDate = getFormattedDate(release_date);
                    const artistNames = artists.map(({ name }) => name);
                    return (
                      <Grid.Col {...GRID_COL_PROPS} key={id}>
                        <Release
                          id={id}
                          name={name}
                          imageUrl={imageUrl}
                          releaseDate={formattedReleaseDate}
                          artistNames={artistNames}
                          type={album_type}
                        />
                      </Grid.Col>
                    );
                  }
                )}
              </>
            ) : (
              <Text>There are no releases from the artists you follow.</Text>
            )}
          </>
        )}
      </Grid>
      {shouldShowMoreReleasesButton && (
        <Button
          variant="light"
          fullWidth
          onClick={() => {
            showMore();
          }}
          mt="lg"
        >
          Show more releases
        </Button>
      )}
    </>
  );
}
