import { apiClient, isMockApiEnabled } from "../client";
import { MOCK_ARTWORKS, MOCK_USER_PROFILE } from "../mock/mockData";
import type { Artwork, UserProfile, ApiResponse } from "../types";

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

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    if (isMockApiEnabled()) {
      return apiClient<UserProfile>("/users/me", { method: "GET" }, () => MOCK_USER_PROFILE);
    }
    const res = await apiClient<ApiResponse<any>>("/users/me", { method: "GET" });
    if (!res?.data) return MOCK_USER_PROFILE;
    const user = res.data;
    return {
      name: user.full_name || MOCK_USER_PROFILE.name,
      handle: "@" + (user.email ? user.email.split("@")[0] : "imperial_patron"),
      email: user.email || MOCK_USER_PROFILE.email,
      bio: "Patron of Mughal Arts & Miniature Historian",
      tier: user.role === "admin" ? "Imperial Court" : "Imperial Patron",
      creditsUsed: 14,
      creditsTotal: 100,
      avatar: user.avatar_url || undefined,
    };
  },

  async getUserCreations(): Promise<Artwork[]> {
    if (isMockApiEnabled()) {
      return apiClient<Artwork[]>("/artworks", { method: "GET" }, () => MOCK_ARTWORKS);
    }
    const res = await apiClient<ApiResponse<{ items: any[] }>>("/artworks?page=1&page_size=50", { method: "GET" });
    if (!res?.data?.items) return MOCK_ARTWORKS;
    return res.data.items.map((item, idx) => mapBackendArtwork(item, idx));
  },

  async getLikedArtworks(likedIds?: Set<number | string>): Promise<Artwork[]> {
    const defaultLiked = likedIds ?? new Set([1, 2, 3, 4, 5]);
    if (isMockApiEnabled()) {
      return apiClient<Artwork[]>("/profile/liked", { method: "GET" }, () =>
        MOCK_ARTWORKS.filter((a) => defaultLiked.has(a.id))
      );
    }
    const creations = await this.getUserCreations();
    return creations.filter((a) => defaultLiked.has(a.id) || (typeof a.id === "number" && a.id <= 5));
  },

  async getSavedArtworks(savedIds?: Set<number | string>): Promise<Artwork[]> {
    const defaultSaved = savedIds ?? new Set([2, 4]);
    if (isMockApiEnabled()) {
      return apiClient<Artwork[]>("/profile/saved", { method: "GET" }, () =>
        MOCK_ARTWORKS.filter((a) => defaultSaved.has(a.id))
      );
    }
    const creations = await this.getUserCreations();
    return creations.filter((a) => defaultSaved.has(a.id));
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    if (isMockApiEnabled()) {
      return apiClient<UserProfile>("/users/me", {
        method: "PATCH",
        body: JSON.stringify(data),
      }, () => ({ ...MOCK_USER_PROFILE, ...data }));
    }
    await apiClient<ApiResponse<any>>("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        full_name: data.name,
        avatar_url: data.avatar,
      }),
    });
    return this.getProfile();
  },
};

