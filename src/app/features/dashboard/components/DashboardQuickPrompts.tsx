import React from "react";
import { Feather, ArrowRight } from "lucide-react";
import { GlassCard } from "../../../components/common/GlassCard";
import type { Page } from "../../../types";

export interface DashboardQuickPromptsProps {
  setPage: (p: Page) => void;
}

export function DashboardQuickPrompts({
  setPage,
}: DashboardQuickPromptsProps) {
  const prompts = [
    "Akbar's court, elephant procession at dawn",
    "Jahangir with scholars in the library pavilion",
    "Mughal garden party, monsoon season",
  ];

  return (
    <GlassCard gold className="p-6">
      <h3 className="font-semibold text-[#222] dark:text-[#F5F0E8] mb-4">
        Quick Prompts
      </h3>
      <div className="flex flex-col gap-2">
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => setPage("studio")}
            className="w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/4 dark:bg-white/5 hover:bg-[#C8A14B]/7 text-sm text-[#6F6F6F] hover:text-[#222] dark:hover:text-[#F5F0E8] transition-all border border-transparent hover:border-[#C8A14B]/14"
          >
            <Feather size={12} className="text-[#C8A14B] flex-shrink-0" />
            <span className="truncate text-sm">{p}</span>
            <ArrowRight
              size={11}
              className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100"
            />
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
