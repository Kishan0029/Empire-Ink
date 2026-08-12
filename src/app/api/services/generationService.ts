import { apiClient, isMockApiEnabled, API_BASE_URL } from "../client";
import {
  MOCK_ARTWORKS,
  MOCK_ERAS,
  MOCK_STYLES,
  MOCK_RATIOS,
  MOCK_GEN_LINES,
  MOCK_SAVED_PROMPTS,
} from "../mock/mockData";
import type {
  GenerateArtworkRequest,
  GenerationCreate,
  GenerationResponse,
} from "../types";

export interface GenerationJobStatus {
  job_id: string;
  status: "idle" | "submitting" | "queued" | "processing" | "enhancing_prompt" | "generating" | "completed" | "failed";
  progress: number;
  image_url?: string | null;
  error_message?: string | null;
  generation_time_ms?: number | null;
  artwork_id?: string | null;
}

export interface StartGenerationResult {
  job_id: string;
  status: string;
}

function mapRatioToDimensions(ratio: string): { width: number; height: number } {
  switch (ratio) {
    case "1:1": return { width: 1024, height: 1024 };
    case "4:3": return { width: 1024, height: 768 };
    case "3:4": return { width: 768, height: 1024 };
    case "16:9": return { width: 1024, height: 576 };
    case "9:16": return { width: 576, height: 1024 };
    default: return { width: 1024, height: 1024 };
  }
}

export const generationService = {
  async generateArtwork(params: GenerateArtworkRequest): Promise<StartGenerationResult> {
    const { width, height } = mapRatioToDimensions(params.ratio);

    const payload: GenerationCreate = {
      prompt: params.prompt,
      enhance_prompt: params.enhance,
      seed: params.seed ? parseInt(params.seed, 10) || undefined : undefined,
      steps: params.steps,
      guidance_scale: 3.5, // Default for now
      lora_strength: 0.7, // Default for now
      width,
      height,
    };

    if (isMockApiEnabled()) {
      return { job_id: `mock-job-${Date.now()}`, status: "queued" };
    }

    try {
      const res = await apiClient<{ id: string; status: string }>("/generations", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return {
        job_id: res.id,
        status: res.status,
      };
    } catch (err) {
      console.error("Fetch generation error:", err);
      throw err;
    }
  },

  async pollGenerationStatus(jobId: string): Promise<GenerationJobStatus> {
    if (isMockApiEnabled() || jobId.startsWith("mock-job-")) {
      return Promise.resolve({
        job_id: jobId,
        status: "completed",
        progress: 100,
        image_url: MOCK_ARTWORKS[1].asset,
        artwork_id: String(MOCK_ARTWORKS[1].id),
      });
    }

    try {
      const res = await apiClient<GenerationResponse>(`/generations/${jobId}`, {
        method: "GET",
      });

      // Construct secure absolute URL using API_BASE_URL
      // The backend returns e.g. "/api/v1/generations/{id}/image"
      // We will just directly construct it to be safe
      let secureImageUrl = null;
      if (res.status === "completed") {
        secureImageUrl = `${API_BASE_URL.replace(/\/$/, '')}/generations/${jobId}/image`;
      }

      // Map backend status to progress mapping
      let progress = 0;
      switch (res.status) {
        case "queued": progress = 10; break;
        case "processing": progress = 20; break;
        case "enhancing_prompt": progress = 40; break;
        case "generating": progress = 80; break;
        case "completed": progress = 100; break;
        case "failed": progress = 0; break;
        default: progress = 0;
      }

      return {
        job_id: res.id,
        status: res.status as any,
        progress,
        image_url: secureImageUrl,
        error_message: res.error,
        generation_time_ms: res.generation_time ? res.generation_time * 1000 : null,
      };
    } catch (err) {
      console.error("Polling error:", err);
      throw err;
    }
  },

  async getGenerationEras(): Promise<string[]> {
    return apiClient<string[]>("/generation/eras", { method: "GET" }, () => MOCK_ERAS).catch(() => MOCK_ERAS);
  },

  async getGenerationStyles(): Promise<string[]> {
    return apiClient<string[]>("/generation/styles", { method: "GET" }, () => MOCK_STYLES).catch(() => MOCK_STYLES);
  },

  async getGenerationRatios(): Promise<string[]> {
    return apiClient<string[]>("/generation/ratios", { method: "GET" }, () => MOCK_RATIOS).catch(() => MOCK_RATIOS);
  },

  async getGenerationLines(): Promise<string[]> {
    return apiClient<string[]>("/generation/lines", { method: "GET" }, () => MOCK_GEN_LINES).catch(() => MOCK_GEN_LINES);
  },

  async getSavedPrompts(): Promise<string[]> {
    return apiClient<string[]>("/generation/saved-prompts", { method: "GET" }, () => MOCK_SAVED_PROMPTS).catch(() => MOCK_SAVED_PROMPTS);
  },
};
