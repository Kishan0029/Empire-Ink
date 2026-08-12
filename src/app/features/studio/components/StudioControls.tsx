import React, { useState } from "react";
import { Crown, Check, Sun, Flame, CloudRain, Sparkles } from "lucide-react";
import { cn } from "../../../utils/cn";
import {
  MOCK_ERAS as ERAS,
  MOCK_STYLES as STYLES,
  MOCK_RATIOS as RATIOS,
} from "../../../api/mock/mockData";

function getQualityBadge(val: number) {
  if (val >= 85) return "4K Ultra";
  if (val >= 60) return "1080p High";
  return "720p Std";
}

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
  era,
  setEra,
  style,
  setStyle,
  ratio,
  setRatio,
  quality,
  setQuality,
  steps,
  setSteps,
  isLoggedIn = true,
}: StudioControlsProps) {
  const [lightingTone, setLightingTone] = useState("golden");
  const [gildingActive, setGildingActive] = useState(true);

  return (
    <aside className="w-64 border-r border-[#C8A14B]/12 bg-[#FFFDF8] dark:bg-[#0E0E0C] flex flex-col overflow-y-auto flex-shrink-0">
      <div className="p-5 border-b border-[#C8A14B]/12">
        <h3
          className="text-[#222] dark:text-[#F5F0E8] mb-5"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            fontWeight: 600,
          }}
        >
          Composition
        </h3>
        <div className="mb-5">
          <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-2.5">
            Imperial Era
          </label>
          <div className="space-y-1.5">
            {ERAS.map((e, i) => (
              <button
                key={e.name}
                onClick={() => setEra(i)}
                className={cn(
                  "w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between",
                  era === i
                    ? "border-[#C8A14B] bg-[#C8A14B]/8 text-[#222] dark:text-[#F5F0E8] font-medium"
                    : "border-[#C8A14B]/12 text-[#6F6F6F] hover:border-[#C8A14B]/30 hover:bg-[#C8A14B]/4"
                )}
              >
                <div>
                  <div className="font-medium text-xs">{e.name}</div>
                  <div className="text-[10px] text-[#6F6F6F]">{e.years}</div>
                </div>
                {era === i && <Check size={12} className="text-[#C8A14B]" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-2.5">
            Artistic Style
          </label>
          <div className="space-y-1.5">
            {STYLES.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setStyle(i)}
                className={cn(
                  "w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between",
                  style === i
                    ? "border-[#C8A14B] bg-[#C8A14B]/8 text-[#222] dark:text-[#F5F0E8] font-medium"
                    : "border-[#C8A14B]/12 text-[#6F6F6F] hover:border-[#C8A14B]/30 hover:bg-[#C8A14B]/4"
                )}
              >
                <div>
                  <div className="font-medium text-xs">{s.name}</div>
                  <div className="text-[10px] text-[#6F6F6F]">{s.desc}</div>
                </div>
                {style === i && <Check size={12} className="text-[#C8A14B]" />}
              </button>
            ))}
          </div>
        </div>

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

      <div className="p-5 border-t border-[#C8A14B]/12 flex-1">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest">
            Studio Rendering
          </label>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A14B]/12 text-[#C8A14B] font-medium border border-[#C8A14B]/20">
            PRO ENGINE
          </span>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center text-[11px] mb-2">
              <span className="text-[#6F6F6F] font-medium">Resolution Quality</span>
              <span className="font-semibold text-[#C8A14B]">
                {quality}% ({getQualityBadge(quality)})
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={100}
              value={quality}
              onChange={(e) => setQuality(+e.target.value)}
              className="w-full h-[3px] appearance-none rounded-full bg-[#C8A14B]/18 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8A14B] [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(200,161,75,0.5)]"
            />
          </div>

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

          <div>
            <label className="block text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest mb-2.5">
              Court Lighting Preset
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: "golden", label: "Golden Sun", icon: Sun, desc: "Warm court light" },
                { id: "durbar", label: "Candlelight", icon: Flame, desc: "Oil lamp sheen" },
                { id: "monsoon", label: "Monsoon", icon: CloudRain, desc: "Indigo evening" },
                { id: "gilding", label: "24K Gold", icon: Sparkles, desc: "Imperial halos" },
              ].map((item) => {
                const IconComponent = item.icon;
                const isSelected = lightingTone === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLightingTone(item.id)}
                    className={cn(
                      "p-2 rounded-lg border text-left transition-all flex flex-col justify-between",
                      isSelected
                        ? "border-[#C8A14B] bg-[#C8A14B]/10 text-[#222] dark:text-[#F5F0E8] font-medium shadow-sm"
                        : "border-[#C8A14B]/12 text-[#6F6F6F] hover:border-[#C8A14B]/30 hover:bg-[#C8A14B]/4"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <IconComponent
                        size={13}
                        className={isSelected ? "text-[#C8A14B]" : "text-[#6F6F6F]"}
                      />
                      {isSelected && <Check size={11} className="text-[#C8A14B]" />}
                    </div>
                    <div className="font-medium text-[11px] leading-tight">
                      {item.label}
                    </div>
                    <div className="text-[9px] text-[#6F6F6F] mt-0.5">
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setGildingActive(!gildingActive)}
              className={cn(
                "w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all",
                gildingActive
                  ? "border-[#C8A14B] bg-gradient-to-r from-[#C8A14B]/15 to-[#6A2332]/10 text-[#222] dark:text-[#F5F0E8] font-medium"
                  : "border-[#C8A14B]/12 text-[#6F6F6F] hover:border-[#C8A14B]/30"
              )}
            >
              <div className="flex items-center gap-2">
                <Crown size={14} className="text-[#C8A14B]" />
                <span className="text-[11px]">Royal Shell Gold Gilding</span>
              </div>
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  gildingActive ? "bg-[#C8A14B] shadow-[0_0_8px_#C8A14B]" : "bg-gray-400"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
