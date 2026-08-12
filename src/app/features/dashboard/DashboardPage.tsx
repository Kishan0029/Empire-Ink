import React from "react";
import { Plus } from "lucide-react";
import { useProfile } from "../../hooks/useProfile";
import { useArtworks } from "../../hooks/useArtworks";
import { GoldButton } from "../../components/common/Buttons";
import {
  DashboardStats,
  DashboardRecent,
  DashboardQuickPrompts,
  DashboardSubscription,
} from "./components";
import type { Page } from "../../types";

export interface DashboardPageProps {
  setPage: (p: Page) => void;
  onSelectArt?: (id: number) => void;
}

export function DashboardPage({ setPage, onSelectArt }: DashboardPageProps) {
  const { profile } = useProfile();
  const { artworks } = useArtworks();

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1
            className="text-[#222] dark:text-[#F5F0E8]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 400,
            }}
          >
            Good morning,{" "}
            <em style={{ color: "#C8A14B" }}>{profile?.name ?? "Kishan"}</em>
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-1">
            Wednesday, 23 July 2026 &middot; The royal studio is open
          </p>
        </div>
        <GoldButton onClick={() => setPage("studio")} size="sm">
          <Plus size={13} /> New Artwork
        </GoldButton>
      </div>

      <DashboardStats stats={profile?.stats} />
      <DashboardRecent
        artworks={artworks || []}
        setPage={setPage}
        onSelectArt={onSelectArt}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <DashboardQuickPrompts setPage={setPage} />
        <DashboardSubscription credits={profile?.credits} />
      </div>
    </div>
  );
}
