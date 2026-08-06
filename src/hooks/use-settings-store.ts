import { create } from "zustand";

export const useSettingsStore = create<{
  theme: "light" | "dark" | "automatic";
  setTheme: (theme: "light" | "dark" | "automatic") => void;
}>((set) => ({
  theme: "light",
  setTheme: (theme: "light" | "dark" | "automatic") => set({ theme }),
}));
