import useSpotifyApi from "@/hooks/useSpotifyApi";
import { Button } from "@mantine/core";
import { Login } from "tabler-icons-react";

export default function LoginButton() {
  const { authUrl } = useSpotifyApi();

  return (
    <Button
      leftIcon={<Login />}
      component="a"
      disabled={authUrl === undefined}
      href={authUrl}
      variant="light"
    >
      Login to Spotify
    </Button>
  );
}
