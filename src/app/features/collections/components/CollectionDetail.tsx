import React from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { ArtworkCard } from "../../../components/common/ArtworkCard";
import type { Collection } from "../../../api/types";
import type { Page } from "../../../types";

export interface CollectionDetailProps {
  col: Collection;
  onBack: () => void;
  setPage: (p: Page) => void;
  onSelectArt: (id: number) => void;
}

export function CollectionDetail({
  col,
  onBack,
  setPage,
  onSelectArt,
}: CollectionDetailProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-sm text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:border-[#C8A14B]/40 transition-all"
          >
            <ChevronLeft size={16} /> Back to Collections
          </button>
          <div>
            <span className="text-[11px] font-semibold text-[#C8A14B] tracking-wider uppercase">
              {col.era} Era
            </span>
            <h1
              className="text-[#222] dark:text-[#F5F0E8]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                fontWeight: 400,
              }}
            >
              {col.title}
            </h1>
          </div>
        </div>
        <button
          onClick={() => setPage("studio")}
          className="px-6 py-2.5 rounded-full bg-[#C8A14B] text-white text-sm font-medium shadow-[0_4px_18px_rgba(200,161,75,0.35)] hover:bg-[#d4af56] transition-all flex items-center gap-2"
        >
          <Plus size={14} /> Add to Collection
        </button>
      </div>

      <p className="text-sm text-[#6F6F6F] max-w-2xl mb-8 leading-relaxed">
        {col.description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {col.artworks.map((art) => (
          <ArtworkCard
            key={art.id}
            art={art}
            variant="compact"
            onSelect={onSelectArt}
          />
        ))}
      </div>
    </div>
  );
}
