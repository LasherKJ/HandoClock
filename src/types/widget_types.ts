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
