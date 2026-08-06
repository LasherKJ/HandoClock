import { NativeModule, requireNativeModule } from "expo";

declare class WidgetStorageModule extends NativeModule<{}> {
  save(config: string): Promise<void>;
  load(): Promise<string>;
  reloadWidget(): Promise<void>;
}

export default requireNativeModule<WidgetStorageModule>("WidgetStorage");
