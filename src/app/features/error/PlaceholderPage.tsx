import { Crown, Sparkles } from "lucide-react";
import type { Page } from "../../types";

export interface PlaceholderPageProps {
  title?: string;
  description?: string;
  setPage: (page: Page) => void;
}

export function PlaceholderPage({
  title = "Coming Soon",
  description = "This feature is being crafted by the royal scribes of the Imperial Karkhana.",
  setPage,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8A14B]/20 to-[#C8A14B]/5 border border-[#C8A14B]/30 flex items-center justify-center">
            <Crown size={28} className="text-[#C8A14B]" />
          </div>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A14B]/40" />
          <span className="text-[#C8A14B]/60 text-xs">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A14B]/40" />
        </div>

        <h1
          className="text-3xl text-[#222] dark:text-[#F5F0E8] font-light mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {title}
        </h1>
        <p className="text-sm text-[#6F6F6F] leading-relaxed mb-8">{description}</p>

        <button
          onClick={() => setPage("studio")}
          className="px-6 py-2.5 rounded-full bg-[#C8A14B] text-white text-sm font-medium shadow-[0_4px_18px_rgba(200,161,75,0.35)] hover:bg-[#d4af56] transition-all inline-flex items-center gap-2"
        >
          <Sparkles size={14} /> Return to Studio
        </button>
      </div>
    </div>
  );
}
