//
//  TarotApp.swift
//  Tarot
//
//  Created by Xu Zihan on 6/16/25.
//

import SwiftUI

@main
struct TarotApp: App {
    @State private var showRegistrationView = false
    @State private var showVerificationView = false
    @State private var isLoggedIn = false

    var body: some Scene {
        WindowGroup {
            if isLoggedIn {
                HomeView()          // 主界面
            } else {
                LoginView(
                    showVerificationView: $showVerificationView,
                    showRegistrationView: $showRegistrationView,
                    isLoggedIn: $isLoggedIn
                )
                .preferredColorScheme(.dark)
            }
        }
    }
}
