//
//  NotificationsView.swift
//  Tarot
//
//  Created by ZihanXu on 7/23/25.
//

import SwiftUI

// MARK: - 通知模型
struct NotificationItem: Identifiable {
    let id: UUID
    let title: String
    let message: String
    let timestamp: Date
    var isRead: Bool
    
    // 相对时间显示
    var relativeTime: String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .short
        return formatter.localizedString(for: timestamp, relativeTo: Date())
    }
}

// 示例数据
extension NotificationItem {
    static let sampleData: [NotificationItem] = [
        NotificationItem(
            id: UUID(),
            title: "系统更新",
            message: "塔罗App 已升级到 2.1.0，新增每日签到功能。",
            timestamp: Date().addingTimeInterval(-300),
            isRead: false
        ),
        NotificationItem(
            id: UUID(),
            title: "新回复",
            message: "星辰占卜师 在 “月亮牌在感情问题中的含义” 中回复了你。",
            timestamp: Date().addingTimeInterval(-3600),
            isRead: false
        ),
        NotificationItem(
            id: UUID(),
            title: "活动提醒",
            message: "明天 19:00 “塔罗教学” 直播即将开始，别错过！",
            timestamp: Date().addingTimeInterval(-7200),
            isRead: true
        ),
        NotificationItem(
            id: UUID(),
            title: "系统",
            message: "您的密码已成功修改。",
            timestamp: Date().addingTimeInterval(-86400),
            isRead: true
        )
    ]
}

// MARK: - 通知列表页
struct NotificationsView: View {
    @State private var notifications: [NotificationItem] = NotificationItem.sampleData

    var body: some View {
        NavigationStack {
            ZStack {
                // 背景渐变
                LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.15, green: 0.05, blue: 0.25),
                        Color(red: 0.25, green: 0.1, blue: 0.4)
                    ]),
                    startPoint: .top,
                    endPoint: .bottom
                )
                .edgesIgnoringSafeArea(.all)

                VStack(spacing: 0) {
                    List {
                        ForEach(notifications.indices, id: \.self) { idx in
                            NavigationLink(destination: NotificationDetailView(item: $notifications[idx])) {
                                NotificationRowView(item: $notifications[idx])
                            }
                            .listRowBackground(Color.clear)
                        }
                    }
                    .listStyle(PlainListStyle())
                }
            }
            .navigationBarTitle("消息", displayMode: .inline)
        }
    }
}

// MARK: - 单条通知行
struct NotificationRowView: View {
    @Binding var item: NotificationItem

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            ZStack {
                Circle()
                    .fill(item.isRead ? Color.gray.opacity(0.6) : Color.purple)
                    .frame(width: 40, height: 40)
                Image(systemName: "bell.fill")
                    .foregroundColor(.white)
            }

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(item.title)
                        .font(.headline)
                        .fontWeight(item.isRead ? .regular : .bold)
                        .foregroundColor(.white)
                    Spacer()
                    Text(item.relativeTime)
                        .font(.caption)
                        .foregroundColor(.white.opacity(0.7))
                }
                Text(item.message)
                    .font(.body)
                    .foregroundColor(.white.opacity(0.9))
                    .lineLimit(2)
            }

            // 未读标记
            if !item.isRead {
                Circle()
                    .fill(Color.red)
                    .frame(width: 8, height: 8)
                    .padding(.top, 6)
            }
        }
        .padding(.vertical, 8)
    }
}

// MARK: - 详情页
struct NotificationDetailView: View {
    @Binding var item: NotificationItem

    var body: some View {
        VStack(spacing: 20) {
            Text(item.title)
                .font(.title2)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)

            ScrollView {
                Text(item.message)
                    .font(.body)
                    .padding()
            }

            Spacer()
        }
        .padding()
        .navigationTitle("详情")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            // 进入详情时标记为已读
            item.isRead = true
        }
    }
}

// MARK: - 预览
struct NotificationsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            NotificationsView()
        }
        .preferredColorScheme(.dark)
    }
}
