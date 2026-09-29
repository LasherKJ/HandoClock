import { widgetConfig } from "@/types/widget_types";
import WidgetStorageModule from "../../modules/widget-storage/WidgetStorageModule";

export async function saveWidget(config: widgetConfig) {
  await WidgetStorageModule?.save(JSON.stringify(config));
}

export async function loadWidget(): Promise<widgetConfig | null> {
  const json = await WidgetStorageModule.load();
  if (!json) {
    return null;
  }
  return JSON.parse(json);
}

export async function reloadWidget() {
  await WidgetStorageModule.reloadWidget();
}
