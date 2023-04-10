import { Text, Paper, Avatar, Button } from "@mantine/core";
import { BrandSpotify, ExternalLink } from "tabler-icons-react";

interface Props {
  imageUrl?: string;
  name: string;
  externalUrl: string;
}

export default function Artist({ imageUrl, name, externalUrl }: Props) {
  return (
    <Paper shadow="sm" p="sm">
      <Avatar src={imageUrl} alt={`Photo of ${name}`} size="xl" />
      <Text>{name}</Text>
      <Button
        leftIcon={<ExternalLink size="1rem" />}
        rightIcon={<BrandSpotify size="1rem" />}
        size="xs"
        component="a"
        target="_blank"
        rel="noreferrer"
        href={externalUrl}
        variant="subtle"
      >
        View artist on Spotify
      </Button>
    </Paper>
  );
}
