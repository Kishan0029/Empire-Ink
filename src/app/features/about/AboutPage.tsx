import { Crown, Sparkles, Award, Feather } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useArtworks } from "../../hooks/useArtworks";
import type { Page } from "../../types";

export interface AboutPageProps {
  setPage: (page: Page) => void;
}

const PIGMENTS = [
  {
    name: "Imperial Gold",
    hex: "#C8A14B",
    origin: "24K Shell Gold Leaf",
    desc: "Used for royal halos, illuminated manuscript borders, and architectural gilding.",
  },
  {
    name: "Royal Carmine",
    hex: "#6A2332",
    origin: "Cochineal & Saffron Ruby",
    desc: "The signature deep crimson of imperial canopies, velvet jamas, and court cushions.",
  },
  {
    name: "Sandstone Ivory",
    hex: "#FAF7F2",
    origin: "Agra Marble & Sandstone",
    desc: "The warm naturalistic parchment tone of royal folios and Fatehpur Sikri architecture.",
  },
  {
    name: "Obsidian Court",
    hex: "#1A1814",
    origin: "Lampblack & Indigo",
    desc: "The rich charcoal backdrop for fine miniature brushwork and calligraphy.",
  },
];

const PLATFORM_FEATURES = [
  "Instant AI generation powered by custom miniature art models",
  "Automatic historical prompt enhancement and palette selection",
  "High-resolution upscaled exports for digital design and print",
];

export function AboutPage({ setPage }: AboutPageProps) {
  const { artworks } = useArtworks();
  const heroAsset = artworks[0]?.asset ?? "";

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] p-6 lg:p-12">
      {/* Hero Banner */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C8A14B]/35 bg-[#C8A14B]/10 text-[#C8A14B] text-xs font-semibold tracking-wider uppercase mb-5">
          <Crown size={13} /> AI Mughal Art Platform
        </div>
        <h1
          className="text-4xl md:text-6xl font-light text-[#222] dark:text-[#F5F0E8] mb-6 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Next Generation of <br />
          <em className="italic font-normal" style={{ color: "#C8A14B" }}>
            AI Miniature Artistry
          </em>
        </h1>
        <p className="text-base md:text-lg text-[#6F6F6F] dark:text-[#9A9A8E] max-w-2xl mx-auto leading-relaxed mb-8">
          An AI studio for generating authentic Mughal miniature art from simple text prompts.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => setPage("studio")}
            className="px-8 py-3.5 rounded-full bg-[#C8A14B] text-white text-sm font-medium shadow-[0_4px_22px_rgba(200,161,75,0.4)] hover:bg-[#d4af56] transition-all flex items-center gap-2"
          >
            <Sparkles size={16} /> Enter the Royal Studio
          </button>
          <button
            onClick={() => setPage("gallery")}
            className="px-8 py-3.5 rounded-full border border-black/15 dark:border-white/15 text-sm font-medium text-[#222] dark:text-white hover:border-[#C8A14B] transition-all"
          >
            Explore Masterpieces
          </button>
        </div>
      </div>

      {/* Feature Split Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-20">
        <div className="rounded-3xl overflow-hidden border border-[#C8A14B]/25 shadow-2xl bg-[#E4DDD0] dark:bg-[#2A2520] aspect-[4/3] relative">
          {heroAsset && (
            <ImageWithFallback
              src={heroAsset}
              alt="Mughal Durbar"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
            <div className="text-white">
              <span className="text-[11px] font-semibold text-[#C8A14B] uppercase tracking-wider">
                AI Generation Studio &middot; Real-Time Canvas
              </span>
              <h3 className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Royal-Grade Miniature Artistry
              </h3>
            </div>
          </div>
        </div>

        <div>
          <h2
            className="text-3xl text-[#222] dark:text-[#F5F0E8] mb-4 font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Built for Modern Creators &amp; Designers
          </h2>
          <p className="text-sm text-[#6F6F6F] leading-relaxed mb-6">
            Combine advanced AI models with historical Mughal palettes, handling intricate brushwork and gold-leaf borders automatically from your prompt.
          </p>

          <div className="space-y-3">
            {PLATFORM_FEATURES.map((text, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#C8A14B]/20 flex items-center justify-center text-[#C8A14B] flex-shrink-0">
                  <Award size={12} />
                </div>
                <span className="text-xs font-medium text-[#222] dark:text-[#F5F0E8]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio Footer Note */}
      <div className="max-w-3xl mx-auto text-center rounded-3xl border border-[#C8A14B]/25 bg-gradient-to-br from-[#C8A14B]/10 via-transparent to-[#6A2332]/10 p-8 md:p-12">
        <Feather size={32} className="text-[#C8A14B] mx-auto mb-4" />
        <h3
          className="text-2xl text-[#222] dark:text-[#F5F0E8] mb-3 font-light"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Built for the Modern Royal Studio
        </h3>
        <p className="text-sm text-[#6F6F6F] leading-relaxed mb-6">
          Create custom artworks worthy of the royal court in seconds.
        </p>
        <button
          onClick={() => setPage("studio")}
          className="px-8 py-3 rounded-full bg-[#C8A14B] text-white text-sm font-medium shadow-md hover:bg-[#d4af56] transition-all inline-flex items-center gap-2"
        >
          <Sparkles size={15} /> Start Creating Today
        </button>
      </div>
    </div>
  );
}
