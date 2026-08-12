import React from "react";
import { GlassCard } from "../../../components/common/GlassCard";
import { MOCK_STATS } from "../../../api/mock/mockData";
import type { UserStat } from "../../../api/types";

export interface DashboardStatsProps {
  stats?: UserStat[];
}

export function DashboardStats({ stats = MOCK_STATS }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(({ label, value, icon: Icon, delta }) => (
        <GlassCard key={label} gold className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#C8A14B]/10 flex items-center justify-center">
              <Icon size={15} className="text-[#C8A14B]" strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-semibold text-[#C8A14B] bg-[#C8A14B]/10 px-2 py-0.5 rounded-full">
              {delta}
            </span>
          </div>
          <div
            className="text-[#222] dark:text-[#F5F0E8] mb-0.5"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {value}
          </div>
          <div className="text-[11px] text-[#6F6F6F]">{label}</div>
        </GlassCard>
      ))}
    </div>
  );
}
