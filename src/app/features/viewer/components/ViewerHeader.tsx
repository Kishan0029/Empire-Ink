import React from "react";
import { ChevronLeft, Heart, Share2, Download } from "lucide-react";
import { GoldButton } from "../../../components/common/Buttons";
import type { Page } from "../../../types";

export interface ViewerHeaderProps {
  title: string;
  prevId: number;
  nextId: number;
  setPage: (p: Page) => void;
  onSelectArt?: (id: number) => void;
}

export function ViewerHeader({
  title,
  prevId,
  nextId,
  setPage,
  onSelectArt,
}: ViewerHeaderProps) {
  return (
    <div className="sticky top-16 z-20 bg-[#FFFDF8]/88 dark:bg-[#0E0E0C]/88 backdrop-blur-xl border-b border-[#C8A14B]/12 px-6 py-3 flex items-center gap-4">
      <button
        onClick={() => setPage("gallery")}
        className="flex items-center gap-1.5 text-sm text-[#6F6F6F] hover:text-[#222] dark:hover:text-white transition-colors"
      >
        <ChevronLeft size={15} /> Gallery
      </button>
      <div className="flex items-center gap-1.5 ml-2">
        <button
          onClick={() => onSelectArt?.(prevId)}
          className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs text-[#6F6F6F] hover:text-[#222] dark:hover:text-white transition-all"
        >
          &larr; Prev
        </button>
        <button
          onClick={() => onSelectArt?.(nextId)}
          className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs text-[#6F6F6F] hover:text-[#222] dark:hover:text-white transition-all"
        >
          Next &rarr;
        </button>
      </div>
      <div className="flex-1 text-center">
        <h2
          className="text-[#222] dark:text-[#F5F0E8]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
          }}
        >
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#6F6F6F] hover:text-[#6A2332] hover:bg-[#6A2332]/8 transition-all">
          <Heart size={15} />
        </button>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#6F6F6F] hover:text-[#C8A14B] hover:bg-[#C8A14B]/8 transition-all">
          <Share2 size={15} />
        </button>
        <GoldButton size="sm">
          <Download size={12} /> Download 4K
        </GoldButton>
      </div>
    </div>
  );
}
