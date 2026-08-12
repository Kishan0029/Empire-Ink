import React from "react";
import { Crown, Sparkles, ArrowRight } from "lucide-react";
import { GoldButton } from "../../../components/common/Buttons";
import type { Page } from "../../../types";

export interface CtaSectionProps {
  setPage: (p: Page) => void;
}

export function CtaSection({ setPage }: CtaSectionProps) {
  return (
    <section className="py-14 bg-[#111110] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#C8A14B]/7 via-transparent to-[#6A2332]/7 pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C8A14B]/30 bg-[#C8A14B]/8 text-[#C8A14B] text-[11px] font-semibold mb-6">
          <Crown size={10} /> Mughal Edition &nbsp;|&nbsp; Limited Early Access
        </div>
        <h2
          className="text-white font-light mb-4 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            lineHeight: 1.1,
          }}
        >
          Begin Your Journey
          <br />
          <em style={{ color: "#C8A14B", fontStyle: "italic" }}>
            into the Studio
          </em>
        </h2>
        <p className="text-white/55 mb-8 leading-relaxed text-[15px]">
          Start with 10 free generations. No subscription required to explore
          the courts of the Great Mughals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <GoldButton onClick={() => setPage("studio")} size="lg">
            <Sparkles size={16} /> Start Creating Free →
          </GoldButton>
        </div>
      </div>
    </section>
  );
}

