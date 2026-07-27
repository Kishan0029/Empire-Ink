import { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles, ChevronDown, Moon, Sun, Crown,
  Layers, Clock, Settings, User, Plus, Download,
  Share2, Heart, ZoomIn, Filter, Grid, Bookmark,
  ArrowRight, Star, Check, Copy, Maximize2,
  ChevronRight, Zap, Wand2, Eye, Globe, Bell,
  ChevronLeft, Search, Home, TrendingUp, Feather,
  FolderOpen, Palette, X, RotateCcw, LogIn,
  ImageIcon,
} from "lucide-react";

import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import logoImage from "@/imports/Empire___Ink_Logo_2.png";

// Gallery Images
import galleryImg1 from "@/imports/450x_auto__so.jpg";
import galleryImg2 from "@/imports/450x_auto__so__1_.jpg";
import galleryImg3 from "@/imports/450x_auto__so__2_.jpg";
import galleryImg4 from "@/imports/450x_auto__so__3_.jpg";
import galleryImg5 from "@/imports/450x_auto__so__4_.jpg";

// ─── History icon fallback ────────────────────────────────────────────────────
const HistoryIcon = ({ size = 16, ...p }: { size?: number; [k: string]: any }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M12 7v5l4 2"/>
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
type Page = "landing" | "login" | "dashboard" | "studio" | "gallery" | "viewer" | "collections" | "history" | "profile" | "settings" | "about" | "404";
type Theme = "light" | "dark";
type GenState = "idle" | "generating" | "complete";

// ─── Data ─────────────────────────────────────────────────────────────────────
const ERAS = ["Akbar (1556–1605)", "Jahangir (1605–1627)", "Shah Jahan (1627–1658)", "Aurangzeb (1658–1707)"];
const STYLES = ["Court Scene", "Portrait", "Battle", "Hunt", "Nature Study", "Architecture"];
const RATIOS = ["1:1", "4:3", "3:4", "16:9", "9:16"];

const GEN_LINES = [
  "Summoning the royal atelier of Emperor Jahangir…",
  "Sketching the composition in the Mughal style…",
  "Laying down the colours — saffron, emerald, and gold…",
  "Painting the silk robes and fine court details…",
  "Adding the gold highlights to figures and borders…",
  "Finishing the miniature with a final flourish…",
];

const ARTWORKS = [
  { id: 1, title: "The Durbar of Emperor Akbar", era: "Akbar", prompt: "Emperor Akbar holding court in Fatehpur Sikri, nobles presenting gifts", ratio: "4:3", likes: 847, asset: galleryImg1, h: 280 },
  { id: 2, title: "Moonlit Hunt Near Agra", era: "Jahangir", prompt: "Royal hunting scene at dusk near the Yamuna river, falconers on horseback", ratio: "3:4", likes: 1203, asset: galleryImg2, h: 380 },
  { id: 3, title: "Portrait of Nur Jahan", era: "Jahangir", prompt: "Empress Nur Jahan in a garden pavilion with lotus flowers", ratio: "3:4", likes: 2156, asset: galleryImg3, h: 340 },
  { id: 4, title: "The Weighing Ceremony", era: "Shah Jahan", prompt: "Shah Jahan being weighed in gold during his birthday celebration", ratio: "4:3", likes: 934, asset: galleryImg4, h: 260 },
  { id: 5, title: "Gardens of Shalimar", era: "Shah Jahan", prompt: "The Shalimar Gardens of Kashmir in full bloom, nobles strolling by fountains", ratio: "16:9", likes: 1567, asset: galleryImg5, h: 220 },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Digital Artist & Illustrator", quote: "Empire & Ink captures the golden-leaf borders and intricate court scenes I spent years studying in museums — in seconds.", avatar: "PS" },
  { name: "James Okafor", role: "Art Director, Vogue India", quote: "The Jahangir-era style is breathtaking. We used Empire & Ink for three editorial spreads this season and the results were museum-quality.", avatar: "JO" },
  { name: "Dr. Rina Bose", role: "Professor of Mughal Art History", quote: "Surprisingly faithful to historical pigment choices and compositional conventions. A remarkable tool for research and education.", avatar: "RB" },
];

const STATS = [
  { label: "Artworks Created", value: "2,847", icon: ImageIcon, delta: "+23%" },
  { label: "This Month", value: "143", icon: TrendingUp, delta: "+8%" },
  { label: "Collections", value: "12", icon: FolderOpen, delta: "4 new" },
  { label: "Credits Used", value: "89.4k", icon: Zap, delta: "11% left" },
];

// ─── Utils ────────────────────────────────────────────────────────────────────
const cn = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

// ─── SVG Ornaments ────────────────────────────────────────────────────────────
function MughalArch({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 90" fill="none">
      <path d="M8 90 L8 38 Q8 4 60 4 Q112 4 112 38 L112 90" stroke="#C8A14B" strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M18 90 L18 41 Q18 18 60 18 Q102 18 102 41 L102 90" stroke="#C8A14B" strokeWidth="0.6" fill="none" opacity="0.3"/>
      <circle cx="60" cy="6" r="3.5" fill="#C8A14B" opacity="0.5"/>
      <circle cx="60" cy="6" r="1.5" fill="#C8A14B" opacity="0.8"/>
      <path d="M44 8 Q60 1 76 8" stroke="#C8A14B" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M8 90 Q8 80 14 76" stroke="#C8A14B" strokeWidth="0.5" fill="none" opacity="0.2"/>
      <path d="M112 90 Q112 80 106 76" stroke="#C8A14B" strokeWidth="0.5" fill="none" opacity="0.2"/>
    </svg>
  );
}

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C8A14B]/35"/>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="2.5" fill="#C8A14B" opacity="0.55"/>
        <path d="M11 3 L11 8 M11 14 L11 19 M3 11 L8 11 M14 11 L19 11" stroke="#C8A14B" strokeWidth="0.9" opacity="0.35"/>
        <path d="M5.5 5.5 L8 8 M14 14 L16.5 16.5 M16.5 5.5 L14 8 M8 14 L5.5 16.5" stroke="#C8A14B" strokeWidth="0.6" opacity="0.25"/>
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C8A14B]/35"/>
    </div>
  );
}

// ─── UI Components ────────────────────────────────────────────────────────────
function GoldButton({ children, onClick, size = "md", className = "" }: {
  children: React.ReactNode; onClick?: () => void; size?: "sm" | "md" | "lg"; className?: string;
}) {
  const sz = { sm: "px-4 py-2 text-xs", md: "px-6 py-2.5 text-sm", lg: "px-8 py-4 text-base" };
  return (
    <button onClick={onClick} className={cn(
      "relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300",
      "bg-[#C8A14B] text-white select-none",
      "shadow-[0_4px_18px_rgba(200,161,75,0.35)] hover:shadow-[0_6px_28px_rgba(200,161,75,0.55)]",
      "hover:bg-[#d4af56] active:scale-95",
      sz[size], className
    )}>
      {children}
    </button>
  );
}

