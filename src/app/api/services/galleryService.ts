import { apiClient, isMockApiEnabled } from "../client";
import {
  MOCK_ARTWORKS,
  MOCK_STATS,
  MOCK_TESTIMONIALS,
} from "../mock/mockData";
import type { Artwork, StatsItem, Testimonial, ApiResponse } from "../types";

function mapBackendArtwork(art: any, index: number): Artwork {
  return {
    id: art.id ?? index + 1,
    title: art.title || "Mughal Miniature",
    era: art.era || "Jahangir (1605–1627)",
    prompt: art.prompt || "",
    ratio: art.aspect_ratio || "4:3",
    likes: art.like_count ?? 0,
    asset: art.image_url || MOCK_ARTWORKS[index % MOCK_ARTWORKS.length].asset,
    h: 300,
    date: art.created_at ? new Date(art.created_at).toLocaleDateString() : undefined,
  };
}

export const galleryService = {
  async getArtworks(filter?: string, likedIds?: Set<number | string>): Promise<Artwork[]> {
    if (isMockApiEnabled()) {
      return apiClient<Artwork[]>(`/gallery/artworks`, { method: "GET" }, () => {
        if (!filter || filter === "All") return MOCK_ARTWORKS;
        if (filter === "Favorites") {
          const liked = likedIds ?? new Set([3, 7]);
          return MOCK_ARTWORKS.filter((a) => liked.has(a.id));
        }
        const eraPrefix = filter.split(" ")[0];
        return MOCK_ARTWORKS.filter((a) => a.era === eraPrefix);
      });
    }

    const eraParam = filter && filter !== "All" && filter !== "Favorites" ? `&era=${encodeURIComponent(filter)}` : "";
    const res = await apiClient<ApiResponse<{ items: any[] }>>(`/artworks?page=1&page_size=50${eraParam}`, {
      method: "GET",
    });

    if (!res?.data?.items) return MOCK_ARTWORKS;
    let items = res.data.items.map((item, idx) => mapBackendArtwork(item, idx));
    if (filter === "Favorites" && likedIds) {
      items = items.filter((a) => likedIds.has(a.id));
    }
    return items;
  },

  async getArtworkById(id: number | string): Promise<Artwork | undefined> {
    if (isMockApiEnabled()) {
      return apiClient<Artwork | undefined>(`/gallery/artworks/${id}`, { method: "GET" }, () =>
        MOCK_ARTWORKS.find((a) => a.id === id) || MOCK_ARTWORKS[0]
      );
    }
    const res = await apiClient<ApiResponse<any>>(`/artworks/${id}`, { method: "GET" });
    if (!res?.data) return MOCK_ARTWORKS.find((a) => a.id === id) || MOCK_ARTWORKS[0];
    return mapBackendArtwork(res.data, 0);
  },

  async getStats(): Promise<StatsItem[]> {
    return apiClient<StatsItem[]>("/gallery/stats", { method: "GET" }, () => MOCK_STATS);
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return apiClient<Testimonial[]>("/gallery/testimonials", { method: "GET" }, () => MOCK_TESTIMONIALS);
  },

  async toggleLike(id: number | string, liked: boolean): Promise<{ id: number | string; liked: boolean; likes: number }> {
    if (isMockApiEnabled()) {
      return apiClient<{ id: number | string; liked: boolean; likes: number }>(`/gallery/artworks/${id}/like`, {
        method: "POST",
        body: JSON.stringify({ liked }),
      }, () => {
        const art = MOCK_ARTWORKS.find((a) => a.id === id);
        const likes = (art?.likes || 0) + (liked ? 1 : -1);
        return { id, liked, likes };
      });
    }

    const res = await apiClient<ApiResponse<{ id: string; like_count: number; liked: boolean }>>(
      `/artworks/${id}/like`,
      { method: "POST" }
    );
    const updatedLikes = res?.data?.like_count ?? 1;
    const updatedLiked = res?.data?.liked ?? liked;
    return { id, liked: updatedLiked, likes: updatedLikes };
  },

  async toggleSave(id: number | string, saved: boolean): Promise<{ id: number | string; saved: boolean }> {
    return apiClient<{ id: number | string; saved: boolean }>(`/gallery/artworks/${id}/save`, {
      method: "POST",
      body: JSON.stringify({ saved }),
    }, () => ({ id, saved }));
  },
};

