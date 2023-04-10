import { NavContext } from "@/context/NavContext";
import { useContext } from "react";

export default function useNav() {
  const context = useContext(NavContext);

  return context;
}
