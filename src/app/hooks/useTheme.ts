import { useState, useEffect, useCallback } from "react";
import type { Theme } from "../types";

export function useTheme(defaultTheme: Theme = "light") {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggleTheme, setTheme };
}
