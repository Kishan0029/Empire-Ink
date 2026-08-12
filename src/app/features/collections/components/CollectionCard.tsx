import React from "react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import type { Collection } from "../../../api/types";

export interface CollectionCardProps {
  col: Collection;
  onSelect: (id: string) => void;
}

export function CollectionCard({ col, onSelect }: CollectionCardProps) {
  return (
    <div
      onClick={() => onSelect(col.id)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#C8A14B]/20 bg-white/60 dark:bg-[#1A1814]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_44px_rgba(200,161,75,0.15)] transition-all duration-400 hover:-translate-y-1"
    >
      <div className="h-56 w-full relative overflow-hidden bg-[#E4DDD0] dark:bg-[#2A2520]">
        <ImageWithFallback
          src={col.cover}
          alt={col.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium border border-white/15">
          {col.count} Artworks
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[11px] font-semibold text-[#C8A14B] tracking-wider uppercase">
            {col.era} Era
          </span>
          <h3
            className="text-white text-2xl font-light mt-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {col.title}
          </h3>
        </div>
      </div>
      <div className="p-5 flex items-center justify-between">
        <p className="text-sm text-[#6F6F6F] dark:text-[#9A9A8E] line-clamp-2 max-w-[80%]">
          {col.description}
        </p>
        <div className="w-10 h-10 rounded-full bg-[#C8A14B]/10 group-hover:bg-[#C8A14B] text-[#C8A14B] group-hover:text-white flex items-center justify-center transition-colors">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
}
