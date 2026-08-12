import React from "react";
import { cn } from "../../utils/cn";
import type { ButtonProps } from "../../types";

export function GoldButton({
  children,
  onClick,
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const sz = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300",
        "bg-[#C8A14B] text-white select-none",
        "shadow-[0_4px_18px_rgba(200,161,75,0.35)] hover:shadow-[0_6px_28px_rgba(200,161,75,0.55)]",
        "hover:bg-[#d4af56] active:scale-95",
        sz[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function RubyOutlineButton({
  children,
  onClick,
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const sz = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-full border transition-all duration-300 select-none",
        "border-[#6A2332] text-[#6A2332] dark:text-[#E28599] dark:border-[#E28599]/70",
        "hover:bg-[#6A2332] hover:text-white dark:hover:bg-[#6A2332] dark:hover:text-white active:scale-95",
        sz[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export const EmeraldOutlineButton = RubyOutlineButton;
