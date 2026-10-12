import { useLocationStore } from "@/hooks/use-location-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import {
  loadWidget,
  reloadWidget,
  saveWidget,
} from "@/services/widget-storage";

export async function initializeWidgetConfig() {
  const widgetConfig = await loadWidget();
  if (widgetConfig?.locations) {
    let locations = null;
    locations = widgetConfig.locations;
    let currentLocationToggle: boolean | undefined;
    if (widgetConfig.showCurrentLocation !== undefined) {
      currentLocationToggle = widgetConfig.showCurrentLocation;
      if (widgetConfig.locations.length === 0 || !widgetConfig.locations) {
        currentLocationToggle = true;
      }
    }
    useLocationStore.setState({
      locations: locations,
      showCurrentLocation: currentLocationToggle,
    });
  }
  let themeTest = null;
  if (widgetConfig?.theme) {
    themeTest = widgetConfig.theme;
    useSettingsStore.setState({ theme: widgetConfig.theme });
  }
  const unsubscribeLocations = useLocationStore.subscribe(syncWidget);
  const unsubscribeConfig = useSettingsStore.subscribe(syncWidget);

  return () => {
    unsubscribeLocations();
    unsubscribeConfig();
  };
}

export async function syncWidget() {
  const locations = useLocationStore.getState().locations;
  const theme = useSettingsStore.getState().theme;
  const showCurrentLocation = useLocationStore.getState().showCurrentLocation;

  await saveWidget({
    version: 1,
    locations,
    theme: theme,
    showCurrentLocation,
  });

  await reloadWidget();
}
