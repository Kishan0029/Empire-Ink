import React, { useState } from "react";
import { ZoomIn, Wand2 } from "lucide-react";
import { cn } from "../../../utils/cn";
import type { Artwork } from "../../../api/types";

export interface ViewerSidebarProps {
  art: Artwork;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

export function ViewerSidebar({ art, zoom, setZoom }: ViewerSidebarProps) {
  const [showEnhanced, setShowEnhanced] = useState(false);

  return (
    <div className="border-l border-[#C8A14B]/12 bg-[#FFFDF8] dark:bg-[#0E0E0C] p-6 overflow-y-auto">
      <h3
        className="text-[#222] dark:text-[#F5F0E8] mb-1"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.5rem",
          fontWeight: 500,
        }}
      >
        {art.title}
      </h3>
      <p className="text-[#6F6F6F] text-sm mb-6">
        {art.era} Era &middot; {art.ratio} &middot; 2,048 &times; 2,730
      </p>

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
          className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-[#6F6F6F] hover:text-[#222] dark:hover:text-white text-sm transition-all"
        >
          &minus;
        </button>
        <span className="text-[11px] text-[#6F6F6F] flex-1 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
          className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-[#6F6F6F] hover:text-[#222] dark:hover:text-white text-sm transition-all"
        >
          +
        </button>
        <button
          onClick={() => setZoom(1)}
          className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-[#6F6F6F] hover:text-[#222] dark:hover:text-white transition-all"
        >
          <ZoomIn size={12} />
        </button>
      </div>

      <div className="mb-5">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setShowEnhanced(false)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all",
              !showEnhanced
                ? "bg-[#C8A14B] text-white border-[#C8A14B]"
                : "border-black/10 text-[#6F6F6F] dark:border-white/10"
            )}
          >
            Your Description
          </button>
          <button
            onClick={() => setShowEnhanced(true)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all flex items-center gap-1",
              showEnhanced
                ? "bg-[#6A2332] text-white border-[#6A2332]"
                : "border-black/10 text-[#6F6F6F] dark:border-white/10"
            )}
          >
            <Wand2 size={9} /> Enhanced Version
          </button>
        </div>
        <div className="p-4 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/12 text-[12px] leading-relaxed text-[#6F6F6F]">
          {showEnhanced
            ? "Emperor Jahangir, ca. 1610, holding an imperial durbar at Agra Fort. Senior nobles in gossamer jamas (vermilion, saffron) kneel presenting jade objects. A snow-white shahin falcon perches on the Emperor's bejeweled gauntlet. Beyond the marble jali, a hauz reflects lotus blossoms. Mughal court palette: lapis lazuli sky, shell-gold architecture, fine hatching for fabric textures…"
            : art.prompt}
        </div>
      </div>

      <div className="border-t border-[#C8A14B]/10 pt-4">
        {[
          ["Style", "Mughal Miniature"],
          ["Era", `${art.era} (1605–1627)`],
          ["Scene", "Court Scene"],
          ["Detail Level", "High"],
          ["Creativity", "7.5"],
          ["Variation", "2,847,319"],
          ["Created", "23 Jul 2026, 14:32 IST"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex items-start gap-3 py-2 border-b border-[#C8A14B]/7 last:border-0"
          >
            <span className="text-[11px] text-[#6F6F6F] w-20 flex-shrink-0">
              {k}
            </span>
            <span className="text-[11px] text-[#222] dark:text-[#F5F0E8] flex-1 font-medium">
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
