/**
 * Base HTTP client for Empire & Ink API.
 * Designed for clean integration with a FastAPI backend.
 * Uses VITE_API_BASE_URL when connecting to a real FastAPI server.
 * Defaults to mock mode for local development and demonstration when VITE_USE_MOCK_API is true.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

const ACCESS_TOKEN_KEY = "empire_ink_access_token";
const REFRESH_TOKEN_KEY = "empire_ink_refresh_token";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken?: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
  mockResponse?: () => Promise<T> | T
): Promise<T> {
  if (USE_MOCK_API && mockResponse) {
    return Promise.resolve(mockResponse());
  }

  const token = getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearTokens();
    window.dispatchEvent(new CustomEvent("empire_ink:unauthorized"));
  }

  if (!response.ok) {
    let errorMsg = `API Request Failed [${response.status}]: ${response.statusText}`;
    try {
      const errBody = await response.json();
      if (errBody?.detail) {
        errorMsg = typeof errBody.detail === "string" ? errBody.detail : JSON.stringify(errBody.detail);
      } else if (errBody?.message) {
        errorMsg = errBody.message;
      }
    } catch {
      // ignore JSON parse error
    }
    throw new Error(errorMsg);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export function isMockApiEnabled(): boolean {
  return USE_MOCK_API;
}

