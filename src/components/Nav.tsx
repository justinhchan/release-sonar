import useNav from "@/hooks/useNav";
import { ActiveNavLink } from "@/types";
import { Navbar, NavLink } from "@mantine/core";
import { Users, Rss } from "tabler-icons-react";

interface Props {
  hidden: boolean;
  onClick: () => void;
}

export default function Nav({ hidden, onClick }: Props) {
  const { active, setActive } = useNav();

  const handleOnClick = (value: ActiveNavLink) => {
    setActive(value);
    onClick();
  };

  return (
    <Navbar p="xs" hiddenBreakpoint="sm" hidden={hidden} width={{ sm: 190 }}>
      <Navbar.Section mt="xs">
        <NavLink
          active={active === "artists"}
          label={"Artists you follow"}
          icon={<Users size="1rem" />}
          onClick={() => {
            handleOnClick("artists");
          }}
        />
        <NavLink
          active={active === "releases"}
          label={"All releases"}
          icon={<Rss size="1rem" />}
          onClick={() => {
            handleOnClick("releases");
          }}
        />
      </Navbar.Section>
    </Navbar>
  );
}
