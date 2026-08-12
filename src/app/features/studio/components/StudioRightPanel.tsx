import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface StudioRightPanelProps {
  seed?: string;
  setSeed?: (s: string) => void;
  negPrompt?: string;
  setNegPrompt?: (n: string) => void;
  savedPrompts: string[];
  onSelectSavedPrompt: (p: string) => void;
  onSelectArt?: (id: number) => void;
}

export function StudioRightPanel({
  savedPrompts,
  onSelectSavedPrompt,
}: StudioRightPanelProps) {
  return (
    <aside className="w-64 border-l border-[#C8A14B]/12 bg-[#FFFDF8] dark:bg-[#0E0E0C] flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-[#C8A14B]/12 flex items-center gap-2">
        <Sparkles size={14} className="text-[#C8A14B]" />
        <h3 className="text-[12px] font-semibold tracking-wide uppercase text-[#222] dark:text-[#F5F0E8]">
          Royal Inspiration
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        <p className="text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-1">
          Saved Prompts
        </p>
        {savedPrompts.map((p) => (
          <div
            key={p}
            onClick={() => onSelectSavedPrompt(p)}
            className="p-3 rounded-xl border border-[#C8A14B]/14 hover:border-[#C8A14B]/30 cursor-pointer group transition-all hover:bg-[#C8A14B]/4"
          >
            <p className="text-[11px] text-[#6F6F6F] group-hover:text-[#222] dark:group-hover:text-[#F5F0E8] leading-relaxed transition-colors">
              {p}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}

