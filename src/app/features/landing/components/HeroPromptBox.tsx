import React, { useState, useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "../../../utils/cn";
import {
  MOCK_ERAS as ERAS,
  MOCK_RATIOS as RATIOS,
} from "../../../api/mock/mockData";
import type { Page } from "../../../types";

export interface HeroPromptBoxProps {
  setPage: (p: Page) => void;
}

export function HeroPromptBox({ setPage }: HeroPromptBoxProps) {
  const [prompt, setPrompt] = useState("");
  const [era, setEra] = useState(ERAS[1]);
  const [ratio, setRatio] = useState("4:3");
  const [focused, setFocused] = useState(false);
  const ta = useRef<HTMLTextAreaElement>(null);

  const adjust = () => {
    if (!ta.current) return;
    ta.current.style.height = "auto";
    ta.current.style.height = Math.min(ta.current.scrollHeight, 200) + "px";
  };

  return (
    <div
      className={cn(
        "relative rounded-[20px] p-[1.5px] transition-all duration-500",
        focused
          ? "bg-gradient-to-b from-[#C8A14B]/50 via-[#C8A14B]/20 to-[#C8A14B]/5 shadow-[0_0_70px_rgba(200,161,75,0.22)]"
          : "bg-gradient-to-b from-[#C8A14B]/18 to-transparent"
      )}
    >
      <div className="rounded-[19px] bg-white/72 dark:bg-[#1A1814]/80 backdrop-blur-2xl p-5">
        <textarea
          ref={ta}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            adjust();
          }}
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
              <select
                value={era}
                onChange={(e) => setEra(e.target.value)}
                className="appearance-none pl-3 pr-6 py-1.5 rounded-full text-[11px] font-medium bg-[#C8A14B]/10 text-[#C8A14B] border border-[#C8A14B]/25 cursor-pointer outline-none"
              >
                {ERAS.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>
              <ChevronDown
                size={9}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C8A14B] pointer-events-none"
              />
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {RATIOS.slice(0, 4).map((r) => (
                <button
                  key={r}
                  onClick={() => setRatio(r)}
                  className={cn(
                    "px-2 py-1 rounded-full text-[11px] font-medium border transition-all",
                    ratio === r
                      ? "bg-[#C8A14B] text-white border-[#C8A14B]"
                      : "text-[#6F6F6F] border-black/10 dark:border-white/10 hover:border-[#C8A14B]/40"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setPage("studio")}
            className="flex-shrink-0 relative w-12 h-12 rounded-full bg-[#C8A14B] text-white flex items-center justify-center shadow-[0_4px_22px_rgba(200,161,75,0.5)] hover:shadow-[0_6px_32px_rgba(200,161,75,0.65)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span
              className="absolute inset-0 rounded-full animate-ping bg-[#C8A14B]/35"
              style={{ animationDuration: "2.8s" }}
            />
            <Sparkles size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
