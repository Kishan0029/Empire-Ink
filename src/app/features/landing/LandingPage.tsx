import React from "react";
import { useArtworks } from "../../hooks/useArtworks";
import {
  HeroSection,
  ShowcaseSection,
  HowItWorksSection,
  FeaturesSection,
  TestimonialsSection,
  CtaSection,
  Footer,
} from "./components";
import type { Page } from "../../types";

export interface LandingPageProps {
  setPage: (p: Page) => void;
  onSelectArt?: (id: number) => void;
}

export function LandingPage({ setPage, onSelectArt }: LandingPageProps) {
  const { artworks, testimonials } = useArtworks();

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] overflow-x-hidden">
      <HeroSection setPage={setPage} />
      
      <HowItWorksSection />
      <FeaturesSection />
      
      <CtaSection setPage={setPage} />
      <Footer />
    </div>
  );
}
