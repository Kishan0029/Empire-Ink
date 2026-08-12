import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { cn } from "../../utils/cn";
import { getAccessToken } from "../../api/client";
import type { Page, Theme } from "../../types";

export interface AppLayoutProps {
  children: React.ReactNode;
  page: Page;
  setPage: (p: Page) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export function AppLayout({
  children,
  page,
  setPage,
  theme,
  toggleTheme,
}: AppLayoutProps) {
  const isLoggedIn = !!getAccessToken();
  const isApp =
    isLoggedIn &&
    !["landing", "login", "404", "gallery", "about"].includes(page);
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar
        page={page}
        setPage={setPage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      {isApp && <Sidebar page={page} setPage={setPage} />}
      <main className={cn("pt-16", isApp && "lg:pl-56")}>{children}</main>
    </div>
  );
}
