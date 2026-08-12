import React from "react";
import { Crown, ChevronDown } from "lucide-react";
import { HeroPromptBox } from "./HeroPromptBox";
import type { Page } from "../../../types";

export interface HeroSectionProps {
  setPage: (p: Page) => void;
}

export function HeroSection({ setPage }: HeroSectionProps) {
  return (
    <section className="relative pt-10 pb-12 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-[#C8A14B]/9 via-[#C8A14B]/4 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-48 w-[400px] h-[400px] rounded-full bg-[#C8A14B]/6 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#6A2332]/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A14B]/35 bg-[#C8A14B]/10 text-[#C8A14B] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <Crown size={12} />
          AI Mughal Art Studio
        </div>

        <h1
          className="text-[#222] dark:text-[#F5F0E8] font-light mb-4 tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
            lineHeight: 1.08,
          }}
        >
          Resurrect the Imperial
          <br />
          <em className="font-normal italic" style={{ color: "#C8A14B" }}>
            Mughal Artistry
          </em>
        </h1>

        <p className="text-[#6F6F6F] dark:text-[#9A9A8E] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Create authentic 17th-century Mughal miniature paintings with rich historical colors and royal court styling.
        </p>

        <HeroPromptBox setPage={setPage} />

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage("studio")}
            className="px-7 py-3 rounded-full border border-[#C8A14B]/40 bg-[#C8A14B]/15 hover:bg-[#C8A14B]/25 text-[#C8A14B] text-sm font-semibold transition-all shadow-md"
          >
            Start Creating Free →
          </button>
        </div>
      </div>
    </section>
  );
}

