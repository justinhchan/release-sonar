import { ActiveNavLink } from "@/types";
import { createContext, useState, useCallback } from "react";

interface NavContextProps {
  active: ActiveNavLink;
  setActive: (value: ActiveNavLink) => void;
}

export const NavContext = createContext<NavContextProps>({
  active: undefined,
  setActive: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function NavContextProvider({ children }: Props) {
  const [active, setActive] = useState<ActiveNavLink>();

  const handleSetActive = useCallback((value: ActiveNavLink) => {
    setActive(value);
  }, []);

  return (
    <NavContext.Provider
      value={{
        active,
        setActive: handleSetActive,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}
