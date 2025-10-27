////
////  Comment.swift
////  Tarot
////
////  Created by Xu Zihan on 7/22/25.
////
//
//import Foundation
//
//struct Comment: Identifiable, Codable {
//    let id: UUID
//    let author: String
//    let authorAvatar: String
//    let content: String
//    let timestamp: Date
//    var likes: Int
//
//    // 相对时间显示
//    var relativeTime: String {
//        let formatter = RelativeDateTimeFormatter()
//        formatter.unitsStyle = .short
//        return formatter.localizedString(for: timestamp, relativeTo: Date())
//    }
//}
//
//// 示例数据
//extension Comment {
//    static let sampleComments: [Comment] = [
//        Comment(
//            id: UUID(),
//            author: "塔罗爱好者",
//            authorAvatar: "avatar6",
//            content: "命运之轮正位通常代表命运的改变和新的机遇，可能是你人生中的一个重要转折点。",
//            timestamp: Date().addingTimeInterval(-1800),
//            likes: 5
//        ),
//        Comment(
//            id: UUID(),
//            author: "神秘学者",
//            authorAvatar: "avatar7",
//            content: "我觉得命运之轮提醒你要顺应变化，抓住机会，不要抗拒改变。",
//            timestamp: Date().addingTimeInterval(-3600),
//            likes: 3
//        ),
//        Comment(
//            id: UUID(),
//            author: "星空占卜师",
//            authorAvatar: "avatar8",
//            content: "结合你抽牌时的具体问题，命运之轮可能有更具体的含义。能分享更多背景吗？",
//            timestamp: Date().addingTimeInterval(-5400),
//            likes: 8
//        )
//    ]
//}
