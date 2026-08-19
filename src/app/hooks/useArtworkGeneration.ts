import { useState, useEffect, useRef, useCallback } from "react";
import { generationService } from "../api/services/generationService";
import type { GenState } from "../types";
import type { Artwork } from "../api/types";

export function useArtworkGeneration() {
  const [prompt, setPrompt] = useState(
    "Emperor Jahangir holding a durbar at dusk, nobles in silk jamas presenting gifts, a white falcon perched on his wrist, lotus pond visible through the marble jali screen"
  );
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  // Start with idle state
  const [genState, setGenState] = useState<GenState>("idle");
  const [era, setEra] = useState(1);
  const [style, setStyle] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const [quality, setQuality] = useState(85);
  const [steps, setSteps] = useState(40);
  const [enhance, setEnhance] = useState(true);
  const [seed, setSeed] = useState("2847319");
  const [negPrompt, setNegPrompt] = useState(
    "blurry, watermark, modern clothing, western style, cartoon, anime, low quality"
  );

  const [eras, setEras] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [ratios, setRatios] = useState<string[]>([]);
  const [genLines, setGenLines] = useState<string[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [generatedArtwork, setGeneratedArtwork] = useState<Artwork | null>(null);

  const [lineIdx, setLineIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const doneRef = useRef(false);
  const jobIdRef = useRef<string | null>(null);

  useEffect(() => {
    async function loadMetadata() {
      try {
        const [eraList, styleList, ratioList, lineList, promptList] = await Promise.all([
          generationService.getGenerationEras(),
          generationService.getGenerationStyles(),
          generationService.getGenerationRatios(),
          generationService.getGenerationLines(),
          generationService.getSavedPrompts(),
        ]);
        setEras(eraList);
        setStyles(styleList);
        setRatios(ratioList);
        setGenLines(lineList);
        setSavedPrompts(promptList);
      } catch (e) {
        console.error("Failed to load generation metadata:", e);
      }
    }
    loadMetadata();
  }, []);

  const startGen = useCallback(async () => {
    // Prevent double clicking
    if (
      genState === "submitting" ||
      genState === "queued" ||
      genState === "processing" ||
      genState === "enhancing_prompt" ||
      genState === "generating"
    ) return;

    setGenState("submitting");
    setGeneratedArtwork(null);
    setProgress(0);
    setLineIdx(0);
    setRevealing(false);
    doneRef.current = false;
    jobIdRef.current = null;

    try {
      const res = await generationService.generateArtwork({
        prompt,
        era,
        style,
        ratio,
        quality,
        steps,
        enhance,
        seed,
        negativePrompt: negPrompt,
      });
      
      if (res.job_id) {
        jobIdRef.current = res.job_id;
        setGenState(res.status as GenState);
      } else {
        setGenState("failed");
      }
    } catch (e) {
      console.error("Artwork generation request failed:", e);
      setGenState("failed");
    }
  }, [genState, prompt, era, style, ratio, quality, steps, enhance, seed, negPrompt]);

  const onComplete = useCallback(() => {
    setGenState("completed");
  }, []);

  const reset = useCallback(() => {
    setGenState("idle");
    setEnhancedPrompt("");
    setProgress(0);
    setLineIdx(0);
    setRevealing(false);
    jobIdRef.current = null;
  }, []);

  // Update line text (flavor text) while generating
  useEffect(() => {
    if (genState === "idle" || genState === "completed" || genState === "failed" || genLines.length === 0) return;
    const t = setInterval(() => {
      setLineIdx((i) => (i < genLines.length - 1 ? i + 1 : i));
    }, 1500);
    return () => clearInterval(t);
  }, [genState, genLines]);

  // Polling loop
  useEffect(() => {
    // Only poll if we have an active job and we are not in terminal states
    if (
      genState === "idle" ||
      genState === "completed" ||
      genState === "failed" ||
      !jobIdRef.current
    ) return;

    const activeJobId = jobIdRef.current;
    
    const interval = setInterval(async () => {
      try {
        const statusRes = await generationService.pollGenerationStatus(activeJobId);
        setProgress(statusRes.progress || 0);
        
        // Update to granular status (queued, processing, etc.)
        if (statusRes.status !== "failed" && statusRes.status !== "completed") {
           setGenState(statusRes.status as GenState);
        }

        if (statusRes.status === "completed") {
          clearInterval(interval);
          if (statusRes.image_url) {
            setGeneratedArtwork((prev) => ({
              id: statusRes.artwork_id || Date.now(),
              title: prev?.title || "Mughal Miniature",
              era: prev?.era || "Jahangir (1605–1627)",
              prompt: prev?.prompt || prompt,
              ratio: prev?.ratio || ratio,
              likes: 0,
              asset: statusRes.image_url!,
              h: 300,
            }));
          }
          if (!doneRef.current) {
            doneRef.current = true;
            setRevealing(true);
            setTimeout(() => {
              onComplete();
            }, 900);
          }
        } else if (statusRes.status === "failed" || statusRes.status === "cancelled" as any) {
          clearInterval(interval);
          console.error("Generation job failed:", statusRes.error_message);
          setGenState("failed");
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 1500); // 1.5 second reasonable interval

    return () => clearInterval(interval);
  }, [genState, onComplete, prompt, ratio]);

  return {
    prompt,
    setPrompt,
    enhancedPrompt,
    setEnhancedPrompt,
    genState,
    setGenState,
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
    enhance,
    setEnhance,
    seed,
    setSeed,
    negPrompt,
    setNegPrompt,
    eras,
    styles,
    ratios,
    genLines,
    savedPrompts,
    generatedArtwork,
    lineIdx,
    progress,
    revealing,
    startGen,
    onComplete,
    reset,
  };
}
