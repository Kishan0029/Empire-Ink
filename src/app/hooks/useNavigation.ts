import { useState, useCallback } from "react";
import type { Page } from "../types";

export function useNavigation(defaultPage: Page = "landing") {
  const [page, setPage] = useState<Page>(defaultPage);
  const [selectedArtId, setSelectedArtId] = useState<number>(1);

  const handleSelectArt = useCallback((id: number) => {
    setSelectedArtId(id);
    setPage("viewer");
  }, []);

  return {
    page,
    setPage,
    selectedArtId,
    setSelectedArtId,
    handleSelectArt,
  };
}
