import React from "react";
import { Heart } from "lucide-react";
import { useArtworks } from "../../hooks/useArtworks";
import { ArtworkCard } from "../../components/common/ArtworkCard";
import { GalleryFilterBar } from "./components";
import type { Page } from "../../types";

export interface GalleryPageProps {
  setPage: (p: Page) => void;
  onSelectArt?: (id: number) => void;
}

export function GalleryPage({ setPage, onSelectArt }: GalleryPageProps) {
  const { artworks, filter, setFilter, liked, saved, toggleLike, toggleSave } =
    useArtworks();

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212]">
      <GalleryFilterBar
        filter={filter}
        setFilter={setFilter}
        setPage={setPage}
      />

      <div className="px-6 py-7">
        {artworks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <Heart size={36} className="text-[#C8A14B]/28 mb-4" />
            <p
              className="text-[#222] dark:text-[#F5F0E8] mb-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
              }}
            >
              No artworks yet
            </p>
            <p className="text-sm text-[#6F6F6F]">
              Like some artworks to see them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artworks.map((art) => (
              <ArtworkCard
                key={art.id}
                art={art}
                variant="gallery"
                isLiked={liked.has(art.id)}
                isSaved={saved.has(art.id)}
                onSelect={(id) =>
                  onSelectArt ? onSelectArt(id) : setPage("viewer")
                }
                onLike={toggleLike}
                onSave={toggleSave}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center py-14">
          <div className="flex items-center gap-3 text-sm text-[#6F6F6F]">
            <div className="w-4 h-4 rounded-full border-2 border-[#C8A14B]/30 border-t-[#C8A14B] animate-spin" />
            Loading more from the atelier&hellip;
          </div>
        </div>
      </div>
    </div>
  );
}
