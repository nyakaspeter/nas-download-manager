import type { ThemeMode } from "./state";

export function applyTheme(mode: ThemeMode) {
  const html = document.documentElement;
  html.classList.remove("theme-light", "theme-dark", "theme-auto");
  html.classList.add(`theme-${mode}`);
}
