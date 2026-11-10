//
//  ClockWidgetBundle.swift
//  ClockWidget
//
//  Created by Kevin Lasher on 11/10/26.
//

import WidgetKit
import SwiftUI

@main
struct ClockWidgetBundle: WidgetBundle {
    var body: some Widget {
        ClockWidget()
        ClockWidgetControl()
        ClockWidgetLiveActivity()
    }
}
