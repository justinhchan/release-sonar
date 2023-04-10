import { spotifyApi, createAuthUrl } from "@/api/spotifyApi";
import { useState, useEffect, useCallback } from "react";

export default function useSpotifyApi() {
  const [authUrl, setAuthURI] = useState<string>();

  useEffect(() => {
    setAuthURI(createAuthUrl());
  }, []);

  const initialize = useCallback(
    (accessToken: string) => spotifyApi.setAccessToken(accessToken),
    []
  );

  return {
    authUrl,
    initialize,
  };
}
