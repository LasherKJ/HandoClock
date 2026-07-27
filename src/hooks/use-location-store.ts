import { create } from "zustand";

type locationObject = {
  id: string;
  name: string;
  timeZone: string;
  color: string;
  enabled?: boolean;
};

export const useLocationStore = create<{
  showCurrentLocation: boolean;
  locations: locationObject[];
  addLocation: (location: locationObject) => void;
  removeLocation: (id: string) => void;
  toggleShowCurrentLocation: () => void;
}>((set) => ({
  showCurrentLocation: true,
  locations: [] as locationObject[],
  addLocation: (location: locationObject) =>
    set((state) => ({
      locations: [...state.locations, location],
    })),
  removeLocation: (id: string) =>
    set((state) => ({
      locations: state.locations.filter((location) => location.id !== id),
    })),
  toggleShowCurrentLocation: () =>
    set((state) => ({
      showCurrentLocation: !state.showCurrentLocation,
    })),
}));
