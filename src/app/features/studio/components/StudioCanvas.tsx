import React, { useRef, useState } from "react";
import {
  Wand2,
  RotateCcw,
  Sparkles,
  ImageIcon,
  Maximize2,
  Download,
  Heart,
  Share2,
} from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { GoldButton } from "../../../components/common/Buttons";
import { GenerationProgress } from "./GenerationProgress";
import { MOCK_ARTWORKS } from "../../../api/mock/mockData";
import { getAccessToken } from "../../../api/client";
import type { GenState, Page } from "../../../types";

export interface StudioCanvasProps {
  prompt: string;
  setPrompt: (p: string) => void;
  enhancedPrompt: string;
  genState: GenState;
  onStartGen: () => void;
  onComplete: () => void;
  onReset: () => void;
  setPage: (p: Page) => void;
  onSelectArt?: (id: number) => void;
  artworkAsset?: string;
  isLoggedIn?: boolean;
}

export function StudioCanvas({
  prompt,
  setPrompt,
  enhancedPrompt,
  genState,
  onStartGen,
  onComplete,
  onReset,
  setPage,
  onSelectArt,
  artworkAsset,
  isLoggedIn: isLoggedInProp,
}: StudioCanvasProps) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const displayAsset = artworkAsset || MOCK_ARTWORKS[1].asset;
  const isLoggedIn = isLoggedInProp ?? !!getAccessToken();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleStartGen = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    onStartGen();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-shrink-0 px-5 py-4 border-b border-[#C8A14B]/12 bg-[#FFFDF8]/60 dark:bg-[#0E0E0C]/60 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] font-semibold text-[#6F6F6F] uppercase tracking-widest">
            Your Description
          </label>
        </div>
        <textarea
          ref={ta}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleStartGen();
            }
          }}
          rows={2}
          className="w-full bg-transparent text-sm text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/45 resize-none outline-none leading-relaxed"
        />
        {enhancedPrompt && genState !== "idle" && (
          <div className="mt-2.5 pt-2.5 border-t border-[#6A2332]/15">
            <div className="flex items-center gap-1.5 mb-1">
              <Wand2 size={10} className="text-[#6A2332]" />
              <span className="text-[10px] font-semibold text-[#6A2332] uppercase tracking-wider">
                Enhanced Description
              </span>
            </div>
            <p className="text-[11px] text-[#6F6F6F] leading-relaxed line-clamp-2">
              {enhancedPrompt}
            </p>
          </div>
        )}
        <div className="flex items-center justify-end gap-3 mt-3">
          <span className="text-[11px] text-[#6F6F6F]">
            {prompt.length} chars
          </span>
          {["completed", "failed"].includes(genState) && (
            <button
              onClick={onReset}
              className="text-[11px] text-[#6F6F6F] hover:text-[#222] dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={10} /> Reset
            </button>
          )}
          <GoldButton
            onClick={handleStartGen}
            size="sm"
            className={
              ["submitting", "queued", "processing", "enhancing_prompt", "generating"].includes(genState)
                ? "opacity-60 cursor-not-allowed pointer-events-none"
                : ""
            }
          >
            <Sparkles size={12} />{" "}
            {["submitting", "queued", "processing", "enhancing_prompt", "generating"].includes(genState) ? "Generating…" : "Generate"}
          </GoldButton>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        {genState === "idle" && (
          <div className="text-center text-[#6F6F6F] select-none">
            <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-[#C8A14B]/22 flex items-center justify-center mx-auto mb-5">
              <ImageIcon
                size={32}
                strokeWidth={1}
                className="text-[#C8A14B]/35"
              />
            </div>
            <p
              className="text-[#222] dark:text-[#F5F0E8] mb-2 italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem",
              }}
            >
              Your canvas awaits
            </p>
            <p className="text-sm">Write a prompt and press Generate</p>
            <p className="text-[11px] mt-1 text-[#6F6F6F]/60">
              Or click a saved prompt &rarr;
            </p>
          </div>
        )}
        {["submitting", "queued", "processing", "enhancing_prompt", "generating"].includes(genState) && (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-[#C8A14B] text-xs uppercase tracking-widest mb-6 font-semibold animate-pulse">
              {genState.replace("_", " ")}
            </div>
            <GenerationProgress onComplete={onComplete} />
          </div>
        )}
        {genState === "completed" && (
          <div className="relative max-w-full max-h-full flex items-center justify-center group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#C8A14B]/30">
              <ImageWithFallback
                src={displayAsset}
                alt="AI Generated Mughal Miniature"
                className="max-h-[72vh] object-contain"
              />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none"
              style={{ animation: "flare 1.2s ease-out forwards" }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/38 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
              <button
                onClick={() =>
                  onSelectArt ? onSelectArt(1) : setPage("viewer")
                }
                className="w-10 h-10 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all"
              >
                <Maximize2 size={15} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all">
                <Download size={15} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all">
                <Heart size={15} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/28 transition-all">
                <Share2 size={15} />
              </button>
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-[#C8A14B]/40 pointer-events-none" />
          </div>
        )}
        {genState === "failed" && (
          <div className="text-center text-[#6A2332] select-none">
            <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-[#6A2332]/40 flex items-center justify-center mx-auto mb-5 bg-[#6A2332]/5">
              <RotateCcw size={32} strokeWidth={1} />
            </div>
            <p className="font-semibold mb-2">Generation Failed</p>
            <p className="text-sm opacity-80">The imperial painters encountered an issue.</p>
            <button onClick={onReset} className="mt-4 text-xs underline hover:text-[#C8A14B] transition-colors">Try Again</button>
          </div>
        )}
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-[#C8A14B]/35 bg-[#FAF7F2] dark:bg-[#121212] p-7 shadow-2xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C8A14B]/35 bg-[#C8A14B]/10 text-[#C8A14B] shadow-sm">
              <Sparkles size={24} />
            </div>
            <h3
              className="mb-2 text-[#222] dark:text-[#F5F0E8]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.85rem",
                fontWeight: 600,
              }}
            >
              Sign In to Generate Art
            </h3>
            <p className="mb-6 text-xs leading-relaxed text-[#6F6F6F] dark:text-[#9A9A8E]">
              Create authentic 17th-century Mughal miniature paintings, save them to your royal gallery, and customize every brushstroke.
            </p>
            <div className="flex flex-col gap-2.5">
              <GoldButton
                onClick={() => {
                  setShowLoginModal(false);
                  setPage("login");
                }}
                size="md"
                className="w-full justify-center"
              >
                Sign In / Register
              </GoldButton>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full rounded-full py-2.5 text-xs font-medium text-[#6F6F6F] hover:text-[#222] dark:hover:text-[#F5F0E8] transition-colors"
              >
                Keep Exploring Free
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
