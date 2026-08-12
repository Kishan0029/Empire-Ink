import { Clock, Search, Wand2, Copy, Trash2, ExternalLink, Sparkles, Check } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useHistory } from "../../hooks/useHistory";
import type { Page } from "../../types";

export interface HistoryPageProps {
  setPage: (page: Page) => void;
  onSelectArt: (id: number) => void;
}

export function HistoryPage({ setPage, onSelectArt }: HistoryPageProps) {
  const { filtered, query, setQuery, copiedId, handleCopy, deleteItem } = useHistory();

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C8A14B]/30 bg-[#C8A14B]/8 text-[#C8A14B] text-[11px] font-semibold tracking-wide mb-3">
            <Clock size={12} /> Atelier Chronicles
          </div>
          <h1
            className="text-[#222] dark:text-[#F5F0E8]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 400 }}
          >
            Generation History
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-1">
            Review your past Mughal miniature creations, prompts, and royal palette settings
          </p>
        </div>
        <button
          onClick={() => setPage("studio")}
          className="px-6 py-2.5 rounded-full bg-[#C8A14B] text-white text-sm font-medium shadow-[0_4px_18px_rgba(200,161,75,0.35)] hover:bg-[#d4af56] transition-all flex items-center gap-2"
        >
          <Sparkles size={14} /> Create New
        </button>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-3 mb-8 max-w-xl">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F6F6F]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by prompt, title, or era..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/70 dark:bg-[#1A1814]/80 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/60 shadow-sm"
          />
        </div>
      </div>

      {/* History Timeline */}
      <div className="max-w-4xl space-y-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white/40 dark:bg-black/20 rounded-2xl border border-[#C8A14B]/15">
            <Clock size={36} className="text-[#C8A14B]/30 mx-auto mb-4" />
            <p
              className="text-[#222] dark:text-[#F5F0E8] text-xl mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              No history found
            </p>
            <p className="text-sm text-[#6F6F6F]">Try searching with different keywords</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-[#C8A14B]/18 bg-white/65 dark:bg-[#1A1814]/80 backdrop-blur-xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:border-[#C8A14B]/35 transition-all flex flex-col md:flex-row gap-5 items-start md:items-center"
            >
              <div
                onClick={() => onSelectArt(item.id)}
                className="w-full md:w-36 h-36 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer bg-[#E4DDD0] dark:bg-[#2A2520] relative"
              >
                <ImageWithFallback
                  src={item.asset}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink size={18} className="text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C8A14B]/12 text-[#C8A14B] text-[11px] font-semibold">
                    {item.era} Era
                  </span>
                  <span className="text-[11px] text-[#6F6F6F]">&middot;</span>
                  <span className="text-[11px] text-[#6F6F6F]">{item.ratio}</span>
                  <span className="text-[11px] text-[#6F6F6F]">&middot;</span>
                  <span className="text-[11px] text-[#6F6F6F]">{item.timeAgo}</span>
                </div>

                <h3
                  onClick={() => onSelectArt(item.id)}
                  className="text-lg font-medium text-[#222] dark:text-[#F5F0E8] hover:text-[#C8A14B] cursor-pointer transition-colors mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.title}
                </h3>

                <p className="text-sm text-[#6F6F6F] dark:text-[#9A9A8E] leading-relaxed line-clamp-2 bg-black/4 dark:bg-white/5 p-3 rounded-xl border border-[#C8A14B]/10">
                  {item.prompt}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#C8A14B]/10 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectArt(item.id)}
                      className="px-3.5 py-1.5 rounded-full bg-[#C8A14B] text-white text-xs font-medium hover:bg-[#d4af56] transition-all flex items-center gap-1.5"
                    >
                      <ExternalLink size={12} /> Open in Viewer
                    </button>
                    <button
                      onClick={() => setPage("studio")}
                      className="px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:border-[#C8A14B]/35 transition-all flex items-center gap-1.5"
                    >
                      <Wand2 size={12} /> Remix in Studio
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.id, item.prompt)}
                      className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check size={12} className="text-[#C8A14B]" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy Prompt
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-1.5 rounded-lg text-[#6F6F6F] hover:text-[#6A2332] hover:bg-[#6A2332]/10 transition-all"
                      title="Remove from history"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
