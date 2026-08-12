import type React from "react";

export type Page =
  | "landing"
  | "login"
  | "dashboard"
  | "studio"
  | "gallery"
  | "viewer"
  | "collections"
  | "history"
  | "profile"
  | "settings"
  | "about"
  | "404";

export type Theme = "light" | "dark";

export type GenState = "idle" | "submitting" | "queued" | "processing" | "enhancing_prompt" | "generating" | "completed" | "failed";

export interface NavigationItem {
  id: string;
  label: string;
  Icon?: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  target?: Page;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
  onClick?: () => void;
}
