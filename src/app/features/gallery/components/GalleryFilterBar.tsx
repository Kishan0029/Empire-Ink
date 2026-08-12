import React from "react";
import { Sparkles } from "lucide-react";
import { GoldButton } from "../../../components/common/Buttons";
import { cn } from "../../../utils/cn";
import type { Page } from "../../../types";

export interface GalleryFilterBarProps {
  filter: string;
  setFilter: (f: string) => void;
  setPage: (p: Page) => void;
}

export function GalleryFilterBar({
  filter,
  setFilter,
  setPage,
}: GalleryFilterBarProps) {
  const filters = [
    "All",
    "Akbar",
    "Jahangir",
    "Shah Jahan",
    "Aurangzeb",
    "Favorites",
  ];

  return (
    <div className="sticky top-16 z-30 bg-[#FAF7F2]/88 dark:bg-[#121212]/88 backdrop-blur-xl border-b border-[#C8A14B]/12 px-6 py-3 flex items-center justify-between gap-4">
      <div
        className="flex items-center gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-semibold border transition-all",
              filter === f
                ? "bg-[#C8A14B] text-white border-[#C8A14B] shadow-[0_2px_10px_rgba(200,161,75,0.32)]"
                : "border-black/10 dark:border-white/10 text-[#6F6F6F] hover:border-[#C8A14B]/35 hover:text-[#222] dark:hover:text-white"
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <GoldButton
          onClick={() => setPage("studio")}
          size="sm"
          className="flex items-center gap-1.5 px-4 shadow-[0_4px_16px_rgba(200,161,75,0.35)] hover:scale-[1.02] transition-all"
        >
          <Sparkles size={14} /> New Artwork
        </GoldButton>
      </div>
    </div>
  );
}
