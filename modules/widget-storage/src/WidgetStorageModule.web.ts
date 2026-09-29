import { NativeModule, registerWebModule } from "expo";

class WidgetStorageModule extends NativeModule<{}> {}

export default registerWebModule(WidgetStorageModule, "WidgetStorageModule");
