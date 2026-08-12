import React from "react";
import { cn } from "../../utils/cn";

export function MughalArch({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 90" fill="none">
      <path
        d="M8 90 L8 38 Q8 4 60 4 Q112 4 112 38 L112 90"
        stroke="#C8A14B"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M18 90 L18 41 Q18 18 60 18 Q102 18 102 41 L102 90"
        stroke="#C8A14B"
        strokeWidth="0.6"
        fill="none"
        opacity="0.3"
      />
      <circle cx="60" cy="6" r="3.5" fill="#C8A14B" opacity="0.5" />
      <circle cx="60" cy="6" r="1.5" fill="#C8A14B" opacity="0.8" />
      <path
        d="M44 8 Q60 1 76 8"
        stroke="#C8A14B"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M8 90 Q8 80 14 76"
        stroke="#C8A14B"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M112 90 Q112 80 106 76"
        stroke="#C8A14B"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
    </svg>
  );
}

export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C8A14B]/35" />
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="2.5" fill="#C8A14B" opacity="0.55" />
        <path
          d="M11 3 L11 8 M11 14 L11 19 M3 11 L8 11 M14 11 L19 11"
          stroke="#C8A14B"
          strokeWidth="0.9"
          opacity="0.35"
        />
        <path
          d="M5.5 5.5 L8 8 M14 14 L16.5 16.5 M16.5 5.5 L14 8 M8 14 L5.5 16.5"
          stroke="#C8A14B"
          strokeWidth="0.6"
          opacity="0.25"
        />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C8A14B]/35" />
    </div>
  );
}
