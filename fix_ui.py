
import sys

content = '''import React from "react";
import { cn } from "../../../utils/cn";
import {
  MOCK_RATIOS as RATIOS,
} from "../../../api/mock/mockData";

function getStepsBadge(val: number) {
  if (val >= 65) return "Masterwork";
  if (val >= 40) return "Fine Miniature";
  return "Soft Sketch";
}

export interface StudioControlsProps {
  era: number;
  setEra: (i: number) => void;
  style: number;
  setStyle: (i: number) => void;
  ratio: string;
  setRatio: (r: string) => void;
  quality: number;
  setQuality: (q: number) => void;
  steps: number;
  setSteps: (s: number) => void;
  isLoggedIn?: boolean;
}

export function StudioControls({
  ratio,
  setRatio,
  steps,
  setSteps,
}: StudioControlsProps) {

  return (
    <aside className="w-64 border-r border-[#C8A14B]/12 bg-[#FFFDF8] dark:bg-[#0E0E0C] flex flex-col overflow-y-auto flex-shrink-0">
      <div className="p-5 border-b border-[#C8A14B]/12">
        <h3
          className="text-[#222] dark:text-[#F5F0E8] mb-5"
          style={{
            fontFamily: "\'Cormorant Garamond\', serif",
            fontSize: "1.15rem",
            fontWeight: 600,
          }}
        >
          Composition
        </h3>
        
        <div>
          <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-2.5">
            Canvas Proportions
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {RATIOS.map((r) => (
              <button
                key={r.name}
                onClick={() => setRatio(r.name)}
                className={cn(
                  "p-2 rounded-lg border text-center transition-all",
                  ratio === r.name
                    ? "border-[#C8A14B] bg-[#C8A14B]/8 text-[#222] dark:text-[#F5F0E8]"
                    : "border-[#C8A14B]/12 text-[#6F6F6F] hover:border-[#C8A14B]/30 hover:bg-[#C8A14B]/4"
                )}
              >
                <div className="font-semibold text-xs">{r.name}</div>
                <div className="text-[9px] text-[#6F6F6F] mt-0.5">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 flex-1">
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center text-[11px] mb-2">
              <span className="text-[#6F6F6F] font-medium">Brushwork Detail</span>
              <span className="font-semibold text-[#C8A14B]">
                {steps} Steps • {getStepsBadge(steps)}
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={80}
              value={steps}
              onChange={(e) => setSteps(+e.target.value)}
              className="w-full h-[3px] appearance-none rounded-full bg-[#C8A14B]/18 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8A14B] [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(200,161,75,0.5)]"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
'''

with open('/home/jovyan/empire-and-ink/src/app/features/studio/components/StudioControls.tsx', 'w') as f:
    f.write(content)
print("Replaced StudioControls.tsx cleanly")
