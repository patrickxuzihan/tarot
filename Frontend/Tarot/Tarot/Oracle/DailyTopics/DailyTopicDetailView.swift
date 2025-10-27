//
//  DailyTopicDetailView.swift
//  Tarot
//
//  Created by Xu Zihan on 10/27/25.
//  每日话题详情页 - 占位符

import SwiftUI

struct DailyTopicDetailView: View {
    // MARK: - 参数
    let topic: DailyTopic
    
    // MARK: - Body
    var body: some View {
        ZStack {
            // 深紫色渐变背景
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.1, blue: 0.4)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)
            
            ScrollView {
                VStack(spacing: 25) {
                    // 顶部图标区域
                    topIconSection
                    
                    // 话题信息卡片
                    topicInfoCard
                    
                    // 占位符内容
                    placeholderContent
                    
                    Spacer().frame(height: 30)
                }
                .padding(.horizontal, 20)
                .padding(.top, 20)
            }
        }
        .navigationBarTitle("话题详情", displayMode: .inline)
    }
    
    // MARK: - 顶部图标区域
    private var topIconSection: some View {
        VStack(spacing: 15) {
            // 大图标
            Image(systemName: topic.symbolName)
                .font(.system(size: 60))
                .foregroundColor(.white)
                .padding(25)
                .background(
                    Circle()
                        .fill(topic.color)
                        .shadow(color: topic.color.opacity(0.6), radius: 15, x: 0, y: 5)
                )
            
            // 话题标题
            Text(topic.title)
                .font(.title)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .multilineTextAlignment(.center)
            
            // 发布时间
            Text("发布于 \(topic.daysAgo) 天前")
                .font(.subheadline)
                .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
        }
    }
    
    // MARK: - 话题信息卡片
    private var topicInfoCard: some View {
        VStack(alignment: .leading, spacing: 15) {
            // 描述标题
            HStack {
                Image(systemName: "text.alignleft")
                    .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                Text("话题描述")
                    .font(.headline)
                    .foregroundColor(.white)
            }
            
            // 描述内容
            Text(topic.description)
                .font(.body)
                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                .lineSpacing(5)
        }
        .padding(20)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 15)
                .fill(Color(red: 0.2, green: 0.12, blue: 0.35))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 15)
                .stroke(topic.color.opacity(0.3), lineWidth: 1)
        )
    }
    
    // MARK: - 占位符内容
    private var placeholderContent: some View {
        VStack(spacing: 20) {
            // 占位符标题
            Text("📝 内容开发中")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .padding(.top, 20)
            
            // 占位符说明
            VStack(alignment: .leading, spacing: 12) {
                placeholderItem(icon: "bubble.left.and.bubble.right.fill", text: "话题讨论区")
                placeholderItem(icon: "heart.fill", text: "点赞与收藏")
                placeholderItem(icon: "person.3.fill", text: "参与用户列表")
                placeholderItem(icon: "chart.bar.fill", text: "话题热度统计")
                placeholderItem(icon: "sparkles", text: "塔罗牌解读内容")
            }
            .padding(20)
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 15)
                    .fill(Color(red: 0.18, green: 0.1, blue: 0.3))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 15)
                    .stroke(Color.purple.opacity(0.3), lineWidth: 1)
            )
            
            // 提示信息
            Text("后续将在此页面展示完整的话题内容和互动功能")
                .font(.caption)
                .foregroundColor(Color(red: 0.7, green: 0.6, blue: 0.9))
                .multilineTextAlignment(.center)
                .padding(.top, 10)
        }
    }
    
    // MARK: - 占位符项目
    private func placeholderItem(icon: String, text: String) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 18))
                .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                .frame(width: 30)
            
            Text(text)
                .font(.body)
                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .font(.system(size: 14))
                .foregroundColor(Color(red: 0.6, green: 0.5, blue: 0.8))
        }
    }
}

// MARK: - Preview
struct DailyTopicDetailView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            DailyTopicDetailView(
                topic: DailyTopic(
                    id: 1,
                    title: "塔罗话题 #1",
                    description: "探索塔罗牌的深层含义与智慧，了解如何通过塔罗解读生活中的困惑与挑战。",
                    daysAgo: 1,
                    symbolName: "star.fill",
                    color: Color(red: 0.6, green: 0.3, blue: 0.8)
                )
            )
        }
        .preferredColorScheme(.dark)
    }
}
