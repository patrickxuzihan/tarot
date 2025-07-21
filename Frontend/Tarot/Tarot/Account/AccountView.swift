import SwiftUI

// MARK: - 账号中心
struct AccountView: View {
    // 从 HomeView 传入的 Tab 绑定，用于内部切换标签
    @Binding var selectedTab: Int
    @Environment(\.dismiss) var dismiss
    @State private var isNotificationEnabled = true
    @State private var showLogoutConfirmation = false
    
    // 假数据示例
    @State private var user = User(
        name: "神秘塔罗师",
        email: "tarotmaster@example.com",
        id: "UID-12345",
        memberType: .premium,
        joinDate: Date().addingTimeInterval(-86400 * 180),
        horoscope: .libra
    )
    
    var body: some View {
        ZStack {
            // 深紫色渐变背景
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
                    // 用户信息卡片
                    userInfoCard
                        .padding(.top, 20)
                    
                    // 会员信息
                    membershipCard
                    
                    // 设置分组
                    settingGroup(title: "账号设置", items: [
                        SettingItem(icon: "person.crop.circle", title: "个人资料", destination: ProfileEditorView()),
                        SettingItem(icon: "lock.fill", title: "安全设置", destination: SecuritySettingsView()),
                        SettingItem(icon: "envelope.fill", title: "绑定邮箱", destination: EmailBindingView()),
                        SettingItem(icon: "key.fill", title: "修改密码", destination: PasswordChangeView())
                    ])
                    
                    // 偏好设置分组
                    settingGroup(title: "偏好设置", items: [
                        SettingItem(icon: "app.badge.fill", title: "通知设置", destination: NotificationSettingsView()),
                        SettingItem(icon: "globe", title: "语言设置", destination: LanguageSettingsView()),
                        SettingItem(icon: "moon.stars.fill", title: "个性化主题", destination: ThemeSettingsView())
                    ])
                    
                    // 其他功能分组
                    settingGroup(title: "支持与帮助", items: [
                        SettingItem(icon: "questionmark.circle.fill", title: "帮助中心", destination: HelpCenterView()),
                        SettingItem(icon: "info.circle.fill", title: "关于梦多塔", destination: AboutAppView()),
                        SettingItem(icon: "hand.raised.fill", title: "隐私政策", destination: PrivacyPolicyView()),
                        SettingItem(icon: "doc.text.fill", title: "服务条款", destination: TermsOfServiceView())
                    ])
                    
                    // 退出按钮
                    logoutButton
                    
                    Spacer().frame(height: 30)
                }
                .padding(.horizontal, 20)
            }
        }
        .navigationTitle("账号中心")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button(action: { dismiss() }) {
                    Image(systemName: "chevron.backward")
                        .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                }
            }
        }
    }
    
    // MARK: - 用户信息卡片
    private var userInfoCard: some View {
        HStack(spacing: 20) {
            // 头像
            Circle()
                .fill(
                    LinearGradient(
                        colors: [Color(red: 0.6, green: 0.4, blue: 0.8), Color(red: 0.4, green: 0.2, blue: 0.6)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: 80, height: 80)
                .overlay(
                    Image(systemName: "person.fill")
                        .font(.system(size: 36))
                        .foregroundColor(.white)
                )
                .padding(5)
                .overlay(
                    Circle()
                        .stroke(
                            LinearGradient(
                                colors: [Color(red: 0.8, green: 0.6, blue: 1.0), Color.purple],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ),
                            lineWidth: 2
                        )
                )
                .shadow(color: Color.purple.opacity(0.5), radius: 8)
            
            VStack(alignment: .leading, spacing: 8) {
                Text(user.name)
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                HStack {
                    Text("ID: \(user.id)")
                        .font(.caption)
                        .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    
                    Spacer()
                    
                    Text(user.horoscope.rawValue)
                        .font(.caption)
                        .padding(5)
                        .background(Capsule().fill(Color(red: 0.4, green: 0.2, blue: 0.6)))
                        .foregroundColor(.white)
                }
                
                Text(user.email)
                    .font(.caption)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                
                Text("加入时间: \(user.joinDate.formatted(date: .long, time: .omitted))")
                    .font(.caption2)
                    .foregroundColor(.gray)
            }
            
            Spacer()
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color(red: 0.6, green: 0.3, blue: 0.8), lineWidth: 1)
        )
    }
    
    // MARK: - 会员信息卡片
    private var membershipCard: some View {
        VStack(spacing: 15) {
            HStack {
                Text("会员状态")
                    .font(.headline)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                
                Spacer()
                
                if user.memberType == .none {
                    // 点击后切换到第 3 个标签并关闭
                    Button(action: {
                        selectedTab = 3
                        dismiss()
                    }) {
                        Text("开通会员")
                            .font(.callout)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 6)
                            .background(
                                Capsule().fill(
                                    LinearGradient(
                                        colors: [Color(red: 0.9, green: 0.6, blue: 0.3), Color(red: 1.0, green: 0.7, blue: 0.4)],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                            )
                            .foregroundColor(.black)
                    }
                } else {
                    Text("有效期至 \(user.memberExpiryDate.formatted(date: .long, time: .omitted))")
                        .font(.caption)
                        .foregroundColor(.white.opacity(0.8))
                }
            }
            
            HStack {
                VStack(alignment: .leading, spacing: 6) {
                    HStack {
                        Image(systemName: user.memberType == .none ? "xmark.circle" : "crown.fill")
                            .foregroundColor(user.memberType == .none ? .red : Color(red: 1.0, green: 0.8, blue: 0.3))
                        
                        Text(user.memberType.description)
                            .font(.body)
                            .foregroundColor(.white)
                    }
                    
                    if user.memberType == .none {
                        Text("开通会员解锁更多神秘力量")
                            .font(.caption)
                            .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    } else {
                        Text(user.memberType == .basic ? "快速占卜 35次/月" : "快速占卜 80次/月")
                            .font(.caption)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
            }
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(red: 0.2, green: 0.15, blue: 0.4))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(
                    LinearGradient(
                        colors: user.memberType == .none
                            ? [Color(red: 0.6, green: 0.1, blue: 0.1), Color(red: 0.8, green: 0.3, blue: 0.3)]
                            : [Color(red: 0.8, green: 0.6, blue: 1.0), Color(red: 0.6, green: 0.3, blue: 0.8)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1.5
                )
        )
    }
    
    // MARK: - 设置分组视图
    private func settingGroup(title: String, items: [SettingItem]) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(title)
                .font(.headline)
                .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                .padding(.bottom, 10)
                .padding(.leading, 10)
            
            VStack(spacing: 0) {
                ForEach(Array(items.enumerated()), id: \.offset) { index, item in
                    NavigationLink(destination: item.destination) {
                        HStack {
                            Image(systemName: item.icon)
                                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                                .frame(width: 30)
                            
                            Text(item.title)
                                .foregroundColor(.white)
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .foregroundColor(.gray)
                        }
                        .padding(15)
                        .background(Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7))
                    }
                    
                    if index < items.count - 1 {
                        Divider()
                            .background(Color(red: 0.3, green: 0.2, blue: 0.5))
                            .padding(.leading, 45)
                    }
                }
            }
            .background(
                RoundedRectangle(cornerRadius: 15)
                    .fill(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.8))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 15)
                    .stroke(Color(red: 0.5, green: 0.3, blue: 0.7), lineWidth: 1)
            )
        }
    }
    
    // MARK: - 退出按钮
    private var logoutButton: some View {
        Button(action: {
            showLogoutConfirmation = true
        }) {
            Text("退出登录")
                .font(.headline)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding(16)
                .background(
                    RoundedRectangle(cornerRadius: 15)
                        .fill(Color(red: 0.4, green: 0.1, blue: 0.2).opacity(0.7))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 15)
                        .stroke(Color(red: 0.8, green: 0.3, blue: 0.3), lineWidth: 1)
                )
        }
        .padding(.horizontal, 20)
        .alert("确认退出登录吗？", isPresented: $showLogoutConfirmation) {
            Button("取消", role: .cancel) {}
            Button("退出", role: .destructive) {
                // 执行退出登录逻辑
            }
        } message: {
            Text("退出登录后将无法使用会员功能")
        }
    }
}

