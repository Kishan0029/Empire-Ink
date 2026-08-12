import React, { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "../../../utils/cn";
import { MOCK_GEN_LINES as GEN_LINES } from "../../../api/mock/mockData";

export interface GenerationProgressProps {
  onComplete: () => void;
}

export function GenerationProgress({ onComplete }: GenerationProgressProps) {
  const [lineIdx, setLineIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      setLineIdx((i) => (i < GEN_LINES.length - 1 ? i + 1 : i));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          if (!doneRef.current) {
            doneRef.current = true;
            setRevealing(true);
            setTimeout(onComplete, 900);
          }
          return 100;
        }
        return p + 1;
      });
    }, 95);
    return () => clearInterval(t);
  }, [onComplete]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[360px] transition-all duration-700",
        revealing && "opacity-0 scale-105"
      )}
    >
      <div className="relative mb-10 w-20 h-20">
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C8A14B]/25 to-[#C8A14B]/25 animate-ping"
          style={{ animationDuration: "2.2s" }}
        />
        <div
          className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-[#C8A14B]/15 to-[#C8A14B]/15 blur-xl animate-pulse"
          style={{ animationDuration: "1.8s" }}
        />
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#C8A14B] to-[#C8A14B] flex items-center justify-center shadow-[0_0_44px_rgba(200,161,75,0.5),0_0_20px_rgba(200,161,75,0.3)]">
          <Sparkles size={26} className="text-white" />
        </div>
      </div>
      <div className="text-center mb-8 h-7 flex items-center justify-center">
        <p
          className="text-[#222] dark:text-[#F5F0E8] text-lg transition-all duration-600"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
          }}
        >
          {GEN_LINES[lineIdx]}
        </p>
      </div>
      <div className="w-64 h-[2px] bg-[#C8A14B]/15 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C8A14B] via-[#d4af58] to-[#205B4E] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[11px] text-[#6F6F6F] mt-2.5 font-medium">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
