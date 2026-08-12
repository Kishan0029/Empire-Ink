import {
  apiClient,
  isMockApiEnabled,
  setTokens,
  clearTokens,
  getRefreshToken,
} from "../client";
import { MOCK_USER_PROFILE } from "../mock/mockData";
import type { UserProfile, ApiResponse } from "../types";

interface BackendTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface BackendUserResponse {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  role: string;
}

function mapBackendUserToProfile(user: BackendUserResponse): UserProfile {
  const handle = "@" + user.email.split("@")[0];
  return {
    name: user.full_name,
    handle,
    email: user.email,
    bio: "Patron of Mughal Arts & Miniature Historian",
    tier: user.role === "admin" ? "Imperial Court" : "Imperial Patron",
    creditsUsed: 14,
    creditsTotal: 100,
    avatar: user.avatar_url || undefined,
  };
}

export const authService = {
  async login(email: string, password?: string): Promise<UserProfile> {
    if (isMockApiEnabled()) {
      setTokens("mock-access-token", "mock-refresh-token");
      return apiClient<UserProfile>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email }),
      }, () => ({
        ...MOCK_USER_PROFILE,
        email,
      }));
    }

    const res = await apiClient<ApiResponse<BackendTokenResponse>>("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password: password || "imperial1605",
      }),
    });

    if (res?.data?.access_token) {
      setTokens(res.data.access_token, res.data.refresh_token);
    }

    return this.getCurrentUser();
  },

  async register(name: string, email: string, password?: string): Promise<UserProfile> {
    if (isMockApiEnabled()) {
      setTokens("mock-access-token", "mock-refresh-token");
      return apiClient<UserProfile>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email }),
      }, () => ({
        ...MOCK_USER_PROFILE,
        name,
        email,
      }));
    }

    const res = await apiClient<ApiResponse<BackendTokenResponse>>("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        full_name: name,
        email,
        password: password || "imperial1605",
      }),
    });

    if (res?.data?.access_token) {
      setTokens(res.data.access_token, res.data.refresh_token);
    }

    return this.getCurrentUser();
  },

  async getCurrentUser(): Promise<UserProfile> {
    if (isMockApiEnabled()) {
      return apiClient<UserProfile>("/users/me", {
        method: "GET",
      }, () => MOCK_USER_PROFILE);
    }

    const res = await apiClient<ApiResponse<BackendUserResponse>>("/users/me", {
      method: "GET",
    });

    if (!res?.data) {
      return MOCK_USER_PROFILE;
    }

    return mapBackendUserToProfile(res.data);
  },

  async logout(): Promise<{ success: boolean }> {
    if (isMockApiEnabled()) {
      clearTokens();
      return apiClient<{ success: boolean }>("/auth/logout", {
        method: "POST",
      }, () => ({ success: true }));
    }

    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) {
        await apiClient<ApiResponse<null>>("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      }
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      clearTokens();
    }
    return { success: true };
  },
};

