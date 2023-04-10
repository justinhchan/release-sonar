import { getAlbum } from "@/api/albumApi";
import { Release } from "@/types";
import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

export default function useAlbum(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState<Release>();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchAlbum().catch((err) => {
        console.error(`An error occured when fetching album ${id}.`, err);
        showBoundary({ ...err, message: "Unable to load an album." });
      });
    }

    async function fetchAlbum() {
      const album = await getAlbum(id);
      setAlbum(album);
      setIsLoading(false);
    }
  }, [id, showBoundary]);

  return { isLoading, album };
}
