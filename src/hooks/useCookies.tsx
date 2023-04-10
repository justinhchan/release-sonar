import { useCallback } from "react";

const COOKIE_NAME = "ReleaseSonar";

export default function useCookies() {
  const setCookie = useCallback((accessToken: string, maxAge: string) => {
    document.cookie = `${COOKIE_NAME}=${accessToken}; Max-Age=${maxAge}`;
  }, []);

  const getCookie = useCallback(
    () => ({
      access_token: document.cookie.split(COOKIE_NAME + "=")[1] || "",
      expires_in: "",
    }),
    []
  );

  return { setCookie, getCookie };
}
