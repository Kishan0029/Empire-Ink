import React from "react";
import { Crown } from "lucide-react";
import { GlassCard } from "../../../components/common/GlassCard";

export interface DashboardSubscriptionProps {
  credits?: { used: number; total: number };
}

export function DashboardSubscription({
  credits = { used: 89400, total: 100000 },
}: DashboardSubscriptionProps) {
  const pct = Math.round((credits.used / credits.total) * 100);

  return (
    <GlassCard gold className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#222] dark:text-[#F5F0E8]">
          Pro Subscription
        </h3>
        <span className="text-[10px] font-bold text-[#C8A14B] bg-[#C8A14B]/12 px-2.5 py-1 rounded-full flex items-center gap-1 tracking-wide">
          <Crown size={9} /> PRO
        </span>
      </div>
      <div className="mb-5">
        <div className="flex justify-between text-[11px] mb-2">
          <span className="text-[#6F6F6F]">Monthly credits</span>
          <span className="font-semibold text-[#C8A14B]">
            {credits.used.toLocaleString()} / {credits.total.toLocaleString()}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-[#C8A14B]/12">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#C8A14B] to-[#d4b060]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          ["Resets", "Aug 1, 2026"],
          ["Plan", "Pro Annual"],
          ["Artworks", "Unlimited"],
          ["Download", "Full Quality"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="px-3 py-2.5 rounded-xl bg-black/4 dark:bg-white/5"
          >
            <div className="text-[10px] text-[#6F6F6F] mb-0.5">{k}</div>
            <div className="text-[12px] text-[#222] dark:text-[#F5F0E8] font-semibold">
              {v}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
