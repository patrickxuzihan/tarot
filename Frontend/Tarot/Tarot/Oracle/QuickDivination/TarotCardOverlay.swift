//
//  TarotCardOverlay.swift
//  Tarot
//
//  Created by Xu Zihan on 10/28/25.
//  修复版 - 悬浮窗只占顶部小区域

import SwiftUI

/// 塔罗牌展示悬浮窗 - 紧凑设计
struct TarotCardOverlay: View {
    // MARK: - 参数
    let cards: [TarotCardData]
    let onDismiss: () -> Void
    
    // MARK: - 状态
    @State private var appeared = false
    @State private var showCloseButton = false
    
    var body: some View {
        // 🔥 关键修复：使用 VStack(alignment: .center, spacing: 0) 并移除 Spacer
        VStack(alignment: .center, spacing: 0) {
            // 悬浮窗内容
            overlayContent
                .onTapGesture {
                    withAnimation(.spring(response: 0.3)) {
                        showCloseButton.toggle()
                    }
                }
            
            // 🔥 不要添加 Spacer()，让悬浮窗只占用需要的空间
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)  // 对齐到顶部
        .onAppear {
            withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                appeared = true
            }
        }
    }
    
    // MARK: - 悬浮窗主内容
    private var overlayContent: some View {
        ZStack(alignment: .topTrailing) {
            // 主体内容
            VStack(spacing: 12) {
                // 3张塔罗牌横向排列
                HStack(spacing: 12) {
                    ForEach(Array(cards.prefix(3).enumerated()), id: \.element.id) { index, card in
                        tarotCardView(card: card, index: index)
                            .transition(.scale.combined(with: .opacity))
                            .animation(
                                .spring(response: 0.5, dampingFraction: 0.75)
                                .delay(Double(index) * 0.1),
                                value: appeared
                            )
                    }
                }
                .padding(.horizontal, 20)
                .padding(.vertical, 15)
            }
            .background(
                // 深紫色渐变背景
                RoundedRectangle(cornerRadius: 20)
                    .fill(
                        LinearGradient(
                            gradient: Gradient(colors: [
                                Color(red: 0.2, green: 0.1, blue: 0.35),
                                Color(red: 0.25, green: 0.12, blue: 0.4)
                            ]),
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .shadow(color: Color.purple.opacity(0.4), radius: 15, y: 8)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 20)
                    .stroke(
                        LinearGradient(
                            colors: [
                                Color.purple.opacity(0.5),
                                Color.purple.opacity(0.2)
                            ],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        ),
                        lineWidth: 1.5
                    )
            )
            
            // 关闭按钮
            if showCloseButton {
                closeButton
                    .transition(.scale.combined(with: .opacity))
            }
        }
        .padding(.horizontal, 20)
        .padding(.top, 20)
        .scaleEffect(appeared ? 1 : 0.95)
        .opacity(appeared ? 1 : 0)
    }
    
    // MARK: - 关闭按钮
    private var closeButton: some View {
        Button(action: {
            withAnimation(.spring(response: 0.3)) {
                onDismiss()
            }
        }) {
            Image(systemName: "xmark.circle.fill")
                .font(.system(size: 26))
                .foregroundColor(.white)
                .background(
                    Circle()
                        .fill(Color(red: 0.5, green: 0.2, blue: 0.7))
                        .frame(width: 28, height: 28)
                )
                .shadow(color: Color.black.opacity(0.3), radius: 4, y: 2)
        }
        .padding(12)
    }
    
    // MARK: - 单张塔罗牌
    private func tarotCardView(card: TarotCardData, index: Int) -> some View {
        ZStack {
            // 卡片背景
            RoundedRectangle(cornerRadius: 12)
                .fill(
                    LinearGradient(
                        colors: [
                            card.color,
                            card.color.opacity(0.8)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .aspectRatio(0.65, contentMode: .fit)
                .shadow(color: card.color.opacity(0.4), radius: 8, y: 4)
            
            // 卡片内容
            VStack(spacing: 6) {
                // 图标
                Image(systemName: card.symbolName)
                    .font(.system(size: 32))
                    .foregroundColor(.white)
                
                // 牌名
                Text(card.name)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                
                // 正逆位标识
                Text(card.isReversed ? "逆" : "正")
                    .font(.system(size: 10))
                    .fontWeight(.bold)
                    .foregroundColor(.white.opacity(0.9))
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(
                        Capsule()
                            .fill(Color.white.opacity(0.25))
                    )
            }
            
            // 边框
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.white.opacity(0.3), lineWidth: 1)
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - 塔罗牌数据模型
struct TarotCardData: Identifiable {
    let id = UUID()
    let name: String
    let symbolName: String
    let isReversed: Bool
    let color: Color
    
    // 预设塔罗牌数据
    static let allCards: [TarotCardData] = [
        TarotCardData(name: "愚者", symbolName: "figure.walk", isReversed: false, color: Color(red: 0.6, green: 0.3, blue: 0.8)),
        TarotCardData(name: "魔术师", symbolName: "wand.and.stars", isReversed: false, color: Color(red: 0.5, green: 0.2, blue: 0.7)),
        TarotCardData(name: "女祭司", symbolName: "moon.stars.fill", isReversed: true, color: Color(red: 0.4, green: 0.1, blue: 0.6)),
        TarotCardData(name: "皇后", symbolName: "crown.fill", isReversed: false, color: Color(red: 0.7, green: 0.4, blue: 0.9)),
        TarotCardData(name: "皇帝", symbolName: "shield.fill", isReversed: false, color: Color(red: 0.55, green: 0.25, blue: 0.75)),
        TarotCardData(name: "教皇", symbolName: "book.fill", isReversed: true, color: Color(red: 0.65, green: 0.35, blue: 0.85)),
        TarotCardData(name: "恋人", symbolName: "heart.fill", isReversed: false, color: Color(red: 0.6, green: 0.3, blue: 0.8)),
        TarotCardData(name: "战车", symbolName: "car.fill", isReversed: false, color: Color(red: 0.5, green: 0.2, blue: 0.7)),
        TarotCardData(name: "力量", symbolName: "bolt.heart.fill", isReversed: false, color: Color(red: 0.4, green: 0.1, blue: 0.6)),
        TarotCardData(name: "隐者", symbolName: "moon.fill", isReversed: true, color: Color(red: 0.7, green: 0.4, blue: 0.9))
    ]
    
    // 随机抽取3张牌
    static func randomCards() -> [TarotCardData] {
        Array(allCards.shuffled().prefix(3))
    }
}

// MARK: - Preview
struct TarotCardOverlay_Previews: PreviewProvider {
    static var previews: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.1, blue: 0.4)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)
            
            VStack {
                Text("点击悬浮窗显示/隐藏关闭按钮")
                    .foregroundColor(.white)
                    .padding(.top, 200)
                Spacer()
            }
            
            TarotCardOverlayDemo()
        }
        .preferredColorScheme(.dark)
    }
}

// Demo 组件
struct TarotCardOverlayDemo: View {
    @State private var showOverlay = true
    
    var body: some View {
        ZStack {
            if showOverlay {
                TarotCardOverlay(
                    cards: TarotCardData.randomCards(),
                    onDismiss: {
                        withAnimation(.spring(response: 0.3)) {
                            showOverlay = false
                        }
                    }
                )
            }
            
            VStack {
                Spacer()
                
                if !showOverlay {
                    Button("重新显示悬浮窗") {
                        withAnimation(.spring(response: 0.4)) {
                            showOverlay = true
                        }
                    }
                    .padding()
                    .background(Color.purple)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .padding(.bottom, 50)
                }
            }
        }
    }
}
