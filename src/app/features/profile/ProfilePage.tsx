import { User, Crown, Heart, Bookmark, Grid, Sparkles, Edit3, ArrowRight } from "lucide-react";
import { ArtworkCard } from "../../components/common/ArtworkCard";
import { useProfile } from "../../hooks/useProfile";
import type { Page } from "../../types";

export interface ProfilePageProps {
  setPage: (page: Page) => void;
  onSelectArt: (id: number) => void;
}

const STATS = [
  { label: "Artworks Created", value: "2,847", icon: Grid },
  { label: "Total Likes Received", value: "14.2k", icon: Heart },
  { label: "Collections", value: "12", icon: Crown },
  { label: "Credits Available", value: "89.4k", icon: Sparkles },
];

const TABS = [
  { id: "creations" as const, label: "My Creations" },
  { id: "liked" as const, label: "Liked Artworks" },
  { id: "saved" as const, label: "Saved Artworks" },
];

export function ProfilePage({ setPage, onSelectArt }: ProfilePageProps) {
  const { profile, tab, setTab, displayed, likedIds, savedIds, toggleLike, toggleSave } =
    useProfile();

  const tabCounts: Record<string, number> = {
    creations: displayed.length,
    liked: likedIds.size,
    saved: savedIds.size,
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] p-6 lg:p-8">
      {/* Profile Card */}
      <div className="rounded-3xl border border-[#C8A14B]/25 bg-white/70 dark:bg-[#1A1814]/85 backdrop-blur-2xl p-6 lg:p-8 mb-8 shadow-[0_12px_44px_rgba(200,161,75,0.08)] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#C8A14B]/15 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A14B] to-[#9B7629] text-white flex items-center justify-center text-3xl font-light shadow-[0_8px_24px_rgba(200,161,75,0.4)] border-2 border-white/20"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {profile?.name?.[0] ?? "K"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1
                  className="text-3xl text-[#222] dark:text-[#F5F0E8]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {profile?.name ?? "Kishan"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C8A14B]/15 text-[#C8A14B] text-[11px] font-semibold border border-[#C8A14B]/30">
                  <Crown size={11} /> PRO PLAN
                </span>
              </div>
              <p className="text-sm text-[#6F6F6F] mb-2">
                Master Atelier Artist &middot; Mughal Imperial Court Member
              </p>
              <p className="text-xs text-[#6F6F6F] max-w-lg leading-relaxed">
                {profile?.bio ??
                  "Passionate about 17th-century Mughal miniature art, imperial durbars, and historical color palettes. Creating museum-grade AI miniatures in the tradition of Ustad Mansur."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage("settings")}
              className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-xs text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:border-[#C8A14B]/40 transition-all flex items-center gap-1.5"
            >
              <Edit3 size={13} /> Edit Profile
            </button>
            <button
              onClick={() => setPage("studio")}
              className="px-5 py-2 rounded-full bg-[#C8A14B] text-white text-xs font-medium shadow-[0_4px_18px_rgba(200,161,75,0.35)] hover:bg-[#d4af56] transition-all flex items-center gap-1.5"
            >
              <Sparkles size={13} /> New Artwork
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#C8A14B]/14">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8A14B]/10 flex items-center justify-center">
                <Icon size={16} className="text-[#C8A14B]" />
              </div>
              <div>
                <div
                  className="text-[#222] dark:text-[#F5F0E8] text-xl font-semibold leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {value}
                </div>
                <div className="text-[11px] text-[#6F6F6F] mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-[#C8A14B]/15 pb-4">
        <div className="flex items-center gap-3">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all flex items-center gap-2 ${
                tab === item.id
                  ? "bg-[#C8A14B] text-white border-[#C8A14B] shadow-[0_2px_10px_rgba(200,161,75,0.32)]"
                  : "border-black/10 dark:border-white/10 text-[#6F6F6F] hover:border-[#C8A14B]/40 hover:text-[#222] dark:hover:text-white"
              }`}
            >
              {item.label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  tab === item.id
                    ? "bg-white/20 text-white"
                    : "bg-black/5 dark:bg-white/10 text-[#6F6F6F]"
                }`}
              >
                {tabCounts[item.id]}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setPage("collections")}
          className="text-xs text-[#C8A14B] hover:underline flex items-center gap-1 font-medium"
        >
          View Albums &amp; Collections <ArrowRight size={13} />
        </button>
      </div>

      {/* Artwork Grid */}
      {displayed.length === 0 ? (
        <div className="text-center py-28 bg-white/40 dark:bg-black/20 rounded-2xl border border-[#C8A14B]/15">
          <Heart size={36} className="text-[#C8A14B]/30 mx-auto mb-4" />
          <p
            className="text-[#222] dark:text-[#F5F0E8] text-xl mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            No artworks in this folder
          </p>
          <p className="text-sm text-[#6F6F6F]">
            Explore the gallery to like or save Mughal miniatures
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {displayed.map((art) => (
            <ArtworkCard
              key={art.id}
              art={art}
              isLiked={likedIds.has(art.id)}
              isSaved={savedIds.has(art.id)}
              onSelect={onSelectArt}
              onLike={toggleLike}
              onSave={toggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
}
