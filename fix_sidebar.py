
import sys

content = '''import React from "react";
import { Wand2, LogOut } from "lucide-react";
import { cn } from "../../utils/cn";
import type { Page } from "../../types";

export interface SidebarProps {
  page: Page;
  setPage: (p: Page) => void;
}

export function Sidebar({ page, setPage }: SidebarProps) {
  const nav = [{ id: "studio", label: "Studio", Icon: Wand2 }];

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
'''

with open('/home/jovyan/empire-and-ink/src/app/components/layout/Sidebar.tsx', 'w') as f:
    f.write(content)

print("Sidebar.tsx fixed.")
