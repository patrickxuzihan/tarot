//
//  SettingsView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

// Setup/SettingsView.swift
import SwiftUI

struct SettingsView: View {
    var body: some View {
        ZStack {
            // 使用与AccountView一致的背景
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
            
            ScrollView {
                VStack(spacing: 20) {
                    // 账号设置组
                    settingGroup(
                        title: "账号设置",
                        items: [
                            SettingItem(icon: "person.crop.circle", title: "个人资料", destination: ProfileEditorView()),
                            SettingItem(icon: "lock.fill", title: "安全设置", destination: SecuritySettingsView()),
                            SettingItem(icon: "envelope.fill", title: "绑定邮箱", destination: EmailBindingView()),
                            SettingItem(icon: "key.fill", title: "修改密码", destination: PasswordChangeView())
                        ]
                    )
                    
                    // 支持与帮助组
                    settingGroup(
                        title: "支持与帮助",
                        items: [
                            SettingItem(icon: "questionmark.circle.fill", title: "帮助中心", destination: HelpCenterView()),
                            SettingItem(icon: "info.circle.fill", title: "关于梦多塔", destination: AboutAppView()),
                            SettingItem(icon: "hand.raised.fill", title: "隐私政策", destination: PrivacyPolicyView()),
                            SettingItem(icon: "doc.text.fill", title: "服务条款", destination: TermsOfServiceView())
                        ]
                    )
                    
//                    // 其他设置项
//                    settingGroup(
//                        title: "其他设置",
//                        items: [
//                            SettingItem(icon: "bell.fill", title: "通知设置", destination: NotificationSettingsView()),
//                            SettingItem(icon: "paintpalette.fill", title: "主题设置", destination: ThemeSettingsView()),
//                            SettingItem(icon: "globe", title: "语言设置", destination: LanguageSettingsView())
//                        ]
//                    )
                    
                    Spacer().frame(height: 30)
                }
                .padding(.horizontal, 20)
                .padding(.top, 20)
            }
        }
        .navigationTitle("设置")
        .navigationBarTitleDisplayMode(.inline)
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

// MARK: - 预览
struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            SettingsView()
        }
        .preferredColorScheme(.dark)
    }
}
