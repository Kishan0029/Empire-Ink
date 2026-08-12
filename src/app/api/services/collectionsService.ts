import { apiClient } from "../client";
import { MOCK_COLLECTIONS } from "../mock/mockData";
import type { Collection } from "../types";

export const collectionsService = {
  async getCollections(): Promise<Collection[]> {
    return apiClient<Collection[]>("/collections", { method: "GET" }, () => MOCK_COLLECTIONS);
  },

  async getCollectionById(id: string): Promise<Collection | undefined> {
    return apiClient<Collection | undefined>(`/collections/${encodeURIComponent(id)}`, { method: "GET" }, () =>
      MOCK_COLLECTIONS.find((c) => c.id === id)
    );
  },

  async createCollection(title: string, description = ""): Promise<Collection> {
    return apiClient<Collection>("/collections", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    }, () => ({
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      era: "Jahangir",
      count: 0,
      description,
      cover: MOCK_COLLECTIONS[0]?.cover || "",
      artworks: [],
    }));
  },
};