// MARK: - 用户模型
struct User {
    var name: String
    var email: String
    var id: String
    var memberType: MemberType
    var joinDate: Date
    var horoscope: Horoscope
    
    // 计算属性 - 会员有效期
    var memberExpiryDate: Date {
        switch memberType {
        case .basic:
            return Calendar.current.date(byAdding: .month, value: 1, to: .now) ?? Date()
        case .premium:
            return Calendar.current.date(byAdding: .month, value: 1, to: .now) ?? Date()
        case .none:
            return .now
        }
    }
    
    static let `default` = User(
        name: "神秘塔罗师",
        email: "tarotmaster@example.com",
        id: "UID-12345",
        memberType: .premium,
        joinDate: Date().addingTimeInterval(-86400 * 180),
        horoscope: .libra
    )
}

// MARK: - 会员类型
enum MemberType {
    case none
    case basic
    case premium
    
    var description: String {
        switch self {
        case .none: return "普通会员"
        case .basic: return "基础会员"
        case .premium: return "高级会员"
        }
    }
}

// MARK: - 星座类型
enum Horoscope: String {
    case aries = "白羊座"
    case taurus = "金牛座"
    case gemini = "双子座"
    case cancer = "巨蟹座"
    case leo = "狮子座"
    case virgo = "处女座"
    case libra = "天秤座"
    case scorpio = "天蝎座"
    case sagittarius = "射手座"
    case capricorn = "摩羯座"
    case aquarius = "水瓶座"
    case pisces = "双鱼座"
}

// MARK: - 设置项模型
struct SettingItem: Identifiable {
    let id = UUID()
    let icon: String
    let title: String
    let destination: AnyView
    
    init<Content: View>(icon: String, title: String, destination: Content) {
        self.icon = icon
        self.title = title
        self.destination = AnyView(destination)
    }
}

// MARK: - 占位视图 (实际应用中替换为具体实现)
struct ProfileEditorView: View { var body: some View { Text("个人资料编辑").foregroundColor(.white) } }
struct SecuritySettingsView: View { var body: some View { Text("安全设置").foregroundColor(.white) } }
struct EmailBindingView: View { var body: some View { Text("绑定邮箱").foregroundColor(.white) } }
struct PasswordChangeView: View { var body: some View { Text("修改密码").foregroundColor(.white) } }
struct NotificationSettingsView: View { var body: some View { Text("通知设置").foregroundColor(.white) } }
struct LanguageSettingsView: View { var body: some View { Text("语言设置").foregroundColor(.white) } }
struct ThemeSettingsView: View { var body: some View { Text("个性化主题").foregroundColor(.white) } }
struct HelpCenterView: View { var body: some View { Text("帮助中心").foregroundColor(.white) } }
struct AboutAppView: View { var body: some View { Text("关于梦多塔").foregroundColor(.white) } }
struct PrivacyPolicyView: View { var body: some View { Text("隐私政策").foregroundColor(.white) } }
struct TermsOfServiceView: View { var body: some View { Text("服务条款").foregroundColor(.white) } }

// MARK: - 预览
struct AccountView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            AccountView(selectedTab: .constant(4))
        }
        .preferredColorScheme(.dark)
    }
}
