import React from "react";
import { Heart, Bookmark, Download } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { cn } from "../../utils/cn";
import type { Artwork } from "../../api/types";

export interface ArtworkCardProps {
  art: Artwork;
  variant?: "gallery" | "showcase" | "simple";
  isLiked?: boolean;
  isSaved?: boolean;
  onSelect?: (id: number) => void;
  onLike?: (id: number) => void;
  onSave?: (id: number) => void;
  className?: string;
}

export function ArtworkCard({
  art,
  variant = "gallery",
  isLiked = false,
  isSaved = false,
  onSelect,
  onLike,
  onSave,
  className = "",
}: ArtworkCardProps) {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(art.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave?.(art.id);
  };

  if (variant === "showcase") {
    return (
      <div
        onClick={() => onSelect?.(art.id)}
        className={cn(
          "group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.13)] transition-all duration-400 hover:-translate-y-1.5 aspect-square",
          className
        )}
      >
        <div className="w-full h-full bg-[#E4DDD0] dark:bg-[#2A2520]">
          <ImageWithFallback
            src={art.asset}
            alt={art.title}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p
            className="text-white text-[15px] leading-tight mb-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            {art.title}
          </p>
          <p className="text-white/65 text-[11px]">{art.era} Era</p>
        </div>
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div
        onClick={() => onSelect?.(art.id)}
        className={cn(
          "group relative rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)] aspect-square",
          className
        )}
      >
        <div className="w-full h-full bg-[#E4DDD0] dark:bg-[#2A2520]">
          <ImageWithFallback
            src={art.asset}
            alt={art.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-sm leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {art.title}
          </p>
        </div>
      </div>
    );
  }

  const likeCount = art.likes + (isLiked ? 1 : 0);

  return (
    <div
      onClick={() => onSelect?.(art.id)}
      className={cn(
        "group relative rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] aspect-square",
        className
      )}
    >
      <div className="w-full h-full bg-[#E4DDD0] dark:bg-[#2A2520]">
        <ImageWithFallback
          src={art.asset}
          alt={art.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p
          className="text-white text-[15px] leading-tight mb-1 font-medium"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {art.title}
        </p>
        <p className="text-white/60 text-[11px] mb-3">
          {art.era} Era &middot; {art.ratio}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors"
          >
            <Heart
              size={12}
              className={isLiked ? "fill-[#6A2332] text-[#6A2332]" : ""}
            />
            {likeCount}
          </button>
          <div className="flex-1" />
          <button
            onClick={handleSave}
            className={cn(
              "w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-all",
              isSaved
                ? "bg-[#C8A14B] text-white"
                : "bg-white/18 text-white hover:bg-white/28"
            )}
          >
            <Bookmark size={11} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-7 h-7 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all"
          >
            <Download size={11} />
          </button>
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          {art.era}
        </span>
      </div>
    </div>
  );
}
