//
//  DailyTopicsSectionView.swift
//  Tarot
//
//  Created by Xu Zihan on 6/28/25.
//  重构：支持显示指定数量的话题卡片，可跳转到详情页

import SwiftUI

/// 每日塔罗话题组件 - 支持显示最新的N个话题
struct DailyTopicsSectionView: View {
    // MARK: - 参数
    /// 显示的话题数量（默认6个用于主页预览，可传入30显示全部）
    let displayCount: Int
    /// 是否显示标题栏（包含"查看全部"按钮）
    let showHeader: Bool
    /// "查看全部"的目标页面
    let showAllDestination: (() -> AnyView)?
    
    // MARK: - 初始化
    init(
        displayCount: Int = 6,
        showHeader: Bool = true,
        showAllDestination: (() -> AnyView)? = nil
    ) {
        self.displayCount = displayCount
        self.showHeader = showHeader
        self.showAllDestination = showAllDestination
    }
    
    // MARK: - 数据模拟
    /// 模拟30天的话题数据（后续接入后端）
    private var allTopics: [DailyTopic] {
        (1...30).map { index in
            DailyTopic(
                id: index,
                title: "塔罗话题 #\(index)",
                description: "探索塔罗牌的深层含义与智慧",
                daysAgo: index,
                symbolName: symbolNames[(index - 1) % symbolNames.count],
                color: cardColors[(index - 1) % cardColors.count]
            )
        }
    }
    
    /// 根据displayCount获取要显示的话题
    private var displayedTopics: [DailyTopic] {
        Array(allTopics.prefix(displayCount))
    }
    
    // MARK: - 视觉配置
    private let cardColors: [Color] = [
        Color(red: 0.6, green: 0.3, blue: 0.8),
        Color(red: 0.5, green: 0.2, blue: 0.7),
        Color(red: 0.4, green: 0.1, blue: 0.6),
        Color(red: 0.7, green: 0.4, blue: 0.9),
        Color(red: 0.55, green: 0.25, blue: 0.75),
        Color(red: 0.65, green: 0.35, blue: 0.85)
    ]
    
    private let symbolNames = [
        "heart.fill",
        "star.fill",
        "moon.fill",
        "sun.max.fill",
        "sparkles",
        "flame.fill"
    ]
    
    // MARK: - Body
    var body: some View {
        VStack(spacing: 15) {
            // 标题栏（可选）
            if showHeader {
                headerView
            }
            
            // 话题网格
            LazyVGrid(
                columns: [GridItem(.flexible(), spacing: 15), GridItem(.flexible())],
                spacing: 15
            ) {
                ForEach(displayedTopics) { topic in
                    topicCard(topic: topic)
                }
            }
        }
        .padding(.horizontal, showHeader ? 0 : 20)
    }
    
    // MARK: - 标题栏
    private var headerView: some View {
        HStack {
            Text("每日塔罗话题")
                .font(.title3)
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            Spacer()
            
            if let destination = showAllDestination {
                NavigationLink(destination: destination()) {
                    Text("查看全部")
                        .font(.subheadline)
                        .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                }
            }
        }
        .padding(.horizontal, 5)
    }
    
    // MARK: - 话题卡片（带跳转）
    private func topicCard(topic: DailyTopic) -> some View {
        NavigationLink(destination: DailyTopicDetailView(topic: topic)) {
            VStack(alignment: .leading, spacing: 8) {
                // 顶部：图标 + 时间
                HStack {
                    Image(systemName: topic.symbolName)
                        .font(.system(size: 20))
                        .foregroundColor(.white)
                        .padding(8)
                        .background(Circle().fill(Color.white.opacity(0.2)))
                    
                    Spacer()
                    
                    Text("\(topic.daysAgo)天前")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.7))
                }
                
                // 标题
                Text(topic.title)
                    .font(.headline)
                    .fontWeight(.medium)
                    .foregroundColor(.white)
                    .padding(.top, 5)
                
                // 描述
                Text(topic.description)
                    .font(.caption)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .lineLimit(2)
                    .padding(.top, 2)
            }
            .padding(15)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                RoundedRectangle(cornerRadius: 15)
                    .fill(topic.color)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 15)
                    .stroke(Color.white.opacity(0.2), lineWidth: 1)
            )
        }
        .buttonStyle(PlainButtonStyle()) // 保持卡片样式
    }
}

// MARK: - 数据模型
struct DailyTopic: Identifiable {
    let id: Int
    let title: String
    let description: String
    let daysAgo: Int
    let symbolName: String
    let color: Color
}

// MARK: - Preview
struct DailyTopicsSectionView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            ZStack {
                Color.black.edgesIgnoringSafeArea(.all)
                
                VStack(spacing: 40) {
                    // 预览1：主页模式（6个话题，带标题）
                    DailyTopicsSectionView(
                        displayCount: 6,
                        showHeader: true,
                        showAllDestination: { AnyView(Text("完整页面")) }
                    )
                    .padding(.horizontal, 20)
                    
                    Divider().background(Color.white)
                    
                    // 预览2：完整模式（30个话题，不带标题）
                    ScrollView {
                        DailyTopicsSectionView(
                            displayCount: 30,
                            showHeader: false
                        )
                    }
                }
            }
        }
        .preferredColorScheme(.dark)
    }
}
