import { FolderOpen, Plus, ArrowRight, ChevronLeft } from "lucide-react";
import { useCollections } from "../../hooks/useCollections";
import { ArtworkCard } from "../../components/common/ArtworkCard";
import type { Page } from "../../types";

export interface CollectionsPageProps {
  setPage: (page: Page) => void;
  onSelectArt: (id: number) => void;
}

const ERA_FILTERS = ["All", "Akbar Era", "Jahangir Era", "Shah Jahan Era", "Royal Gardens"];

export function CollectionsPage({ setPage, onSelectArt }: CollectionsPageProps) {
  const { collections, selectedColId, setSelectedColId, selectedCol, filter, setFilter } =
    useCollections();

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] p-6 lg:p-8">
      {selectedCol ? (
        <div>
          {/* Back button & Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedColId(null)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-sm text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:border-[#C8A14B]/40 transition-all"
              >
                <ChevronLeft size={16} /> Back to Collections
              </button>
              <div>
                <span className="text-[11px] font-semibold text-[#C8A14B] tracking-wider uppercase">
                  {selectedCol.era} Era
                </span>
                <h1
                  className="text-[#222] dark:text-[#F5F0E8]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 400 }}
                >
                  {selectedCol.title}
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
            {selectedCol.description}
          </p>

          {/* Artworks inside Collection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {selectedCol.artworks.map((art) => (
              <ArtworkCard
                key={art.id}
                art={art}
                variant="showcase"
                onSelect={onSelectArt}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C8A14B]/30 bg-[#C8A14B]/8 text-[#C8A14B] text-[11px] font-semibold tracking-wide mb-3">
                <FolderOpen size={12} /> Royal Albums &amp; Folios
              </div>
              <h1
                className="text-[#222] dark:text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 400 }}
              >
                Imperial Collections
              </h1>
              <p className="text-sm text-[#6F6F6F] mt-1">
                Curated albums of Mughal court art, organized by dynasty and theme
              </p>
            </div>
            <button
              onClick={() => setPage("studio")}
              className="px-6 py-2.5 rounded-full bg-[#C8A14B] text-white text-sm font-medium shadow-[0_4px_18px_rgba(200,161,75,0.35)] hover:bg-[#d4af56] transition-all flex items-center gap-2"
            >
              <Plus size={14} /> New Collection
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {ERA_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-[#C8A14B] text-white border-[#C8A14B] shadow-[0_2px_10px_rgba(200,161,75,0.32)]"
                    : "border-black/10 dark:border-white/10 text-[#6F6F6F] hover:border-[#C8A14B]/35 hover:text-[#222] dark:hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Collection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((col) => (
              <div
                key={col.id}
                onClick={() => setSelectedColId(col.id)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#C8A14B]/20 bg-white/60 dark:bg-[#1A1814]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_44px_rgba(200,161,75,0.15)] transition-all duration-400 hover:-translate-y-1"
              >
                <div className="h-56 w-full relative overflow-hidden bg-[#E4DDD0] dark:bg-[#2A2520]">
                  <img
                    src={col.cover}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
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
                  <div className="w-10 h-10 rounded-full bg-[#C8A14B]/10 group-hover:bg-[#C8A14B] text-[#C8A14B] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
