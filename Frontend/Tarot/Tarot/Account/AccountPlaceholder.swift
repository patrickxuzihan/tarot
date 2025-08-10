//
//  AccountPlaceholder.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

import SwiftUI

struct FollowersView: View {
    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.1, green: 0.05, blue: 0.2),
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.2, green: 0.1, blue: 0.35)
                ]),
                startPoint: .top, endPoint: .bottom
            ).ignoresSafeArea()
            Text("关注列表 · 开发中")
                .foregroundColor(.white)
                .font(.headline)
        }
        .navigationTitle("关注")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct MembershipPlaceholderView: View {
    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.1, green: 0.05, blue: 0.2),
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.2, green: 0.1, blue: 0.35)
                ]),
                startPoint: .top, endPoint: .bottom
            ).ignoresSafeArea()
            Text("会员中心 · 开发中")
                .foregroundColor(.white)
                .font(.headline)
        }
        .navigationTitle("会员")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct DailySignView: View {
    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.1, green: 0.05, blue: 0.2),
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.2, green: 0.1, blue: 0.35)
                ]),
                startPoint: .top, endPoint: .bottom
            ).ignoresSafeArea()
            Text("日签 · 开发中")
                .foregroundColor(.white)
                .font(.headline)
        }
        .navigationTitle("日签")
        .navigationBarTitleDisplayMode(.inline)
    }
}
