export type widgetConfig = {
  version: 1;
  theme: "light" | "dark" | "automatic";
  locations: location[];
  showCurrentLocation: boolean;
};

export type location = {
  id: string;
  name: string;
  timeZone?: string;
  color?: string;
  enabled?: boolean;
};

export type widgetStore = {
  locations: location[];
  theme: "light" | "dark";
  showCurrentLocation: boolean;
  setLocations: (locations: location[]) => void;
  setTheme: (theme: "light" | "dark") => void;
  setShowCurrentLocation: (show: boolean) => void;
};
