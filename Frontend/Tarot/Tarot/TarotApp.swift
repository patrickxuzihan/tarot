//
//  TarotApp.swift
//  Tarot
//
//  Created by Xu Zihan on 6/16/25.
//

import SwiftUI

@main
struct TarotApp: App {
    // 新增：全局主题管理器
    @StateObject private var themeManager = ThemeManager()

    @State private var showRegistrationView = false
    @State private var showVerificationView = false
    @State private var isLoggedIn = false

    var body: some Scene {
        WindowGroup {
            Group {
                if isLoggedIn {
                    HomeView()
                } else {
                    LoginView(
                        showVerificationView: $showVerificationView,
                        showRegistrationView: $showRegistrationView,
                        isLoggedIn: $isLoggedIn
                    )
                }
            }
            // 注入主题到全局环境
            .environmentObject(themeManager)
            // 使用当前主题的外观（现在两套都是 .dark，后续可支持 .light）
            .preferredColorScheme(themeManager.selected.colorScheme)
        }
    }
}
