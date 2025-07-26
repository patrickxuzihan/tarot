//
//  AccountView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/12/25.
//

import SwiftUI

struct AccountView: View {
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
                    userInfoCard
                        .padding(.top, 20)

                    // 会员状态卡片，点击进入详情
                    membershipCard

                    settingGroup(
                        title: "账号设置",
                        items: [
                            SettingItem(icon: "person.crop.circle", title: "个人资料", destination: ProfileEditorView()),
                            SettingItem(icon: "lock.fill", title: "安全设置", destination: SecuritySettingsView()),
                            SettingItem(icon: "envelope.fill", title: "绑定邮箱", destination: EmailBindingView()),
                            SettingItem(icon: "key.fill", title: "修改密码", destination: PasswordChangeView())
                        ]
                    )

                    settingGroup(
                        title: "支持与帮助",
                        items: [
                            SettingItem(icon: "questionmark.circle.fill", title: "帮助中心", destination: HelpCenterView()),
                            SettingItem(icon: "info.circle.fill", title: "关于梦多塔", destination: AboutAppView()),
                            SettingItem(icon: "hand.raised.fill", title: "隐私政策", destination: PrivacyPolicyView()),
                            SettingItem(icon: "doc.text.fill", title: "服务条款", destination: TermsOfServiceView())
                        ]
                    )

                    logoutButton

                    Spacer().frame(height: 30)
                }
                .padding(.horizontal, 20)
            }
        }
        .navigationTitle("账号中心")
        .navigationBarTitleDisplayMode(.inline)
    }

    // MARK: - 用户信息卡片
    private var userInfoCard: some View {
        HStack(spacing: 20) {
            Circle()
                .fill(
                    LinearGradient(
                        colors: [Color(red: 0.6, green: 0.4, blue: 0.8), Color(red: 0.4, green: 0.2, blue: 0.6)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: 80, height: 80)
                .overlay(Image(systemName: "person.fill")
                    .font(.system(size: 36))
                    .foregroundColor(.white))
                .padding(5)
                .overlay(Circle()
                    .stroke(LinearGradient(
                        colors: [Color(red: 0.8, green: 0.6, blue: 1.0), Color.purple],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ), lineWidth: 2))
                .shadow(color: Color.purple.opacity(0.5), radius: 8)

            VStack(alignment: .leading, spacing: 8) {
                Text(user.name)
                    .font(.title2).fontWeight(.bold).foregroundColor(.white)

                HStack {
                    Text("ID: \(user.id)")
                        .font(.caption).foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    Spacer()
                    Text(user.horoscope.rawValue)
                        .font(.caption)
                        .padding(5)
                        .background(Capsule().fill(Color(red: 0.4, green: 0.2, blue: 0.6)))
                        .foregroundColor(.white)
                }

                Text(user.email)
                    .font(.caption).foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))

                Text("加入时间: \(user.joinDate.formatted(date: .long, time: .omitted))")
                    .font(.caption2).foregroundColor(.gray)
            }
            Spacer()
        }
        .padding(20)
        .background(RoundedRectangle(cornerRadius: 20).fill(Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7)))
        .overlay(RoundedRectangle(cornerRadius: 20).stroke(Color(red: 0.6, green: 0.3, blue: 0.8), lineWidth: 1))
    }

    // MARK: - 会员状态卡片（可点击）
    private var membershipCard: some View {
        NavigationLink(
            destination: MembershipDetailView(memberType: user.memberType)
        ) {
            VStack(spacing: 15) {
                HStack {
                    Text("会员状态")
                        .font(.headline)
                        .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    Spacer()
                    if user.memberType == .none {
                        Text("未开通")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.8))
                    } else {
                        Text("有效期至 \(user.memberExpiryDate.formatted(date: .long, time: .omitted))")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.8))
                    }
                }

                HStack {
                    VStack(alignment: .leading, spacing: 6) {
                        HStack {
                            Image(systemName: user.memberType == .none ? "xmark.circle" : "crown.fill")
                                .foregroundColor(user.memberType == .none ? .red : Color(red: 1.0, green: 0.8, blue: 0.3))
                            Text(user.memberType.description)
                                .font(.body).foregroundColor(.white)
                        }
                        if user.memberType == .none {
                            Text("开通会员解锁更多神秘力量")
                                .font(.caption).foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                        } else {
                            Text(user.memberType == .basic ? "快速占卜 35次/月" : "快速占卜 80次/月")
                                .font(.caption).foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                        }
                    }
                    Spacer()
                    Image(systemName: "chevron.right")
                        .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                }
            }
            .padding(20)
            .background(RoundedRectangle(cornerRadius: 20).fill(Color(red: 0.2, green: 0.15, blue: 0.4)))
            .overlay(RoundedRectangle(cornerRadius: 20).stroke(Color(red: 0.5, green: 0.3, blue: 0.7), lineWidth: 1.5))
        }
        .buttonStyle(PlainButtonStyle())
    }

    // MARK: - 通用设置组
    private func settingGroup(title: String, items: [SettingItem]) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(.headline)
                .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                .padding(.leading, 10)

            VStack(spacing: 0) {
                ForEach(items) { item in
                    NavigationLink(destination: item.destination) {
                        SettingLinkRow(icon: item.icon, title: item.title)
                    }
                    if item.id != items.last?.id {
                        Divider()
                            .background(Color(red: 0.3, green: 0.2, blue: 0.5))
                            .padding(.leading, 45)
                    }
                }
            }
            .background(RoundedRectangle(cornerRadius: 15).fill(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.8)))
            .overlay(RoundedRectangle(cornerRadius: 15).stroke(Color(red: 0.5, green: 0.3, blue: 0.7), lineWidth: 1))
        }
    }

    // MARK: - 退出登录
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
}

// MARK: - 单行设置项视图
struct SettingLinkRow: View {
    let icon: String
    let title: String

    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                .frame(width: 30)
            Text(title).foregroundColor(.white)
            Spacer()
            Image(systemName: "chevron.right").foregroundColor(.gray)
        }
        .padding(15)
        .background(Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7))
    }
}

// MARK: - 设置项模型（类型擦除）
struct SettingItem: Identifiable {
    let id = UUID()
    let icon: String
    let title: String
    let destination: AnyView

    init<Destination: View>(icon: String, title: String, destination: Destination) {
        self.icon = icon
        self.title = title
        self.destination = AnyView(destination)
    }
}

// MARK: - 用户模型及枚举
struct User {
    var name: String
    var email: String
    var id: String
    var memberType: MemberType
    var joinDate: Date
    var horoscope: Horoscope

    /// 根据实际项目逻辑计算会员到期日，这里只是示例
    var memberExpiryDate: Date {
        switch memberType {
        case .premium:
            return Calendar.current.date(byAdding: .month, value: 6, to: joinDate)!
        case .basic:
            return Calendar.current.date(byAdding: .month, value: 1, to: joinDate)!
        case .none:
            return joinDate
        }
    }
}

enum MemberType {
    case none, basic, premium

    var description: String {
        switch self {
        case .none:    return "未开通"
        case .basic:   return "基础会员"
        case .premium: return "高级会员"
        }
    }
}

enum Horoscope: String {
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
