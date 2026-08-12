import { apiClient } from "../client";
import { MOCK_USER_SETTINGS } from "../mock/mockData";
import type { UserSettings } from "../types";

export const settingsService = {
  async getSettings(): Promise<UserSettings> {
    return apiClient<UserSettings>("/settings", { method: "GET" }, () => MOCK_USER_SETTINGS);
  },

  async updateSettings(data: Partial<UserSettings>): Promise<UserSettings> {
    return apiClient<UserSettings>("/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    }, () => ({ ...MOCK_USER_SETTINGS, ...data }));
  },
};