function EmeraldOutlineButton({ children, onClick, size = "md", className = "" }: {
  children: React.ReactNode; onClick?: () => void; size?: "sm" | "md" | "lg"; className?: string;
}) {
  const sz = { sm: "px-4 py-2 text-xs", md: "px-6 py-2.5 text-sm", lg: "px-8 py-4 text-base" };
  return (
    <button onClick={onClick} className={cn(
      "inline-flex items-center justify-center gap-2 font-medium rounded-full border transition-all duration-300 select-none",
      "border-[#205B4E] text-[#205B4E] dark:text-emerald-400 dark:border-emerald-500/70",
      "hover:bg-[#205B4E] hover:text-white dark:hover:bg-[#205B4E] dark:hover:text-white active:scale-95",
      sz[size], className
    )}>
      {children}
    </button>
  );
}

function GlassCard({ children, className = "", gold = false, onClick }: {
  children: React.ReactNode; className?: string; gold?: boolean; onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={cn(
      "rounded-2xl backdrop-blur-xl",
      "bg-white/55 dark:bg-black/35",
      gold
        ? "border border-[#C8A14B]/25 shadow-[0_8px_32px_rgba(200,161,75,0.07),0_2px_8px_rgba(0,0,0,0.05)]"
        : "border border-black/[0.07] dark:border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.05)]",
      onClick && "cursor-pointer",
      className
    )}>
      {children}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, theme, toggleTheme }: {
  page: Page; setPage: (p: Page) => void; theme: Theme; toggleTheme: () => void;
}) {
  const isPublic = ["landing", "login", "about"].includes(page);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 bg-[#FAF7F2]/82 dark:bg-[#121212]/82 backdrop-blur-2xl border-b border-[#C8A14B]/14">
      <button onClick={() => setPage("landing")} className="flex items-center group flex-shrink-0">
        <ImageWithFallback
          src={logoImage}
          alt="Empire & Ink Logo"
          className="h-14 w-auto object-contain"
        />
      </button>

      {page === "landing" && (
        <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {[["Dashboard", "dashboard"], ["Studio", "studio"], ["Gallery", "gallery"], ["About", "about"]].map(([label, target]) => (
            <button key={label} onClick={() => target && setPage(target as Page)}
              className="text-sm text-[#6F6F6F] dark:text-[#9A9A8E] hover:text-[#222] dark:hover:text-[#F5F0E8] transition-colors">
              {label}
            </button>
          ))}
        </div>
      )}

      {!isPublic && (
        <div className="hidden lg:flex items-center gap-1 text-sm">
          {[["Dashboard", "dashboard"], ["Studio", "studio"], ["Gallery", "gallery"]].map(([label, target]) => (
            <button key={label} onClick={() => setPage(target as Page)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-all",
                page === target ? "text-[#C8A14B] bg-[#C8A14B]/10" : "text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              )}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2.5">
        <button onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:bg-black/6 dark:hover:bg-white/8 transition-all">
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
        </button>
        {isPublic ? (
          <>
            <EmeraldOutlineButton onClick={() => setPage("login")} size="sm">Sign in</EmeraldOutlineButton>
            <GoldButton onClick={() => setPage("studio")} size="sm">
              <Sparkles size={12} /> Try Free
            </GoldButton>
          </>
        ) : (
          <button onClick={() => setPage("profile")}
            className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-[11px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
            RS
          </button>
        )}
      </div>
    </nav>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const nav = [
    { id: "dashboard", label: "Dashboard", Icon: Home },
    { id: "studio", label: "Studio", Icon: Wand2 },
    { id: "gallery", label: "Gallery", Icon: Grid },
    { id: "collections", label: "Collections", Icon: FolderOpen },
    { id: "history", label: "History", Icon: HistoryIcon },
  ];
  const bottom = [
    { id: "profile", label: "Profile", Icon: User },
    { id: "settings", label: "Settings", Icon: Settings },
  ];
  return (
    <aside className="hidden lg:flex flex-col w-56 fixed left-0 top-16 bottom-0 z-40 border-r border-[#C8A14B]/12 bg-[#FFFDF8] dark:bg-[#0E0E0C]">
      <div className="flex-1 p-3 pt-5 flex flex-col gap-0.5">
        {nav.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setPage(id as Page)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left",
              page === id
                ? "bg-[#C8A14B]/12 text-[#C8A14B] border border-[#C8A14B]/20"
                : "text-[#6F6F6F] dark:text-[#9A9A8E] hover:bg-black/4 dark:hover:bg-white/5 hover:text-[#222] dark:hover:text-[#F5F0E8] border border-transparent"
            )}>
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>
      <div className="p-3 border-t border-[#C8A14B]/12">
        <div className="mb-3 px-3 py-3 rounded-xl bg-gradient-to-br from-[#C8A14B]/10 to-[#205B4E]/8 border border-[#C8A14B]/18">
          <div className="flex items-center gap-1.5 mb-1">
            <Crown size={11} className="text-[#C8A14B]" />
            <span className="text-[11px] font-semibold text-[#C8A14B] tracking-wide">PRO PLAN</span>
          </div>
          <div className="text-[11px] text-[#6F6F6F] mb-2">89,400 / 100,000 credits</div>
          <div className="h-1 rounded-full bg-[#C8A14B]/15">
            <div className="h-full w-[89%] rounded-full bg-gradient-to-r from-[#C8A14B] to-[#d4b060]"/>
          </div>
        </div>
        {bottom.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setPage(id as Page)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left border border-transparent",
              page === id ? "bg-[#C8A14B]/12 text-[#C8A14B]" : "text-[#6F6F6F] dark:text-[#9A9A8E] hover:bg-black/4 dark:hover:bg-white/5 hover:text-[#222] dark:hover:text-[#F5F0E8]"
            )}>
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}

// ─── App Layout ───────────────────────────────────────────────────────────────
function AppLayout({ children, page, setPage, theme, toggleTheme }: {
  children: React.ReactNode; page: Page; setPage: (p: Page) => void;
  theme: Theme; toggleTheme: () => void;
}) {
  const isApp = !["landing", "login", "about", "404"].includes(page);
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      {isApp && <Sidebar page={page} setPage={setPage} />}
      <main className={cn("pt-16", isApp && "lg:pl-56")}>
        {children}
      </main>
    </div>
  );
}

// ─── HERO PROMPT BOX ─────────────────────────────────────────────────────────
function HeroPromptBox({ setPage }: { setPage: (p: Page) => void }) {
  const [prompt, setPrompt] = useState("");
  const [era, setEra] = useState(ERAS[1]);
  const [style, setStyle] = useState(STYLES[0]);
  const [ratio, setRatio] = useState("4:3");
  const [focused, setFocused] = useState(false);
  const ta = useRef<HTMLTextAreaElement>(null);

  const adjust = () => {
    if (!ta.current) return;
    ta.current.style.height = "auto";
    ta.current.style.height = Math.min(ta.current.scrollHeight, 200) + "px";
  };

  return (
    <div className={cn(
      "relative rounded-[20px] p-[1.5px] transition-all duration-500",
      focused
        ? "bg-gradient-to-b from-[#C8A14B]/50 via-[#C8A14B]/20 to-[#C8A14B]/5 shadow-[0_0_70px_rgba(200,161,75,0.22)]"
        : "bg-gradient-to-b from-[#C8A14B]/18 to-transparent"
    )}>
      <div className="rounded-[19px] bg-white/72 dark:bg-[#1A1814]/80 backdrop-blur-2xl p-5">
        <textarea
          ref={ta}
          value={prompt}
          onChange={e => { setPrompt(e.target.value); adjust(); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Describe your vision… Emperor Jahangir holding a durbar at dusk, nobles in silk jamas, a white falcon perched on his wrist, lotus pond visible through the marble jali screen…"
          rows={3}
          className="w-full bg-transparent text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/55 text-[15px] resize-none outline-none leading-relaxed min-h-[76px]"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
        <div className="flex items-end justify-between gap-3 mt-4 pt-4 border-t border-[#C8A14B]/14">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select value={era} onChange={e => setEra(e.target.value)}
                className="appearance-none pl-3 pr-6 py-1.5 rounded-full text-[11px] font-medium bg-[#C8A14B]/10 text-[#C8A14B] border border-[#C8A14B]/25 cursor-pointer outline-none">
                {ERAS.map(e => <option key={e}>{e}</option>)}
              </select>
              <ChevronDown size={9} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C8A14B] pointer-events-none"/>
            </div>
            <div className="relative">
              <select value={style} onChange={e => setStyle(e.target.value)}
                className="appearance-none pl-3 pr-6 py-1.5 rounded-full text-[11px] font-medium bg-[#205B4E]/10 text-[#205B4E] dark:text-emerald-400 border border-[#205B4E]/25 cursor-pointer outline-none">
                {STYLES.map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown size={9} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#205B4E] dark:text-emerald-400 pointer-events-none"/>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {RATIOS.slice(0, 4).map(r => (
                <button key={r} onClick={() => setRatio(r)}
                  className={cn(
                    "px-2 py-1 rounded-full text-[11px] font-medium border transition-all",
                    ratio === r ? "bg-[#C8A14B] text-white border-[#C8A14B]" : "text-[#6F6F6F] border-black/10 dark:border-white/10 hover:border-[#C8A14B]/40"
                  )}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setPage("studio")}
            className="flex-shrink-0 relative w-12 h-12 rounded-full bg-[#C8A14B] text-white flex items-center justify-center shadow-[0_4px_22px_rgba(200,161,75,0.5)] hover:shadow-[0_6px_32px_rgba(200,161,75,0.65)] hover:scale-105 active:scale-95 transition-all duration-300">
            <span className="absolute inset-0 rounded-full animate-ping bg-[#C8A14B]/35" style={{ animationDuration: "2.8s" }}/>
            <Sparkles size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="bg-[#FAF7F2] dark:bg-[#121212]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-gradient-to-b from-[#C8A14B]/7 to-transparent blur-3xl"/>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#205B4E]/5 blur-3xl"/>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#6A2332]/4 blur-3xl"/>
          <MughalArch className="absolute top-20 right-12 w-44 opacity-18 hidden xl:block" />
          <MughalArch className="absolute top-28 left-12 w-32 opacity-12 hidden xl:block" />
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 py-24">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C8A14B]/30 bg-[#C8A14B]/8 text-[#C8A14B] text-[11px] font-semibold tracking-wide">
              <Sparkles size={11} /> AI-Powered &nbsp;·&nbsp; Mughal Style &nbsp;·&nbsp; Historically Inspired
            </div>
          </div>
          <h1 className="text-center text-[#222] dark:text-[#F5F0E8] leading-[1.05] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.01em" }}>
            Paint the Mughal Court<br />
            <em style={{ fontStyle: "italic", color: "#C8A14B" }}>with Words</em>
          </h1>
          <p className="text-center text-[#6F6F6F] dark:text-[#9A9A8E] max-w-xl mx-auto text-[1.05rem] leading-relaxed mb-12">
            Generate museum-quality Mughal miniature paintings from text prompts — every brushstroke guided by imperial history, every composition faithful to the royal ateliers.
          </p>
          <div className="max-w-2xl mx-auto mb-10">
            <HeroPromptBox setPage={setPage} />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5 text-sm text-[#6F6F6F] dark:text-[#9A9A8E]">
            {[
              [<Check size={13} className="text-[#205B4E]" />, "No credit card required"],
              [<Check size={13} className="text-[#205B4E]" />, "10 free generations"],
              [<span className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-[#C8A14B] fill-[#C8A14B]" />)}</span>, "4.9 from 2,400+ artists"],
            ].map(([icon, text], i) => (
              <div key={i} className="flex items-center gap-1.5">{icon as any}<span>{text as string}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showcase ── */}
      <section className="py-20 bg-[#FFFDF8] dark:bg-[#0E0E0C]">
        <div className="max-w-6xl mx-auto px-6">
          <GoldDivider className="mb-12" />
          <h2 className="text-center text-[#222] dark:text-[#F5F0E8] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 400 }}>
            From the Royal Atelier
          </h2>
          <p className="text-center text-[#6F6F6F] text-sm mb-12">AI-generated miniatures from our community</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ARTWORKS.slice(0, 4).map(art => (
              <div key={art.id} onClick={() => setPage("gallery")}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.13)] transition-all duration-400 hover:-translate-y-1.5 aspect-square">
                <div className="w-full h-full bg-[#E4DDD0] dark:bg-[#2A2520]">
                  <ImageWithFallback src={art.asset}
                    alt={art.title} className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-[15px] leading-tight mb-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{art.title}</p>
                  <p className="text-white/65 text-[11px]">{art.era} Era</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <EmeraldOutlineButton onClick={() => setPage("gallery")}>Explore Full Gallery <ArrowRight size={14} /></EmeraldOutlineButton>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-[#FAF7F2] dark:bg-[#121212]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-[#222] dark:text-[#F5F0E8] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>
            How the Atelier Works
          </h2>
          <p className="text-center text-[#6F6F6F] text-sm max-w-md mx-auto mb-16">
            Three simple steps to bring your Mughal vision to life
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Describe Your Vision", body: "Write a scene in plain language. We automatically add the right historical details — colors, composition, and court elements that match your chosen era.", icon: Feather },
              { step: "02", title: "Your Artwork Takes Shape", body: "Our AI creates a painting with authentic gold highlights, marble screens, and intricate border patterns — all faithful to the Mughal period you selected.", icon: Sparkles },
              { step: "03", title: "Refine & Download", body: "Zoom in, remix, and adjust. Download your artwork in high resolution with all your notes and settings saved alongside it.", icon: Download },
            ].map(({ step, title, body, icon: Icon }) => (
              <GlassCard key={step} gold className="p-8 text-center hover:shadow-[0_14px_44px_rgba(200,161,75,0.10)] transition-all duration-300">
                <div className="mb-3 select-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 700, color: "rgba(200,161,75,0.18)", lineHeight: 1 }}>{step}</div>
                <div className="w-10 h-10 rounded-xl bg-[#C8A14B]/12 flex items-center justify-center mx-auto mb-4">
                  <Icon size={17} className="text-[#C8A14B]" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-[#222] dark:text-[#F5F0E8] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>{title}</h3>
                <p className="text-sm text-[#6F6F6F] dark:text-[#9A9A8E] leading-relaxed">{body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-[#FFFDF8] dark:bg-[#0E0E0C]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-[#222] dark:text-[#F5F0E8] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>
            Crafted for Excellence
          </h2>
          <p className="text-center text-[#6F6F6F] text-sm mb-16">Every feature built for serious artists and historians</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Four Historical Eras", body: "Choose from Akbar, Jahangir, Shah Jahan, or Aurangzeb — each era has its own distinct look, colors, and artistic style.", icon: Crown, color: "#C8A14B" },
              { title: "Smart Description Helper", body: "We automatically fill in the right historical details for you — the colors, court elements, and artistic touches that bring your scene to life.", icon: Wand2, color: "#205B4E" },
              { title: "High-Resolution Download", body: "Save your finished artwork in full resolution, with your original description and all your chosen settings stored alongside it.", icon: Download, color: "#C8A14B" },
              { title: "Style Reference Upload", body: "Upload a miniature painting you love, and we'll pick up its composition, colors, and style to guide your next creation.", icon: Palette, color: "#6A2332" },
              { title: "Collections & Folders", body: "Keep your artworks organized by era, theme, or project. Share any collection with a single link.", icon: FolderOpen, color: "#205B4E" },
              { title: "Multiple Variations", body: "Create several versions of the same scene at once and keep the one you love most — or mix elements from different results.", icon: Layers, color: "#C8A14B" },
            ].map(({ title, body, icon: Icon, color }) => (
              <GlassCard key={title} gold className="p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(200,161,75,0.09)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}16` }}>
                  <Icon size={17} strokeWidth={1.5} style={{ color }} />
                </div>
                <h3 className="font-semibold text-[#222] dark:text-[#F5F0E8] mb-2 text-[15px]">{title}</h3>
                <p className="text-sm text-[#6F6F6F] dark:text-[#9A9A8E] leading-relaxed">{body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-[#FAF7F2] dark:bg-[#121212]">
        <div className="max-w-5xl mx-auto px-6">
          <GoldDivider className="mb-12" />
          <h2 className="text-center text-[#222] dark:text-[#F5F0E8] mb-12"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 400 }}>
            From Our Community
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <GlassCard key={t.name} gold className="p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#C8A14B] fill-[#C8A14B]" />)}
                </div>
                <p className="text-[#222] dark:text-[#F5F0E8] text-[14px] leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C8A14B]/80 to-[#205B4E]/80 flex items-center justify-center text-white text-[11px] font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#222] dark:text-[#F5F0E8]">{t.name}</div>
                    <div className="text-[11px] text-[#6F6F6F]">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#111110] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8A14B]/7 via-transparent to-[#205B4E]/7 pointer-events-none"/>
        <MughalArch className="absolute top-0 left-1/2 -translate-x-1/2 w-72 opacity-8 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C8A14B]/30 bg-[#C8A14B]/8 text-[#C8A14B] text-[11px] font-semibold mb-8">
            <Crown size={10} /> Mughal Edition &nbsp;—&nbsp; Limited Early Access
          </div>
          <h2 className="text-white font-light mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.1 }}>
            Begin Your Journey<br /><em style={{ color: "#C8A14B", fontStyle: "italic" }}>into the Atelier</em>
          </h2>
          <p className="text-white/55 mb-10 leading-relaxed text-[15px]">
            Start with 10 free generations. No subscription required to explore the courts of the Great Mughals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GoldButton onClick={() => setPage("studio")} size="lg"><Sparkles size={16} /> Start Creating Free</GoldButton>
            <button onClick={() => setPage("gallery")} className="text-white/55 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
              View Gallery <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0C0C0A] border-t border-[#C8A14B]/10 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center">
            <ImageWithFallback
              src={logoImage}
              alt="Empire & Ink Logo"
              className="h-12 w-auto object-contain brightness-0 invert opacity-80"
            />
          </div>
          <div className="flex items-center gap-5 text-[11px] text-white/35">
            {["Privacy", "Terms", "API Docs", "Blog", "Contact"].map(l => (
              <button key={l} className="hover:text-white/65 transition-colors">{l}</button>
            ))}
          </div>
          <p className="text-[11px] text-white/25">© 2025 Empire & Ink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ setPage }: { setPage: (p: Page) => void }) {
  const [isReg, setIsReg] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#C8A14B]/5 blur-3xl"/>
        <MughalArch className="absolute top-20 right-20 w-48 opacity-12 hidden lg:block"/>
        <MughalArch className="absolute bottom-20 left-16 w-36 opacity-10 hidden lg:block"/>
      </div>
      <div className="relative z-10 w-full max-w-[360px]">
        <div className="text-center mb-8">
          <ImageWithFallback
            src={logoImage}
            alt="Empire & Ink Logo"
            className="h-24 w-auto object-contain mx-auto mb-4"
          />
          <p className="text-[#6F6F6F] text-sm mt-1">{isReg ? "Create your account" : "Welcome back"}</p>
        </div>
        <GlassCard gold className="p-7">
          <button className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-[#222] dark:text-[#F5F0E8] hover:bg-black/4 dark:hover:bg-white/5 transition-all mb-5">
            <Globe size={15} className="text-[#6F6F6F]" /> Continue with Google
          </button>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[#C8A14B]/15"/><span className="text-[11px] text-[#6F6F6F]">or</span><div className="h-px flex-1 bg-[#C8A14B]/15"/>
          </div>
          <div className="flex flex-col gap-3">
            {isReg && (
              <input type="text" placeholder="Full name"
                className="w-full px-4 py-3 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/14 text-sm outline-none focus:border-[#C8A14B]/40 transition-colors text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/55" />
            )}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
              className="w-full px-4 py-3 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/14 text-sm outline-none focus:border-[#C8A14B]/40 transition-colors text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/55" />
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/14 text-sm outline-none focus:border-[#C8A14B]/40 transition-colors text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/55" />
          </div>
          {!isReg && <div className="text-right mt-2"><button className="text-[11px] text-[#C8A14B] hover:underline">Forgot password?</button></div>}
          <GoldButton onClick={() => setPage("dashboard")} className="w-full mt-5" size="md">{isReg ? "Create Account" : "Sign In"}</GoldButton>
          <p className="text-center text-[11px] text-[#6F6F6F] mt-5">
            {isReg ? "Already have an account?" : "New to Empire & Ink?"}
            <button onClick={() => setIsReg(!isReg)} className="text-[#C8A14B] ml-1 hover:underline">{isReg ? "Sign in" : "Create account"}</button>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── GENERATION PROGRESS ──────────────────────────────────────────────────────
function GenerationProgress({ onComplete }: { onComplete: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      setLineIdx(i => (i < GEN_LINES.length - 1 ? i + 1 : i));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(t);
          if (!doneRef.current) {
            doneRef.current = true;
            setRevealing(true);
            setTimeout(onComplete, 900);
          }
          return 100;
        }
        return p + 1;
      });
    }, 95);
    return () => clearInterval(t);
  }, [onComplete]);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[360px] transition-all duration-700", revealing && "opacity-0 scale-105")}>
      {/* Pulsing orb */}
      <div className="relative mb-10 w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C8A14B]/25 to-[#205B4E]/25 animate-ping" style={{ animationDuration: "2.2s" }}/>
        <div className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-[#C8A14B]/15 to-[#205B4E]/15 blur-xl animate-pulse" style={{ animationDuration: "1.8s" }}/>
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#C8A14B] to-[#205B4E] flex items-center justify-center shadow-[0_0_44px_rgba(200,161,75,0.5),0_0_20px_rgba(32,91,78,0.3)]">
          <Sparkles size={26} className="text-white" />
        </div>
      </div>
      {/* Status line */}
      <div className="text-center mb-8 h-7 flex items-center justify-center">
        <p className="text-[#222] dark:text-[#F5F0E8] text-lg transition-all duration-600"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
          {GEN_LINES[lineIdx]}
        </p>
      </div>
      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-[#C8A14B]/15 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[#C8A14B] via-[#d4af58] to-[#205B4E] transition-all duration-100"
          style={{ width: `${progress}%` }}/>
      </div>
      <p className="text-[11px] text-[#6F6F6F] mt-2.5 font-medium">{Math.round(progress)}%</p>
    </div>
  );
}

// ─── STUDIO PAGE ──────────────────────────────────────────────────────────────
function StudioPage({ setPage }: { setPage: (p: Page) => void }) {
  const [prompt, setPrompt] = useState("Emperor Jahangir holding a durbar at dusk, nobles in silk jamas presenting gifts, a white falcon perched on his wrist, lotus pond visible through the marble jali screen");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [genState, setGenState] = useState<GenState>("idle");
  const [era, setEra] = useState(1);
  const [style, setStyle] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const [quality, setQuality] = useState(85);
  const [steps, setSteps] = useState(40);
  const [enhance, setEnhance] = useState(true);
  const [tab, setTab] = useState<"settings" | "prompts" | "history">("settings");
  const [seed, setSeed] = useState("2847319");
  const [negPrompt, setNegPrompt] = useState("blurry, watermark, modern clothing, western style, cartoon, anime, low quality");
  const ta = useRef<HTMLTextAreaElement>(null);

  const startGen = useCallback(() => {
    if (genState === "generating") return;
    if (enhance) setEnhancedPrompt("Emperor Jahangir, ca. 1610, holding an imperial durbar at Agra Fort as the sun descends over the Yamuna. Senior nobles (amirs) in gossamer jamas — white, vermilion, saffron — kneel presenting jade objects and shawls. A snow-white shahin falcon perches on the Emperor's bejeweled gauntlet. Beyond the perforated marble jali screen, a rectangular hauz (pond) reflects lotus blossoms. Mughal court palette: lapis lazuli sky, shell-gold architecture, carmine and emerald garments, fine hatching for fabric texture. Flat naturalistic perspective with elevated horizon line.");
    setGenState("generating");
  }, [genState, enhance]);

  const onComplete = useCallback(() => setGenState("complete"), []);
  const reset = () => { setGenState("idle"); setEnhancedPrompt(""); };

  const savedPrompts = [
    "Emperor Akbar watching an elephant fight from the Agra Fort battlements, attendants shielding him with peacock fans",
    "A garden pavilion at night, Shah Jahan's queens playing Chaupar by candlelight, fireflies in the garden",
    "Mughal hunting party at dawn in the Rajputana hills, falconers on horseback crossing a river ford",
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex bg-[#FAF7F2] dark:bg-[#121212] overflow-hidden">

      {/* ── Left Controls ── */}
      <aside className="w-64 border-r border-[#C8A14B]/12 bg-[#FFFDF8] dark:bg-[#0E0E0C] flex flex-col overflow-y-auto flex-shrink-0">
        <div className="p-5 border-b border-[#C8A14B]/12">
          <h3 className="text-[#222] dark:text-[#F5F0E8] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 600 }}>
            Composition
          </h3>
          <div className="mb-5">
            <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-2.5">Imperial Era</label>
            <div className="flex flex-col gap-1">
              {ERAS.map((e, i) => (
                <button key={e} onClick={() => setEra(i)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all border",
                    era === i ? "bg-[#C8A14B]/12 border-[#C8A14B]/25 text-[#C8A14B]"
                      : "text-[#6F6F6F] border-transparent hover:bg-black/4 dark:hover:bg-white/5 hover:text-[#222] dark:hover:text-[#F5F0E8]"
                  )}>
                  <Crown size={11} />
                  <span className="text-[11px] font-medium">{e}</span>
                  {era === i && <Check size={10} className="ml-auto" />}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-2.5">Scene Type</label>
            <div className="flex flex-wrap gap-1.5">
              {STYLES.map((s, i) => (
                <button key={s} onClick={() => setStyle(i)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all",
                    style === i ? "bg-[#205B4E] text-white border-[#205B4E]"
                      : "border-black/10 dark:border-white/10 text-[#6F6F6F] hover:border-[#205B4E]/40"
                  )}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-2.5">Aspect Ratio</label>
            <div className="grid grid-cols-5 gap-1">
              {RATIOS.map(r => (
                <button key={r} onClick={() => setRatio(r)}
                  className={cn(
                    "py-1.5 rounded-lg text-[10px] font-semibold border transition-all",
                    ratio === r ? "bg-[#C8A14B] text-white border-[#C8A14B]"
                      : "border-black/10 dark:border-white/10 text-[#6F6F6F] hover:border-[#C8A14B]/35"
                  )}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 flex-1">
          <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-4">Advanced</label>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-[11px] mb-2">
                <span className="text-[#6F6F6F]">Quality</span>
                <span className="font-semibold text-[#C8A14B]">{quality}%</span>
              </div>
              <input type="range" min={40} max={100} value={quality} onChange={e => setQuality(+e.target.value)}
                className="w-full h-[3px] appearance-none rounded-full bg-[#C8A14B]/18 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8A14B] [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(200,161,75,0.5)]" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-2">
                <span className="text-[#6F6F6F]">Detail Level</span>
                <span className="font-semibold text-[#C8A14B]">{steps}</span>
              </div>
              <input type="range" min={20} max={80} value={steps} onChange={e => setSteps(+e.target.value)}
                className="w-full h-[3px] appearance-none rounded-full bg-[#C8A14B]/18 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8A14B] [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(200,161,75,0.5)]" />
            </div>
          </div>
        </div>
      </aside>

      {/* ── Center Canvas ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Prompt bar */}
        <div className="flex-shrink-0 px-5 py-4 border-b border-[#C8A14B]/12 bg-[#FFFDF8]/60 dark:bg-[#0E0E0C]/60 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest">Your Description</label>
          </div>
          <textarea ref={ta} value={prompt} onChange={e => setPrompt(e.target.value)} rows={2}
            className="w-full bg-transparent text-sm text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/45 resize-none outline-none leading-relaxed" />
          {enhancedPrompt && genState !== "idle" && (
            <div className="mt-2.5 pt-2.5 border-t border-[#205B4E]/15">
              <div className="flex items-center gap-1.5 mb-1">
                <Wand2 size={10} className="text-[#205B4E]" />
                <span className="text-[10px] font-semibold text-[#205B4E] uppercase tracking-wider">Enhanced Description</span>
              </div>
              <p className="text-[11px] text-[#6F6F6F] leading-relaxed line-clamp-2">{enhancedPrompt}</p>
            </div>
          )}
          <div className="flex items-center justify-end gap-3 mt-3">
            <span className="text-[11px] text-[#6F6F6F]">{prompt.length} chars</span>
            {genState === "complete" && (
              <button onClick={reset} className="text-[11px] text-[#6F6F6F] hover:text-[#222] dark:hover:text-white flex items-center gap-1 transition-colors">
                <RotateCcw size={10} /> Reset
              </button>
            )}
            <GoldButton onClick={startGen} size="sm" className={genState === "generating" ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}>
              <Sparkles size={12} /> {genState === "generating" ? "Generating…" : "Generate"}
            </GoldButton>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
          {genState === "idle" && (
            <div className="text-center text-[#6F6F6F] select-none">
              <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-[#C8A14B]/22 flex items-center justify-center mx-auto mb-5">
                <ImageIcon size={32} strokeWidth={1} className="text-[#C8A14B]/35" />
              </div>
              <p className="text-[#222] dark:text-[#F5F0E8] mb-2 italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}>Your canvas awaits</p>
              <p className="text-sm">Write a prompt and press Generate</p>
              <p className="text-[11px] mt-1 text-[#6F6F6F]/60">Or click a saved prompt →</p>
            </div>
          )}
          {genState === "generating" && <GenerationProgress onComplete={onComplete} />}
          {genState === "complete" && (
            <div className="relative group max-h-full rounded-2xl overflow-hidden shadow-[0_20px_72px_rgba(0,0,0,0.14)] border border-[#C8A14B]/22">
              <div className="bg-[#E4DDD0] dark:bg-[#2A2520]">
                <ImageWithFallback
                  src={ARTWORKS[1].asset}
                  alt="Generated artwork"
                  className="max-h-[72vh] object-contain"
                />
              </div>
              {/* Light-flare reveal */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" style={{ animation: "flare 1.2s ease-out forwards" }}/>
              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/38 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <button onClick={() => setPage("viewer")} className="w-10 h-10 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all"><Maximize2 size={15}/></button>
                <button className="w-10 h-10 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all"><Download size={15}/></button>
                <button className="w-10 h-10 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all"><Heart size={15}/></button>
                <button className="w-10 h-10 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all"><Share2 size={15}/></button>
              </div>
              {/* Gold border sweep */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-[#C8A14B]/40 pointer-events-none"/>
            </div>
          )}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <aside className="w-64 border-l border-[#C8A14B]/12 bg-[#FFFDF8] dark:bg-[#0E0E0C] flex flex-col flex-shrink-0">
        <div className="flex border-b border-[#C8A14B]/12 flex-shrink-0">
          {(["settings", "prompts", "history"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-3 text-[11px] font-semibold capitalize tracking-wide transition-all border-b-2 -mb-px",
                tab === t ? "border-[#C8A14B] text-[#C8A14B]" : "border-transparent text-[#6F6F6F] hover:text-[#222] dark:hover:text-white"
              )}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {tab === "settings" && (
            <div className="space-y-4">
              {[["Variation Seed", seed], ["Creativity", "7.5"], ["Render Style", "Balanced"]].map(([label, val]) => (
                <div key={label}>
                  <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-1.5">{label}</label>
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/12">
                    <span className="text-sm text-[#222] dark:text-[#F5F0E8]">{val}</span>
                    <Copy size={11} className="text-[#6F6F6F] cursor-pointer hover:text-[#C8A14B] transition-colors" />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-1.5">Exclude From Image</label>
                <textarea value={negPrompt} onChange={e => setNegPrompt(e.target.value)} rows={3}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/12 text-[11px] text-[#6F6F6F] resize-none outline-none focus:border-[#C8A14B]/30 transition-colors leading-relaxed" />
              </div>
              <div className="pt-2">
                <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-2">Output</label>
                <div className="grid grid-cols-2 gap-2">
                  {[["PNG", true], ["JPEG", false], ["4K", true], ["RAW", false]].map(([fmt, active]) => (
                    <button key={String(fmt)} className={cn(
                      "py-2 rounded-lg text-[11px] font-semibold border transition-all",
                      active ? "bg-[#C8A14B]/10 border-[#C8A14B]/25 text-[#C8A14B]" : "border-black/8 dark:border-white/8 text-[#6F6F6F]"
                    )}>
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === "prompts" && (
            <div className="space-y-2.5">
              <p className="text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-3">Saved Prompts</p>
              {savedPrompts.map(p => (
                <div key={p} onClick={() => setPrompt(p)}
                  className="p-3 rounded-xl border border-[#C8A14B]/14 hover:border-[#C8A14B]/30 cursor-pointer group transition-all hover:bg-[#C8A14B]/4">
                  <p className="text-[11px] text-[#6F6F6F] group-hover:text-[#222] dark:group-hover:text-[#F5F0E8] leading-relaxed line-clamp-3 transition-colors">{p}</p>
                </div>
              ))}
            </div>
          )}
              {tab === "history" && (
                <div className="space-y-1">
                  {ARTWORKS.map(art => (
                    <div key={art.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/4 dark:hover:bg-white/4 cursor-pointer group">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#E4DDD0] dark:bg-[#2A2520]">
                        <ImageWithFallback src={art.asset} alt={art.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-[#222] dark:text-[#F5F0E8] truncate">{art.title}</p>
                        <p className="text-[10px] text-[#6F6F6F]">{art.era} · {art.ratio}</p>
                      </div>
                      <ArrowRight size={11} className="text-[#6F6F6F] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
        </div>
      </aside>
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
function GalleryPage({ setPage }: { setPage: (p: Page) => void }) {
  const [filter, setFilter] = useState("All");
  const [liked, setLiked] = useState<Set<number>>(new Set([3, 7]));
  const [saved, setSaved] = useState<Set<number>>(new Set([2]));
  const filters = ["All", "Akbar", "Jahangir", "Shah Jahan", "Aurangzeb", "Favorites"];

  const displayed = filter === "All" ? ARTWORKS
    : filter === "Favorites" ? ARTWORKS.filter(a => liked.has(a.id))
    : ARTWORKS.filter(a => a.era === filter.split(" ")[0]);

  const cols = displayed.length <= 3 
    ? [displayed] 
    : [displayed.filter((_, i) => i % 3 === 0), displayed.filter((_, i) => i % 3 === 1), displayed.filter((_, i) => i % 3 === 2)];

  const toggleLike = (id: number) => setLiked(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSave = (id: number) => setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const ArtCard = ({ art }: { art: typeof ARTWORKS[0] }) => (
    <div className="group relative rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] aspect-square"
      onClick={() => setPage("viewer")}>
      <div className="w-full h-full bg-[#E4DDD0] dark:bg-[#2A2520]">
        <ImageWithFallback src={art.asset}
          alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-[15px] leading-tight mb-1 font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{art.title}</p>
        <p className="text-white/60 text-[11px] mb-3">{art.era} Era · {art.ratio}</p>
        <div className="flex items-center gap-1.5">
          <button onClick={e => { e.stopPropagation(); toggleLike(art.id); }}
            className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors">
            <Heart size={12} className={liked.has(art.id) ? "fill-[#6A2332] text-[#6A2332]" : ""} />
            {art.likes + (liked.has(art.id) ? 1 : 0)}
          </button>
          <div className="flex-1"/>
          <button onClick={e => { e.stopPropagation(); toggleSave(art.id); }}
            className={cn("w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-all", saved.has(art.id) ? "bg-[#C8A14B] text-white" : "bg-white/18 text-white hover:bg-white/28")}>
            <Bookmark size={11} />
          </button>
          <button onClick={e => e.stopPropagation()}
            className="w-7 h-7 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all">
            <Download size={11} />
          </button>
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-medium">{art.era}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212]">
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 bg-[#FAF7F2]/88 dark:bg-[#121212]/88 backdrop-blur-xl border-b border-[#C8A14B]/12 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn(
                "flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-semibold border transition-all",
                filter === f ? "bg-[#C8A14B] text-white border-[#C8A14B] shadow-[0_2px_10px_rgba(200,161,75,0.32)]"
                  : "border-black/10 dark:border-white/10 text-[#6F6F6F] hover:border-[#C8A14B]/35 hover:text-[#222] dark:hover:text-white"
              )}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all">
            <Filter size={14} />
          </button>
          <GoldButton onClick={() => setPage("studio")} size="sm"><Plus size={12} /> New</GoldButton>
        </div>
      </div>

      <div className="px-6 py-7">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <Heart size={36} className="text-[#C8A14B]/28 mb-4" />
            <p className="text-[#222] dark:text-[#F5F0E8] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem" }}>No artworks yet</p>
            <p className="text-sm text-[#6F6F6F]">Like some artworks to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayed.map(art => <ArtCard key={art.id} art={art} />)}
          </div>
        )}

        <div className="flex items-center justify-center py-14">
          <div className="flex items-center gap-3 text-sm text-[#6F6F6F]">
            <div className="w-4 h-4 rounded-full border-2 border-[#C8A14B]/30 border-t-[#C8A14B] animate-spin"/>
            Loading more from the atelier…
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
function DashboardPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-[#222] dark:text-[#F5F0E8]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400 }}>
            Good morning, <em style={{ color: "#C8A14B" }}>Rustam</em>
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-1">Wednesday, 23 July 2025 &middot; The royal atelier is open</p>
        </div>
        <GoldButton onClick={() => setPage("studio")} size="sm"><Plus size={13} /> New Artwork</GoldButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, icon: Icon, delta }) => (
          <GlassCard key={label} gold className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#C8A14B]/10 flex items-center justify-center">
                <Icon size={15} className="text-[#C8A14B]" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-semibold text-[#205B4E] bg-[#205B4E]/10 px-2 py-0.5 rounded-full">{delta}</span>
            </div>
            <div className="text-[#222] dark:text-[#F5F0E8] mb-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, lineHeight: 1 }}>{value}</div>
            <div className="text-[11px] text-[#6F6F6F]">{label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Recent Artworks */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#222] dark:text-[#F5F0E8]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem" }}>Recent Creations</h2>
          <button onClick={() => setPage("gallery")} className="text-[11px] text-[#C8A14B] hover:underline flex items-center gap-1">View all <ChevronRight size={11} /></button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ARTWORKS.slice(0, 4).map(art => (
            <div key={art.id} onClick={() => setPage("viewer")}
              className="group relative rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)] aspect-square">
              <div className="w-full h-full bg-[#E4DDD0] dark:bg-[#2A2520]">
                <ImageWithFallback src={art.asset} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{art.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom cards */}
      <div className="grid lg:grid-cols-2 gap-5">
        <GlassCard gold className="p-6">
          <h3 className="font-semibold text-[#222] dark:text-[#F5F0E8] mb-4">Quick Prompts</h3>
          <div className="flex flex-col gap-2">
            {["Akbar's court, elephant procession at dawn", "Jahangir with scholars in the library pavilion", "Mughal garden party, monsoon season"].map(p => (
              <button key={p} onClick={() => setPage("studio")}
                className="w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/4 dark:bg-white/5 hover:bg-[#C8A14B]/7 text-sm text-[#6F6F6F] hover:text-[#222] dark:hover:text-[#F5F0E8] transition-all border border-transparent hover:border-[#C8A14B]/14">
                <Feather size={12} className="text-[#C8A14B] flex-shrink-0" />
                <span className="truncate text-sm">{p}</span>
                <ArrowRight size={11} className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard gold className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#222] dark:text-[#F5F0E8]">Pro Subscription</h3>
            <span className="text-[10px] font-bold text-[#C8A14B] bg-[#C8A14B]/12 px-2.5 py-1 rounded-full flex items-center gap-1 tracking-wide">
              <Crown size={9} /> PRO
            </span>
          </div>
          <div className="mb-5">
            <div className="flex justify-between text-[11px] mb-2">
              <span className="text-[#6F6F6F]">Monthly credits</span>
              <span className="font-semibold text-[#C8A14B]">89,400 / 100,000</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#C8A14B]/12">
              <div className="h-full w-[89%] rounded-full bg-gradient-to-r from-[#C8A14B] to-[#d4b060]"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[["Resets", "Aug 1, 2025"], ["Plan", "Pro Annual"], ["Artworks", "Unlimited"], ["Download", "Full Quality"]].map(([k, v]) => (
              <div key={k} className="px-3 py-2.5 rounded-xl bg-black/4 dark:bg-white/5">
                <div className="text-[10px] text-[#6F6F6F] mb-0.5">{k}</div>
                <div className="text-[12px] text-[#222] dark:text-[#F5F0E8] font-semibold">{v}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── IMAGE VIEWER ─────────────────────────────────────────────────────────────
function ViewerPage({ setPage }: { setPage: (p: Page) => void }) {
  const art = ARTWORKS[1];
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] flex flex-col">
      <div className="sticky top-16 z-20 bg-[#FFFDF8]/88 dark:bg-[#0E0E0C]/88 backdrop-blur-xl border-b border-[#C8A14B]/12 px-6 py-3 flex items-center gap-4">
        <button onClick={() => setPage("gallery")} className="flex items-center gap-1.5 text-sm text-[#6F6F6F] hover:text-[#222] dark:hover:text-white transition-colors">
          <ChevronLeft size={15} /> Gallery
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[#222] dark:text-[#F5F0E8]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}>{art.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#6F6F6F] hover:text-[#6A2332] hover:bg-[#6A2332]/8 transition-all"><Heart size={15}/></button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#6F6F6F] hover:text-[#C8A14B] hover:bg-[#C8A14B]/8 transition-all"><Share2 size={15}/></button>
          <GoldButton size="sm"><Download size={12}/> Download 4K</GoldButton>
        </div>
      </div>
      <div className="flex-1 grid lg:grid-cols-[1fr_320px]">
        <div className="flex items-center justify-center p-8 bg-[#F0EBE2] dark:bg-[#0A0A09]">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_28px_88px_rgba(0,0,0,0.18)] border border-[#C8A14B]/20" style={{ transform: `scale(${zoom})`, transition: "transform 0.35s cubic-bezier(.4,0,.2,1)" }}>
            <div className="bg-[#E4DDD0]">
              <ImageWithFallback src={art.asset} alt={art.title} className="max-h-[72vh] object-contain" />
            </div>
          </div>
        </div>
        <div className="border-l border-[#C8A14B]/12 bg-[#FFFDF8] dark:bg-[#0E0E0C] p-6 overflow-y-auto">
          <h3 className="text-[#222] dark:text-[#F5F0E8] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500 }}>{art.title}</h3>
          <p className="text-[#6F6F6F] text-sm mb-6">{art.era} Era &middot; {art.ratio} &middot; 2,048 × 2,730</p>

          {/* Zoom controls */}
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-[#6F6F6F] hover:text-[#222] dark:hover:text-white text-sm transition-all">−</button>
            <span className="text-[11px] text-[#6F6F6F] flex-1 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(2, z + 0.25))} className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-[#6F6F6F] hover:text-[#222] dark:hover:text-white text-sm transition-all">+</button>
            <button onClick={() => setZoom(1)} className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-[#6F6F6F] hover:text-[#222] dark:hover:text-white transition-all"><ZoomIn size={12}/></button>
          </div>

          {/* Prompt toggle */}
          <div className="mb-5">
            <div className="flex gap-2 mb-3">
              <button onClick={() => setShowEnhanced(false)} className={cn("px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all", !showEnhanced ? "bg-[#C8A14B] text-white border-[#C8A14B]" : "border-black/10 text-[#6F6F6F] dark:border-white/10")}>Your Description</button>
              <button onClick={() => setShowEnhanced(true)} className={cn("px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all flex items-center gap-1", showEnhanced ? "bg-[#205B4E] text-white border-[#205B4E]" : "border-black/10 text-[#6F6F6F] dark:border-white/10")}>
                <Wand2 size={9} /> Enhanced Version
              </button>
            </div>
            <div className="p-4 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/12 text-[12px] leading-relaxed text-[#6F6F6F]">
              {showEnhanced
                ? "Emperor Jahangir, ca. 1610, holding an imperial durbar at Agra Fort. Senior nobles in gossamer jamas (vermilion, saffron) kneel presenting jade objects. A snow-white shahin falcon perches on the Emperor's bejeweled gauntlet. Beyond the marble jali, a hauz reflects lotus blossoms. Mughal court palette: lapis lazuli sky, shell-gold architecture, fine hatching for fabric textures…"
                : art.prompt}
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t border-[#C8A14B]/10 pt-4">
            {[["Style", "Mughal Miniature"], ["Era", `${art.era} (1605–1627)`], ["Scene", "Court Scene"], ["Detail Level", "High"], ["Creativity", "7.5"], ["Variation", "2,847,319"], ["Created", "23 Jul 2025, 14:32 IST"]].map(([k, v]) => (
              <div key={k} className="flex items-start gap-3 py-2 border-b border-[#C8A14B]/7 last:border-0">
                <span className="text-[11px] text-[#6F6F6F] w-20 flex-shrink-0">{k}</span>
                <span className="text-[11px] text-[#222] dark:text-[#F5F0E8] flex-1 font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PLACEHOLDER ──────────────────────────────────────────────────────────────
function PlaceholderPage({ title, Icon, setPage }: { title: string; Icon: any; setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#C8A14B]/10 flex items-center justify-center mx-auto mb-5">
          <Icon size={24} className="text-[#C8A14B]" strokeWidth={1.5} />
        </div>
        <h2 className="text-[#222] dark:text-[#F5F0E8] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400 }}>{title}</h2>
        <p className="text-sm text-[#6F6F6F] mb-7">Available in the full application</p>
        <GoldButton onClick={() => setPage("dashboard")} size="sm"><ChevronLeft size={13} /> Dashboard</GoldButton>
      </div>
    </div>
  );
}

function NotFoundPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] flex items-center justify-center relative overflow-hidden">
      <MughalArch className="absolute top-16 left-1/2 -translate-x-1/2 w-64 opacity-10 pointer-events-none" />
      <div className="relative z-10 text-center">
        <div className="select-none mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10rem", fontWeight: 700, color: "rgba(200,161,75,0.15)", lineHeight: 1 }}>404</div>
        <h2 className="text-[#222] dark:text-[#F5F0E8] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400 }}>Lost in the Atelier</h2>
        <p className="text-sm text-[#6F6F6F] mb-8">The painting you seek has not yet been created</p>
        <GoldButton onClick={() => setPage("landing")}><Crown size={13} /> Return to Empire & Ink</GoldButton>
      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(t => t === "light" ? "dark" : "light"), []);

  const render = () => {
    switch (page) {
      case "landing": return <LandingPage setPage={setPage} />;
      case "login": return <LoginPage setPage={setPage} />;
      case "dashboard": return <DashboardPage setPage={setPage} />;
      case "studio": return <StudioPage setPage={setPage} />;
      case "gallery": return <GalleryPage setPage={setPage} />;
      case "viewer": return <ViewerPage setPage={setPage} />;
      case "collections": return <PlaceholderPage title="Collections" Icon={FolderOpen} setPage={setPage} />;
      case "history": return <PlaceholderPage title="History" Icon={HistoryIcon} setPage={setPage} />;
      case "profile": return <PlaceholderPage title="Profile" Icon={User} setPage={setPage} />;
      case "settings": return <PlaceholderPage title="Settings" Icon={Settings} setPage={setPage} />;
      case "about": return <PlaceholderPage title="About" Icon={Crown} setPage={setPage} />;
      default: return <NotFoundPage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{`
        @keyframes flare {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>
      <AppLayout page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme}>
        {render()}
      </AppLayout>
    </>
  );
}
