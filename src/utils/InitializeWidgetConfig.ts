import { useLocationStore } from "@/hooks/use-location-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import {
  loadWidget,
  reloadWidget,
  saveWidget,
} from "@/services/widget-storage";

export async function initializeWidgetConfig() {
  const widgetConfig = await loadWidget();
  if (!widgetConfig) {
    return null;
  }
  let locTest = null;
  if (widgetConfig.locations) {
    locTest = widgetConfig.locations;
    useLocationStore.setState({ locations: widgetConfig.locations });
    if (widgetConfig.showCurrentLocation !== undefined) {
      useLocationStore.setState({
        showCurrentLocation: widgetConfig.showCurrentLocation,
      });
    }
  }
  let themeTest = null;
  if (widgetConfig.theme) {
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
