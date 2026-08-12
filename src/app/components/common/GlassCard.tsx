import React from "react";
import { cn } from "../../utils/cn";
import type { CardProps } from "../../types";

export function GlassCard({
  children,
  className = "",
  gold = false,
  onClick,
  ...props
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl backdrop-blur-xl",
        "bg-white/55 dark:bg-black/35",
        gold
          ? "border border-[#C8A14B]/25 shadow-[0_8px_32px_rgba(200,161,75,0.07),0_2px_8px_rgba(0,0,0,0.05)]"
          : "border border-black/[0.07] dark:border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.05)]",
        onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
