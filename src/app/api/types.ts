import type React from "react";

export interface Artwork {
  id: number | string;
  title: string;
  era: string;
  prompt: string;
  ratio: string;
  likes: number;
  asset: string;
  h: number;
  date?: string;
}

export type ArtworkFilter = "All" | "Akbar" | "Jahangir" | "Shah Jahan" | "Aurangzeb" | "Favorites";

export type ArtworkEra =
  | "Akbar (1556–1605)"
  | "Jahangir (1605–1627)"
  | "Shah Jahan (1627–1658)"
  | "Aurangzeb (1658–1707)";

export type ArtworkStyle =
  | "Court Scene"
  | "Portrait"
  | "Battle"
  | "Hunt"
  | "Nature Study"
  | "Architecture";

export type ArtworkRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

export interface StatsItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  delta: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Collection {
  id: string;
  title: string;
  era: string;
  count: number;
  description: string;
  cover: string;
  artworks: Artwork[];
}

export interface HistoryItem extends Artwork {
  timeGroup: "Today" | "Yesterday" | "Earlier This Week";
  timeAgo: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  email: string;
  bio: string;
  tier: string;
  creditsUsed: number;
  creditsTotal: number;
  avatar?: string;
}

export interface UserSettings {
  defaultEra: string;
  defaultStyle: string;
  defaultRatio: string;
  autoEnhance: boolean;
  highResUpscale: boolean;
  soundEffects: boolean;
}

export interface GenerateArtworkRequest {
  prompt: string;
  era: number;
  style: number;
  ratio: string;
  quality: number;
  steps: number;
  enhance: boolean;
  seed?: string;
  negativePrompt?: string;
}

export interface GenerateArtworkResponse {
  artwork: Artwork;
  enhancedPrompt?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// FastAPI Backend Contract Types
export interface GenerationCreate {
  prompt: string;
  enhance_prompt: boolean;
  seed?: number | null;
  steps: number;
  guidance_scale: number;
  lora_strength: number;
  width: number;
  height: number;
}

export interface GenerationResponse {
  id: string;
  status: "queued" | "processing" | "enhancing_prompt" | "generating" | "completed" | "failed";
  original_prompt: string;
  enhanced_prompt: string | null;
  image_url: string | null;
  seed: number;
  width: number;
  height: number;
  steps: number;
  guidance_scale: number;
  lora_strength: number;
  generation_time: number | null;
  error: string | null;
  created_at: string;
}
