import React from "react";
import { useArtworkGeneration } from "../../hooks/useArtworkGeneration";
import { getAccessToken } from "../../api/client";
import {
  StudioControls,
  StudioCanvas,
  StudioRightPanel,
} from "./components";
import type { Page } from "../../types";

export interface StudioPageProps {
  setPage: (p: Page) => void;
  onSelectArt?: (id: number | string) => void;
}

export function StudioPage({ setPage, onSelectArt }: StudioPageProps) {
  const isLoggedIn = !!getAccessToken();
  const {
    prompt,
    setPrompt,
    enhancedPrompt,
    genState,
    era,
    setEra,
    style,
    setStyle,
    ratio,
    setRatio,
    quality,
    setQuality,
    steps,
    setSteps,
    seed,
    setSeed,
    negPrompt,
    setNegPrompt,
    savedPrompts,
    startGen,
    onComplete,
    reset,
    generatedArtwork,
  } = useArtworkGeneration();

  return (
    <div className="h-[calc(100vh-64px)] flex bg-[#FAF7F2] dark:bg-[#121212] overflow-hidden">
      <StudioControls
        era={era}
        setEra={setEra}
        style={style}
        setStyle={setStyle}
        ratio={ratio}
        setRatio={setRatio}
        quality={quality}
        setQuality={setQuality}
        steps={steps}
        setSteps={setSteps}
        isLoggedIn={isLoggedIn}
      />
      <StudioCanvas
        prompt={prompt}
        setPrompt={setPrompt}
        enhancedPrompt={enhancedPrompt}
        genState={genState}
        onStartGen={startGen}
        onComplete={onComplete}
        onReset={reset}
        setPage={setPage}
        onSelectArt={onSelectArt}
        artworkAsset={generatedArtwork?.asset}
        isLoggedIn={isLoggedIn}
      />
      <StudioRightPanel
        seed={seed}
        setSeed={setSeed}
        negPrompt={negPrompt}
        setNegPrompt={setNegPrompt}
        savedPrompts={savedPrompts}
        onSelectSavedPrompt={setPrompt}
        onSelectArt={onSelectArt}
      />
    </div>
  );
}

