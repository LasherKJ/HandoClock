export type widgetConfig = {
  version: 1;
  theme: "light" | "dark" | "automatic";
  locations: location[];
};

export type location = {
  id: string;
  name: string;
  timeZone: string;
  color: string;
  enabled?: boolean;
};

export type widgetStore = {
  locations: location[];
  theme: "light" | "dark";

  setLocations: (locations: location[]) => void;
  setTheme: (theme: "light" | "dark") => void;
};
