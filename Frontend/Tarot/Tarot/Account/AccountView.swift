// AccountView.swift
import SwiftUI

struct AccountView: View {
    @Environment(\.dismiss) var dismiss
    @State private var isNotificationEnabled = true
    @State private var showLogoutConfirmation = false
    @State private var showAvatarActionSheet = false
    @State private var showPromoBanner = true
    
    // 用户数据
    @State private var user = User(
        name: "神秘塔罗师",
        email: "tarotmaster@example.com",
        id: "UID-12345",
        joinDate: Date().addingTimeInterval(-86400 * 180),
        horoscope: .libra,
        followers: 243,
        following: 19,
        level: 5,
        hasNewMedal: true
    )
    
    // 导航项数据
    private let navItems = [
        AccountNavItem(title: "收藏", icon: "heart.fill", count: 128),
        AccountNavItem(title: "下载", icon: "arrow.down.circle.fill", count: 42),
        AccountNavItem(title: "订阅", icon: "bell.fill", count: 8),
        AccountNavItem(title: "客制化", icon: "wand.and.stars", count: 3)
    ]
    
    var body: some View {
        ZStack {
            // 背景渐变
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.1, green: 0.05, blue: 0.2),
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.2, green: 0.1, blue: 0.35)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)
            
            ScrollView(showsIndicators: false) {
                VStack(spacing: 25) {
                    // 个人资料卡片
                    profileCard
                    
                    // 四个功能导航区
                    contentNavigationSection
                    
                    // 退出登录按钮
                    logoutButton
                    
                    Spacer().frame(height: 30)
                }
                .padding(.horizontal, 20)
            }
        }
        .navigationTitle("账号中心")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            // 右上角设置按钮
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink(destination: SettingsView()) {
                    Image(systemName: "gearshape")
                        .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                }
            }
        }
    }
    
    // MARK: - 个人资料卡片
    private var profileCard: some View {
        VStack(spacing: 0) {
            // 顶部横幅区域
            ZStack {
                LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.6, green: 0.3, blue: 0.8),
                        Color(red: 0.4, green: 0.1, blue: 0.6)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .frame(height: 60)
                .cornerRadius(20, corners: [.topLeft, .topRight])
                
                Text("塔罗大师Lv.\(user.level)")
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(.white)
                    .padding(.top, 8)
            }
            
            // 主体内容区域
            VStack(spacing: 20) {
                // 头像区域
                ZStack(alignment: .bottomTrailing) {
                    Circle()
                        .fill(
                            LinearGradient(
                                colors: [Color(red: 0.6, green: 0.4, blue: 0.8), Color(red: 0.4, green: 0.2, blue: 0.6)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 100, height: 100)
                        .overlay(
                            Image(systemName: "person.fill")
                                .font(.system(size: 48))
                                .foregroundColor(.white)
                        )
                        .padding(5)
                        .overlay(
                            Circle()
                                .stroke(LinearGradient(
                                    colors: [Color(red: 0.8, green: 0.6, blue: 1.0), Color.purple],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ), lineWidth: 3)
                        )
                        .onTapGesture {
                            showAvatarActionSheet = true
                        }
                        .actionSheet(isPresented: $showAvatarActionSheet) {
                            ActionSheet(
                                title: Text("更改头像"),
                                buttons: [
                                    .default(Text("拍照")),
                                    .default(Text("从相册选择")),
                                    .cancel()
                                ]
                            )
                        }
                    
                    // 通知铃铛开关
                    Button(action: {
                        isNotificationEnabled.toggle()
                    }) {
                        Circle()
                            .fill(isNotificationEnabled ? Color.yellow : Color.gray)
                            .frame(width: 32, height: 32)
                            .overlay(
                                Image(systemName: isNotificationEnabled ? "bell.fill" : "bell.slash.fill")
                                    .foregroundColor(.white)
                            )
                    }
                    .offset(x: 10, y: 10)
                }
                .frame(maxWidth: .infinity)
                
                // 基本资料区
                VStack(spacing: 8) {
                    HStack {
                        Text(user.name)
                            .font(.title2).fontWeight(.bold).foregroundColor(.white)
                        
                        Button(action: {
                            // 分享用户资料
                        }) {
                            Image(systemName: "square.and.arrow.up")
                                .font(.caption)
                                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                                .padding(6)
                                .background(Circle().stroke(Color(red: 0.6, green: 0.5, blue: 0.9), lineWidth: 1))
                        }
                        
                        Spacer()
                        
                        NavigationLink(destination: FollowersView()) {
                            VStack {
                                Text("\(user.following)")
                                    .font(.headline).foregroundColor(.white)
                                Text("关注")
                                    .font(.caption).foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                            }
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                    .padding(.horizontal, 20)
                    
                    HStack {
                        Text("粉丝: \(user.followers)")
                            .font(.subheadline).foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                        Spacer()
                    }
                    .padding(.horizontal, 20)
                }
                
                // 徽章区
                HStack(spacing: 10) {
                    BadgeView(
                        icon: "rosette",
                        text: "Lv.\(user.level)",
                        color: Color(red: 0.9, green: 0.5, blue: 0.3)
                    )
                    
                    BadgeView(
                        icon: "gift",
                        text: "首开优惠¥1",
                        color: Color(red: 0.3, green: 0.8, blue: 0.5)
                    )
                    
                    if user.hasNewMedal {
                        BadgeView(
                            icon: "seal",
                            text: "新勋章",
                            color: Color(red: 0.8, green: 0.2, blue: 0.2),
                            isNew: true
                        )
                    }
                    
                    Spacer()
                }
                .padding(.horizontal, 20)
                
                // 快捷入口区
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 15) {
                    QuickActionButton(
                        icon: "dollarsign.circle",
                        title: "提现",
                        destination: WithdrawalView()
                    )
                    
                    QuickActionButton(
                        icon: "crown",
                        title: "会员",
                        destination: MembershipPlaceholderView()
                    )
                    
                    QuickActionButton(
                        icon: "paintbrush",
                        title: "装扮",
                        destination: OutfitView()
                    )
                    
                    QuickActionButton(
                        icon: "calendar",
                        title: "日签",
                        destination: DailySignView()
                    )
                }
                .padding(.horizontal, 20)
                
                // 营销横幅
                if showPromoBanner {
                    ZStack(alignment: .topTrailing) {
                        HStack {
                            Image(systemName: "giftcard")
                                .font(.title2)
                                .foregroundColor(.yellow)
                                .padding(.leading, 10)
                            
                            Text("首充会员享3倍星愿值，限时优惠")
                                .font(.subheadline)
                                .foregroundColor(.white)
                            
                            Spacer()
                            
                            Text("立即查看")
                                .font(.footnote)
                                .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.0))
                                .padding(8)
                                .background(
                                    Capsule().fill(Color(red: 0.6, green: 0.3, blue: 0.9).opacity(0.3))
                                )
                                .padding(.trailing, 30)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(
                            LinearGradient(
                                colors: [Color(red: 0.4, green: 0.1, blue: 0.6), Color(red: 0.3, green: 0.05, blue: 0.5)],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                            .cornerRadius(12)
                        )
                        
                        // 关闭按钮
                        Button(action: {
                            withAnimation {
                                showPromoBanner = false
                            }
                        }) {
                            Image(systemName: "xmark.circle.fill")
                                .font(.system(size: 20))
                                .foregroundColor(.white.opacity(0.7))
                                .padding(5)
                        }
                        .padding(.top, 5)
                        .padding(.trailing, 5)
                    }
                    .padding(.horizontal, 15)
                }
            }
            .padding(.vertical, 20)
            .background(Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7))
        }
        .background(RoundedRectangle(cornerRadius: 20).fill(Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7)))
        .overlay(RoundedRectangle(cornerRadius: 20).stroke(Color(red: 0.6, green: 0.3, blue: 0.8), lineWidth: 1))
        .shadow(color: Color.purple.opacity(0.5), radius: 8, x: 0, y: 4)
        .padding(.top, 20)
    }
    
    // MARK: - 内容导航区
    private var contentNavigationSection: some View {
        VStack(spacing: 0) {
            Text("我的内容")
                .font(.headline)
                .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 15)
                .padding(.bottom, 12)
            
            LazyVGrid(columns: Array(repeating: .init(.flexible()), count: 2), spacing: 15) {
                ForEach(navItems, id: \.title) { item in
                    NavigationLink(destination: getDestinationView(for: item.title)) {
                        HStack {
                            Image(systemName: item.icon)
                                .font(.system(size: 20))
                                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                                .frame(width: 30)
                            
                            Text(item.title)
                                .font(.headline)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity, alignment: .leading)
                            
                            Text("\(item.count)")
                                .font(.subheadline)
                                .foregroundColor(.white)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Capsule().fill(Color(red: 0.5, green: 0.2, blue: 0.7).opacity(0.8)))
                        }
                        .padding(15)
                        .background(
                            RoundedRectangle(cornerRadius: 15)
                                .fill(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.8))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 15)
                                .stroke(Color(red: 0.5, green: 0.3, blue: 0.7), lineWidth: 1)
                        )
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
            .padding(.horizontal, 15)
        }
        .padding(.bottom, 20)
    }
    
    // MARK: - 退出登录按钮
    private var logoutButton: some View {
        Button {
            showLogoutConfirmation = true
        } label: {
            Text("退出登录")
                .font(.headline).foregroundColor(.white)
                .frame(maxWidth: .infinity).padding(16)
                .background(RoundedRectangle(cornerRadius: 15).fill(Color(red: 0.4, green: 0.1, blue: 0.2).opacity(0.7)))
                .overlay(RoundedRectangle(cornerRadius: 15).stroke(Color(red: 0.8, green: 0.3, blue: 0.3), lineWidth: 1))
        }
        .padding(.horizontal, 20)
        .alert("确认退出登录吗？", isPresented: $showLogoutConfirmation) {
            Button("取消", role: .cancel) { }
            Button("退出", role: .destructive) {
                // 执行退出登录逻辑
            }
        } message: {
            Text("退出登录后将无法使用会员功能")
        }
    }
    
    // MARK: - 为不同标题获取目标视图
    private func getDestinationView(for title: String) -> some View {
        switch title {
        case "收藏":
            return AnyView(FavoritesView())
        case "下载":
            return AnyView(DownloadsView())
        case "订阅":
            return AnyView(SubscriptionsView())
        case "客制化":
            return AnyView(CustomizationView())
        default:
            return AnyView(Text("未知页面").foregroundColor(.white))
        }
    }
    
    // MARK: - 徽章视图
    private struct BadgeView: View {
        let icon: String
        let text: String
        let color: Color
        var isNew: Bool = false
        
        var body: some View {
            HStack(spacing: 5) {
                Image(systemName: icon)
                    .font(.system(size: 12))
                    .foregroundColor(.white)
                
                Text(text)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(.white)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .background(
                Capsule()
                    .fill(color)
            )
            .overlay(
                Group {
                    if isNew {
                        Circle()
                            .fill(Color.red)
                            .frame(width: 8, height: 8)
                            .offset(x: 10, y: -10)
                    }
                }
            )
        }
    }
    
    // MARK: - 快捷入口按钮
    private struct QuickActionButton<Destination: View>: View {
        let icon: String
        let title: String
        let destination: Destination
        
        var body: some View {
            NavigationLink(destination: destination) {
                VStack(spacing: 6) {
                    ZStack {
                        Circle()
                            .fill(Color(red: 0.3, green: 0.15, blue: 0.45))
                            .frame(width: 50, height: 50)
                        
                        Image(systemName: icon)
                            .font(.title2)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                    
                    Text(title)
                        .font(.caption)
                        .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                }
                .frame(maxWidth: .infinity)
            }
            .buttonStyle(PlainButtonStyle())
        }
    }
    
    // MARK: - 导航项模型
    struct AccountNavItem {
        let title: String
        let icon: String
        let count: Int
    }
}

// MARK: - 用户模型
struct User {
    var name: String
    var email: String
    var id: String
    var joinDate: Date
    var horoscope: Horoscope
    var followers: Int
    var following: Int
    var level: Int
    var hasNewMedal: Bool
}

enum Horoscope: String, CaseIterable, Hashable {
    case aries       = "白羊座"
    case taurus      = "金牛座"
    case gemini      = "双子座"
    case cancer      = "巨蟹座"
    case leo         = "狮子座"
    case virgo       = "处女座"
    case libra       = "天秤座"
    case scorpio     = "天蝎座"
    case sagittarius = "射手座"
    case capricorn   = "摩羯座"
    case aquarius    = "水瓶座"
    case pisces      = "双鱼座"
}

// MARK: - 预览
struct AccountView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            AccountView()
        }
        .preferredColorScheme(.dark)
    }
}
