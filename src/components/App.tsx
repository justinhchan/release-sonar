import FeatureContainer from "@/components/FeatureContainer";
import LoginButton from "@/components/LoginButton";
import Shell from "@/components/Shell";
import { NavContextProvider } from "@/context/NavContext";
import useCookies from "@/hooks/useCookies";
import useSpotifyApi from "@/hooks/useSpotifyApi";
import { Container, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import queryString from "query-string";
import ErrorFallback from "@/components/ErrorFallback";

export default function App() {
  const [initialized, setInitialized] = useState(false);
  const { getCookie, setCookie } = useCookies();
  const { initialize } = useSpotifyApi();

  useEffect(() => {
    const { access_token, expires_in } = {
      ...getCookie(),
      ...queryString.parse(window.location.hash),
    };
    if (access_token) {
      const url = window.location.href.split("/")[0];
      window.history.replaceState({}, document.title, url);
      initialize(access_token);
      if (expires_in) {
        setCookie(access_token, expires_in);
      }
      setInitialized(true);
    }
  }, [getCookie, setCookie, initialize]);

  return (
    <NavContextProvider>
      <Shell>
        <Container size="xl">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {initialized ? (
              <FeatureContainer />
            ) : (
              <>
                <Text fz="sm" mb="lg">
                  See recently released singles and albums by the artists you
                  follow.
                </Text>
                <LoginButton />
              </>
            )}
          </ErrorBoundary>
        </Container>
      </Shell>
    </NavContextProvider>
  );
}
