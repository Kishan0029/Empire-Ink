import { Crown, Sparkles, ArrowLeft } from "lucide-react";
import type { Page } from "../../types";

export interface NotFoundPageProps {
  setPage: (page: Page) => void;
}

export function NotFoundPage({ setPage }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ornamental glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#C8A14B]/10 via-[#6A2332]/5 to-transparent blur-3xl" />
      </div>

      <div className="text-center relative z-10 max-w-lg">
        {/* Decorative crown */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A14B]/20 to-[#9B7629]/10 border border-[#C8A14B]/30 flex items-center justify-center">
            <Crown size={36} className="text-[#C8A14B]" />
          </div>
        </div>

        {/* 404 display */}
        <div
          className="text-[10rem] leading-none font-light text-transparent bg-clip-text bg-gradient-to-b from-[#C8A14B] to-[#C8A14B]/20 mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          404
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C8A14B]/50" />
          <span className="text-[#C8A14B]">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C8A14B]/50" />
        </div>

        <h1
          className="text-3xl md:text-4xl text-[#222] dark:text-[#F5F0E8] font-light mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Imperial Folio Was Not Found
        </h1>
        <p className="text-sm text-[#6F6F6F] leading-relaxed mb-8 max-w-sm mx-auto">
          This page has been lost in the Mughal archives. The royal scribes were unable to locate the requested
          court chronicle. Please return to the atelier.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => setPage("landing")}
            className="px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-sm text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:border-[#C8A14B]/40 transition-all flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Return to Court
          </button>
          <button
            onClick={() => setPage("studio")}
            className="px-6 py-2.5 rounded-full bg-[#C8A14B] text-white text-sm font-medium shadow-[0_4px_18px_rgba(200,161,75,0.35)] hover:bg-[#d4af56] transition-all flex items-center gap-2"
          >
            <Sparkles size={14} /> Open the Atelier
          </button>
        </div>
      </div>
    </div>
  );
}
