import FollowedArtists from "@/components/followedArtists";
import Releases from "@/components/releases";
import useFollowedArtists from "@/hooks/useFollowedArtists";
import useNav from "@/hooks/useNav";
import { Loader, Text } from "@mantine/core";
import { useEffect } from "react";

const EMPTY_TEXT =
  "You don't follow any artists. You won't be able to see any releases.";

export default function FeatureContainer() {
  const { isLoading, followedArtists } = useFollowedArtists();
  const { active, setActive } = useNav();

  useEffect(() => {
    setActive("artists");
  }, [setActive]);

  if (isLoading) {
    return <Loader />;
  }
  if (!followedArtists.length) {
    return <Text>{EMPTY_TEXT}</Text>;
  }

  return (
    <>
      {active === "artists" && <FollowedArtists artists={followedArtists} />}
      {active === "releases" && <Releases artists={followedArtists} />}
    </>
  );
}
