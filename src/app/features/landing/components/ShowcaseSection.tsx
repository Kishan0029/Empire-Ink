import React from "react";
import { ArrowRight } from "lucide-react";
import { GoldDivider } from "../../../components/common/Ornaments";
import { EmeraldOutlineButton } from "../../../components/common/Buttons";
import { ArtworkCard } from "../../../components/common/ArtworkCard";
import type { Artwork } from "../../../api/types";
import type { Page } from "../../../types";

export interface ShowcaseSectionProps {
  artworks: Artwork[];
  setPage: (p: Page) => void;
  onSelectArt?: (id: number) => void;
}

export function ShowcaseSection({
  artworks,
  setPage,
  onSelectArt,
}: ShowcaseSectionProps) {
  const displayArtworks = artworks.slice(0, 4);

  return (
    <section className="py-12 bg-[#FAF7F2] dark:bg-[#121212] border-t border-[#C8A14B]/12">
      <div className="max-w-7xl mx-auto px-6">
        <GoldDivider className="mb-8" />
        <h2
          className="text-center text-[#222] dark:text-[#F5F0E8] mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2.4rem",
            fontWeight: 400,
          }}
        >
          From the Royal Court
        </h2>
        <p className="text-center text-[#6F6F6F] text-sm mb-8">
          AI-generated miniatures from our community
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {displayArtworks.map((art) => (
            <ArtworkCard
              key={art.id}
              art={art}
              variant="showcase"
              onSelect={(id) => (onSelectArt ? onSelectArt(id) : setPage("viewer"))}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <EmeraldOutlineButton onClick={() => setPage("gallery")}>
            Explore Full Gallery <ArrowRight size={14} />
          </EmeraldOutlineButton>
        </div>
      </div>
    </section>
  );
}

