import React from "react";
import {
  Home,
  Wand2,
  Grid,
  User,
  Settings,
  Crown,
  Info,
  LogOut,
} from "lucide-react";
import { cn } from "../../utils/cn";
import type { Page } from "../../types";

const HistoryIcon = ({
  size = 16,
  ...p
}: {
  size?: number;
  [k: string]: any;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

export interface SidebarProps {
  page: Page;
  setPage: (p: Page) => void;
}

export function Sidebar({ page, setPage }: SidebarProps) {
  const nav = [
    { id: "dashboard", label: "Dashboard", Icon: Home },
    { id: "studio", label: "Studio", Icon: Wand2 },
    { id: "gallery", label: "Gallery", Icon: Grid },
    { id: "history", label: "History", Icon: HistoryIcon },
    { id: "about", label: "About Us", Icon: Info },
  ];
  const bottom = [
    { id: "profile", label: "Profile", Icon: User },
    { id: "settings", label: "Settings", Icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-56 fixed left-0 top-16 bottom-0 z-40 border-r border-[#C8A14B]/12 bg-[#FFFDF8] dark:bg-[#0E0E0C]">
      <div className="flex-1 p-3 pt-5 flex flex-col gap-0.5">
        {nav.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setPage(id as Page)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left",
              page === id
                ? "bg-[#C8A14B]/12 text-[#C8A14B] border border-[#C8A14B]/20"
                : "text-[#6F6F6F] dark:text-[#9A9A8E] hover:bg-black/4 dark:hover:bg-white/5 hover:text-[#222] dark:hover:text-[#F5F0E8] border border-transparent"
            )}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>
      <div className="p-3 border-t border-[#C8A14B]/12">
        <div className="mb-3 px-3 py-3 rounded-xl bg-gradient-to-br from-[#C8A14B]/10 to-[#6A2332]/8 border border-[#C8A14B]/18">
          <div className="flex items-center gap-1.5 mb-1">
            <Crown size={11} className="text-[#C8A14B]" />
            <span className="text-[11px] font-semibold text-[#C8A14B] tracking-wide">
              PRO PLAN
            </span>
          </div>
          <div className="text-[11px] text-[#6F6F6F] mb-2">
            89,400 / 100,000 credits
          </div>
          <div className="h-1 rounded-full bg-[#C8A14B]/15">
            <div className="h-full w-[89%] rounded-full bg-gradient-to-r from-[#C8A14B] to-[#d4b060]" />
          </div>
        </div>
        {bottom.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setPage(id as Page)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left border border-transparent",
              page === id
                ? "bg-[#C8A14B]/12 text-[#C8A14B]"
                : "text-[#6F6F6F] dark:text-[#9A9A8E] hover:bg-black/4 dark:hover:bg-white/5 hover:text-[#222] dark:hover:text-[#F5F0E8]"
            )}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
        <button
          onClick={() => setPage("landing")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left border border-transparent text-[#6F6F6F] dark:text-[#9A9A8E] hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 mt-1"
        >
          <LogOut size={15} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
