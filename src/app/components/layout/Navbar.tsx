import React from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import logoImage from "@/imports/Empire___Ink_Logo_2.png";
import { GoldButton } from "../common/Buttons";
import { cn } from "../../utils/cn";
import { getAccessToken } from "../../api/client";
import type { Page, Theme } from "../../types";

export interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export function Navbar({ page, setPage, theme, toggleTheme }: NavbarProps) {
  const isLoggedIn = !!getAccessToken();

  const navItems: [string, Page][] = [["Home", "landing"], ["Studio", "studio"]];

  return (
    <div
      role="navigation"
      aria-label="Main Navigation"
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 bg-[#FAF7F2]/90 dark:bg-[#121212]/90 backdrop-blur-2xl border-b border-[#C8A14B]/20"
    >
      <div className="flex-1 flex items-center justify-start">
        <button
          onClick={() => setPage("landing")}
          className="flex items-center group flex-shrink-0"
        >
          <ImageWithFallback
            src={logoImage}
            alt="Empire & Ink Logo"
            className="h-14 w-auto object-contain dark:brightness-0 dark:invert"
          />
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 lg:gap-9">
        {navItems.map(([label, target]) => (
          <button
            key={label}
            onClick={() => setPage(target)}
            className={cn(
              "text-xs sm:text-sm transition-colors",
              page === target
                ? "text-[#C8A14B] font-medium"
                : "text-[#6F6F6F] dark:text-[#9A9A8E] hover:text-[#222] dark:hover:text-[#F5F0E8]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-end gap-3">
        {!isLoggedIn && page !== "login" && (
          <button
            onClick={() => setPage("login")}
            className="text-xs sm:text-sm font-medium text-[#6F6F6F] hover:text-[#C8A14B] dark:text-[#9A9A8E] dark:hover:text-[#F5F0E8] transition-colors px-2.5 py-1"
          >
            Sign In
          </button>
        )}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#6F6F6F] hover:text-[#222] dark:hover:text-white hover:bg-black/6 dark:hover:bg-white/8 transition-all"
        >
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
        </button>
        <GoldButton onClick={() => setPage("studio")} size="sm">
          <Sparkles size={12} /> {isLoggedIn ? "Studio" : "Start Creating Free"}
        </GoldButton>
      </div>
    </div>
  );
}

