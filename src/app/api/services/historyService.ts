import { apiClient } from "../client";
import { MOCK_HISTORY } from "../mock/mockData";
import type { HistoryItem } from "../types";

export const historyService = {
  async getHistory(): Promise<HistoryItem[]> {
    return apiClient<HistoryItem[]>("/history", { method: "GET" }, () => MOCK_HISTORY);
  },

  async deleteHistoryItem(id: number): Promise<{ success: boolean }> {
    return apiClient<{ success: boolean }>(`/history/${id}`, {
      method: "DELETE",
    }, () => ({ success: true }));
  },

  async clearHistory(): Promise<{ success: boolean }> {
    return apiClient<{ success: boolean }>("/history", {
      method: "DELETE",
    }, () => ({ success: true }));
  },
};
