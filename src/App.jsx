import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Container from "./AppContainer.js";
import LoginButton from "./LoginButton";
import Box from "@material-ui/core/Box";
import { initializeSpotify } from "./services.js";
import { getTokenFromCookie, setTokenCookie } from "./utils";
import AlbumGrid from "./AlbumGrid.js";

const App = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const { access_token, expires_in } = {
      ...getTokenFromCookie(),
      ...queryString.parse(window.location.hash),
    };
    if (access_token) {
      const url = window.location.href.split("/")[0];
      window.history.replaceState({}, document.title, url);
      initializeSpotify(access_token);
      if (expires_in) {
        setTokenCookie(access_token, expires_in);
      }
      setInitialized(true);
    }
  }, []);

  return (
    <Container>
      <Box mx="auto">{initialized ? <AlbumGrid /> : <LoginButton />}</Box>
    </Container>
  );
};

export default App;
