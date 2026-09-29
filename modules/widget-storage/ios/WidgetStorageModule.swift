import ExpoModulesCore
import WidgetKit

public class WidgetStorageModule: Module {
  public func definition() -> ModuleDefinition {
    Name("WidgetStorage")

    AsyncFunction("save") { (config: String) in
      let defaults = UserDefaults(
        suiteName: "group.com.yourcompany.yourapp"
      )

      defaults?.set(config, forKey: "widgetConfig")
    }

    AsyncFunction("load") {
      let defaults = UserDefaults(
        suiteName: "group.com.yourcompany.yourapp"
      )

      return defaults?.string(forKey: "widgetConfig") ?? ""
    }

    AsyncFunction("reloadWidget") {
      WidgetCenter.shared.reloadAllTimelines()
    }
  }
}