//
//  PrivateDivinationView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

import SwiftUI

/// 占位页：私人定制（正在施工）
struct PrivateDivinationView: View {
    private let themeTop    = Color(red: 0.15, green: 0.05, blue: 0.25)
    private let themeBottom = Color(red: 0.25, green: 0.10, blue: 0.40)
    private let accent      = Color(red: 0.5,  green: 0.2,  blue: 0.7)

    var body: some View {
        ZStack {
            // 背景沿用主界面风格
            LinearGradient(
                gradient: Gradient(colors: [themeTop, themeBottom]),
                startPoint: .top, endPoint: .bottom
            )
            .ignoresSafeArea()

            // 复用你的静态星空
            StaticStarsView()

            ScrollView {
                VStack(spacing: 22) {
                    // 顶部装饰条
                    Color.clear
                        .frame(height: 10)
                        .overlay(
                            RoundedRectangle(cornerRadius: 2)
                                .frame(width: 60, height: 4)
                                .foregroundColor(accent)
                                .opacity(0.6)
                        )
                        .padding(.top, 8)

                    // 头部信息
                    VStack(spacing: 10) {
                        Image(systemName: "person.fill.viewfinder")
                            .font(.system(size: 44, weight: .semibold))
                            .foregroundColor(.white)
                            .padding(16)
                            .background(Circle().fill(accent.opacity(0.35)))

                        Text("私人定制 · 敬请期待")
                            .font(.title2.bold())
                            .foregroundColor(.white)

                        Text("我们正在打磨你的专属占卜体验。欢迎先使用下方功能草案，正式版上线后将自动替换。")
                            .font(.callout)
                            .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 18)

                        ProgressView()
                            .progressViewStyle(.circular)
                            .tint(accent)
                    }

                    // 占位功能块（骨架屏）
                    VStack(spacing: 14) {
                        placeholderRow(title: "个人意图设定")
                        placeholderRow(title: "情绪能量曲线")
                        placeholderRow(title: "专属牌阵建议")
                        placeholderRow(title: "语音引导占卜")
                    }
                    .redacted(reason: .placeholder) // iOS 15+ 骨架样式
                    .padding(.horizontal, 18)

                    // 提示卡
                    VStack(alignment: .leading, spacing: 8) {
                        Text("温馨提示")
                            .font(.headline)
                            .foregroundColor(.white)
                        Text("如果你已有想法（需要哪些字段、交互或结果展示），可以告诉我，我会基于这些占位模块直接搭建数据模型与界面。")
                            .font(.caption)
                            .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .padding(16)
                    .background(
                        RoundedRectangle(cornerRadius: 18)
                            .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 18)
                            .stroke(accent.opacity(0.25), lineWidth: 1)
                    )
                    .padding(.horizontal, 18)

                    Spacer(minLength: 30)
                }
            }
        }
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .principal) {
                VStack(spacing: 4) {
                    Text("私人定制")
                        .font(.system(size: 28, weight: .bold, design: .rounded))
                        .foregroundColor(.white)
                        .shadow(color: accent, radius: 4, x: 0, y: 2)

                    Text("专属占卜 · 施工中")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                        .opacity(0.9)
                }
            }
        }
    }

    // 单行占位模块
    private func placeholderRow(title: String) -> some View {
        HStack(spacing: 12) {
            Image(systemName: "sparkles")
                .font(.title3)
                .foregroundColor(.white)
                .padding(10)
                .background(Circle().fill(accent.opacity(0.6)))

            VStack(alignment: .leading, spacing: 6) {
                Text(title)
                    .font(.headline)
                    .foregroundColor(.white)
                RoundedRectangle(cornerRadius: 6)
                    .fill(Color.white.opacity(0.12))
                    .frame(height: 12)
                RoundedRectangle(cornerRadius: 6)
                    .fill(Color.white.opacity(0.10))
                    .frame(height: 12)
                    .frame(maxWidth: 180, alignment: .leading)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .foregroundColor(.white.opacity(0.6))
        }
        .padding(15)
        .background(
            RoundedRectangle(cornerRadius: 18)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 18)
                .stroke(accent.opacity(0.25), lineWidth: 1)
        )
    }
}
