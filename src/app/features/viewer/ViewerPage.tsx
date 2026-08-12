import React, { useState } from "react";
import { useArtworks } from "../../hooks/useArtworks";
import { MOCK_ARTWORKS } from "../../api/mock/mockData";
import {
  ViewerHeader,
  ViewerCanvas,
  ViewerSidebar,
} from "./components";
import type { Page } from "../../types";

export interface ViewerPageProps {
  selectedArtId?: number;
  setPage: (p: Page) => void;
  onSelectArt?: (id: number) => void;
}

export function ViewerPage({
  selectedArtId,
  setPage,
  onSelectArt,
}: ViewerPageProps) {
  const { artworks } = useArtworks();
  const [zoom, setZoom] = useState(1);

  const list = artworks.length > 0 ? artworks : MOCK_ARTWORKS;
  const art = list.find((a) => a.id === selectedArtId) || list[0];
  const idx = list.findIndex((a) => a.id === art.id);
  const prevId = list[(idx - 1 + list.length) % list.length].id;
  const nextId = list[(idx + 1) % list.length].id;

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] flex flex-col">
      <ViewerHeader
        title={art.title}
        prevId={prevId}
        nextId={nextId}
        setPage={setPage}
        onSelectArt={onSelectArt}
      />
      <div className="flex-1 grid lg:grid-cols-[1fr_320px]">
        <ViewerCanvas asset={art.asset} title={art.title} zoom={zoom} />
        <ViewerSidebar art={art} zoom={zoom} setZoom={setZoom} />
      </div>
    </div>
  );
}
