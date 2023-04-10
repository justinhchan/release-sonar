import { Release } from "@/types";
import { getFormattedDate } from "@/utils";
import { Flex, Image, Stack, Text, Button, Table } from "@mantine/core";
import { BrandSpotify, ExternalLink, Users } from "tabler-icons-react";

export default function Content(album: Release) {
  const {
    name,
    images,
    release_date,
    total_tracks,
    tracks,
    album_type,
    external_urls: { spotify: externalUrl },
    artists,
  } = album;
  const imageUrl = images.at(0)?.url;
  const formattedReleaseDate = getFormattedDate(release_date);
  const artistNames = artists.map(({ name }) => name).join(", ");

  return (
    <>
      <Flex align="center">
        <Image src={imageUrl} alt={name} width={250} mr="md" />
        <Stack>
          <Text fz="xl" fw={700}>
            {name}
          </Text>
          <Flex align="center" gap="xs">
            <Users size="1rem" />
            <Text fz="md">{artistNames}</Text>
          </Flex>
          <Text fz="sm">{formattedReleaseDate}</Text>
          <Text fz="sm">{`${total_tracks} tracks`}</Text>
          <Text fz="sm" tt="capitalize">
            {album_type}
          </Text>
          <Button
            leftIcon={<ExternalLink size="1rem" />}
            rightIcon={<BrandSpotify size="1rem" />}
            size="xs"
            component="a"
            target="_blank"
            rel="noreferrer"
            href={externalUrl}
            variant="light"
          >
            View this on Spotify
          </Button>
        </Stack>
      </Flex>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Track no.</th>
            <th>Track name</th>
          </tr>
        </thead>
        <tbody>
          {tracks.items.map(({ id, track_number, name: trackName }) => {
            return (
              <tr key={id}>
                <td>{track_number}</td>
                <td>{trackName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
