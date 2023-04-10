import Artist from "@/components/followedArtists/Artist";
import { FollowedArtist } from "@/types";
import { Grid } from "@mantine/core";

interface Props {
  artists: FollowedArtist[];
}

export default function FollowedArtists({ artists }: Props) {
  return (
    <Grid>
      {artists.map(({ id, name, images, external_urls }) => {
        const imageUrl = images.at(0)?.url;
        const externalUrl = external_urls.spotify;
        return (
          <Grid.Col span="content" key={id}>
            <Artist imageUrl={imageUrl} name={name} externalUrl={externalUrl} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
