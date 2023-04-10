import ReleaseModal from "@/components/releases/modal";
import { Card, Image, Text, Button, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Album } from "tabler-icons-react";

interface Props {
  id: string;
  name: string;
  imageUrl?: string;
  releaseDate: string;
  artistNames: string[];
  type: string;
}

export default function Release({
  id,
  name,
  imageUrl,
  artistNames,
  releaseDate,
  type,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Card shadow="sm" padding="md" withBorder>
        <Card.Section mb={2}>
          <Image src={imageUrl} alt="Norway" height="100%" width="100%" />
        </Card.Section>
        <Text fw={700}>{name}</Text>
        <Text size="sm">{artistNames.join(", ")}</Text>
        <Text size="xs">{releaseDate}</Text>
        <Text size="xs" tt="capitalize">
          {type}
        </Text>
        <Card.Section>
          <Center>
            {" "}
            <Button
              m={4}
              size="xs"
              variant="subtle"
              compact
              fullWidth
              leftIcon={<Album size="1rem" />}
              onClick={open}
            >
              View release
            </Button>
          </Center>
        </Card.Section>
      </Card>
      <ReleaseModal id={id} isOpen={opened} onClose={close} />
    </>
  );
}
