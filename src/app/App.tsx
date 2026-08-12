import React, { lazy, Suspense, useCallback } from "react";
import { useNavigation } from "./hooks/useNavigation";
import { useTheme } from "./hooks/useTheme";
import { AppLayout } from "./components/layout/AppLayout";
import { getAccessToken } from "./api/client";

// ─── Lazy page imports (code splitting) ──────────────────────────────────────
const LandingPage     = lazy(() => import("./features/landing/LandingPage").then((m) => ({ default: m.LandingPage })));
const LoginPage       = lazy(() => import("./features/auth/LoginPage").then((m) => ({ default: m.LoginPage })));
const DashboardPage   = lazy(() => import("./features/dashboard/DashboardPage").then((m) => ({ default: m.DashboardPage })));
const StudioPage      = lazy(() => import("./features/studio/StudioPage").then((m) => ({ default: m.StudioPage })));
const GalleryPage     = lazy(() => import("./features/gallery/GalleryPage").then((m) => ({ default: m.GalleryPage })));
const ViewerPage      = lazy(() => import("./features/viewer/ViewerPage").then((m) => ({ default: m.ViewerPage })));
const CollectionsPage = lazy(() => import("./features/collections/CollectionsPage").then((m) => ({ default: m.CollectionsPage })));
const HistoryPage     = lazy(() => import("./features/history/HistoryPage").then((m) => ({ default: m.HistoryPage })));
const ProfilePage     = lazy(() => import("./features/profile/ProfilePage").then((m) => ({ default: m.ProfilePage })));
const SettingsPage    = lazy(() => import("./features/settings/SettingsPage").then((m) => ({ default: m.SettingsPage })));
const AboutPage       = lazy(() => import("./features/about/AboutPage").then((m) => ({ default: m.AboutPage })));
const NotFoundPage    = lazy(() => import("./features/error/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

// ─── Minimal Suspense fallback ────────────────────────────────────────────────
function MughalLoadingFallback() {
  return <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212]" />;
}

// ─── Root Application Component ───────────────────────────────────────────────
export default function App() {
  const { page, setPage, selectedArtId, handleSelectArt } = useNavigation("landing");
  const { theme, toggleTheme } = useTheme("light");

  const renderPage = useCallback(() => {
    switch (page) {
      case "landing":
        return <LandingPage setPage={setPage} onSelectArt={handleSelectArt} />;
      case "login":
        return <LoginPage setPage={setPage} />;
      case "dashboard":
        if (!getAccessToken()) return <LoginPage setPage={setPage} />;
        return <DashboardPage setPage={setPage} onSelectArt={handleSelectArt} />;
      case "studio":
        return <StudioPage setPage={setPage} onSelectArt={handleSelectArt} />;
      case "gallery":
        return <GalleryPage setPage={setPage} onSelectArt={handleSelectArt} />;
      case "viewer":
        return (
          <ViewerPage
            selectedArtId={selectedArtId}
            setPage={setPage}
            onSelectArt={handleSelectArt}
          />
        );
      case "collections":
        return <CollectionsPage setPage={setPage} onSelectArt={handleSelectArt} />;
      case "history":
        return <HistoryPage setPage={setPage} onSelectArt={handleSelectArt} />;
      case "profile":
        return <ProfilePage setPage={setPage} onSelectArt={handleSelectArt} />;
      case "settings":
        return <SettingsPage />;
      case "about":
        return <AboutPage setPage={setPage} />;
      default:
        return <NotFoundPage setPage={setPage} />;
    }
  }, [page, setPage, selectedArtId, handleSelectArt]);

  return (
    <>
      <style>{`
        @keyframes flare { 0% { opacity: 1; } 100% { opacity: 0; } }
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>
      <AppLayout page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme}>
        <Suspense fallback={<MughalLoadingFallback />}>
          <div key={page} className="page-transition">
            {renderPage()}
          </div>
        </Suspense>
      </AppLayout>
    </>
  );
}
