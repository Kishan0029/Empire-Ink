import React from "react";
import { ChevronRight } from "lucide-react";
import { ArtworkCard } from "../../../components/common/ArtworkCard";
import type { Artwork } from "../../../api/types";
import type { Page } from "../../../types";

export interface DashboardRecentProps {
  artworks: Artwork[];
  setPage: (p: Page) => void;
  onSelectArt?: (id: number) => void;
}

export function DashboardRecent({
  artworks,
  setPage,
  onSelectArt,
}: DashboardRecentProps) {
  const displayArtworks = artworks.slice(0, 4);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-[#222] dark:text-[#F5F0E8]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.35rem",
          }}
        >
          Recent Creations
        </h2>
        <button
          onClick={() => setPage("gallery")}
          className="text-[11px] text-[#C8A14B] hover:underline flex items-center gap-1"
        >
          View all <ChevronRight size={11} />
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {displayArtworks.map((art) => (
          <ArtworkCard
            key={art.id}
            art={art}
            variant="compact"
            onSelect={(id) => (onSelectArt ? onSelectArt(id) : setPage("viewer"))}
          />
        ))}
      </div>
    </div>
  );
}
