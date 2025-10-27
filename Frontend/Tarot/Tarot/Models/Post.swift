////  Post.swift
////  Tarot
////
////  Created by Xu Zihan on 7/12/25.
////
//
//import Foundation
//
//struct Post: Identifiable, Codable {
//    let id: UUID
//    let author: String
//    let authorAvatar: String
//    let title: String
//    let content: String
//    let timestamp: Date
//    var likes: Int
//    var comments: Int
//    var isLiked: Bool
//    let tags: [String]     // 新增：每个帖子带有的标签，可为空数组
//
//    // 格式化时间显示
//    var formattedTime: String {
//        let formatter = DateFormatter()
//        formatter.dateStyle = .short
//        formatter.timeStyle = .short
//        return formatter.string(from: timestamp)
//    }
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
//extension Post {
//    static let samplePosts: [Post] = [
//        Post(
//            id: UUID(),
//            author: "塔罗探索者",
//            authorAvatar: "avatar1",
//            title: "命运之轮的正位意义",
//            content: "今天抽到命运之轮正位，感觉人生要迎来重大转折。大家对这个牌有什么特别的解读吗？",
//            timestamp: Date().addingTimeInterval(-3600),
//            likes: 24,
//            comments: 8,
//            isLiked: false,
//            tags: ["每日运势", "命运之轮"]
//        ),
//        Post(
//            id: UUID(),
//            author: "星辰占卜师",
//            authorAvatar: "avatar2",
//            title: "月亮牌在感情问题中的含义",
//            content: "最近在感情问题上抽到月亮牌，感觉有些困惑。月亮牌通常代表隐藏的真相和潜意识，但在感情中具体意味着什么呢？",
//            timestamp: Date().addingTimeInterval(-7200),
//            likes: 32,
//            comments: 12,
//            isLiked: true,
//            tags: ["爱情占卜", "潜意识"]
//        ),
//        Post(
//            id: UUID(),
//            author: "神秘旅人",
//            authorAvatar: "avatar3",
//            title: "如何解读塔罗牌阵中的矛盾",
//            content: "在同一个牌阵中，正义牌和恶魔牌同时出现，这种矛盾该如何解读？是内在冲突还是外部环境的影响？",
//            timestamp: Date().addingTimeInterval(-10800),
//            likes: 18,
//            comments: 6,
//            isLiked: false,
//            tags: ["牌阵解析"]
//        ),
//        Post(
//            id: UUID(),
//            author: "智慧追寻者",
//            authorAvatar: "avatar4",
//            title: "塔罗牌与星座的关联",
//            content: "大家觉得塔罗牌和星座之间有怎样的关联？比如不同星座的人是否会对特定牌有更强的连接？",
//            timestamp: Date().addingTimeInterval(-14400),
//            likes: 45,
//            comments: 15,
//            isLiked: false,
//            tags: ["星座联结"]
//        ),
//        Post(
//            id: UUID(),
//            author: "灵魂向导",
//            authorAvatar: "avatar5",
//            title: "初学者如何选择第一副塔罗牌",
//            content: "作为塔罗初学者，应该选择传统韦特塔罗还是其他主题的牌？不同牌组对解读有什么影响？",
//            timestamp: Date().addingTimeInterval(-18000),
//            likes: 56,
//            comments: 22,
//            isLiked: true,
//            tags: []    // 无标签
//        ),
//        // 额外模拟帖，用于预览测试
//        Post(
//            id: UUID(),
//            author: "牌意解析师",
//            authorAvatar: "avatar9",
//            title: "宝剑十的逆位解读",
//            content: "宝剑十逆位意味着压力过大和重生的契机，大家怎么看？",
//            timestamp: Date().addingTimeInterval(-20000),
//            likes: 10,
//            comments: 3,
//            isLiked: false,
//            tags: ["塔罗教学", "牌意解析"]
//        ),
//        Post(
//            id: UUID(),
//            author: "感情占卜官",
//            authorAvatar: "avatar10",
//            title: "恋人牌在选择题中的作用",
//            content: "恋人牌总是让我在感情抉择上犹豫，你们有同样的体验吗？",
//            timestamp: Date().addingTimeInterval(-25000),
//            likes: 14,
//            comments: 5,
//            isLiked: false,
//            tags: ["爱情占卜"]
//        )
//    ]
//}
