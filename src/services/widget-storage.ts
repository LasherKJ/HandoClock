import WidgetStorageModule from "../../modules/widget-storage/WidgetStorageModule";

export async function saveWidgetConfig(config: string) {
  console.log("WidgetStorageModule:", WidgetStorageModule);
  console.log("save:", WidgetStorageModule?.save);
}

export async function loadWidgetConfig() {
  return WidgetStorageModule.load();
}
