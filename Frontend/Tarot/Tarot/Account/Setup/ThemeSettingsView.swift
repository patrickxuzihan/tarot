// Tarot/Account/Setup/ThemeSettingsView.swift
import SwiftUI

// MARK: - 1) 主题模型（两套：梦幻紫 / 银黑）
enum AppTheme: String, CaseIterable, Identifiable, Codable {
    case mysticPurple, silverNoir
    var id: String { rawValue }
    var displayName: String {
        switch self {
        case .mysticPurple: return "梦幻紫"
        case .silverNoir:   return "银黑"
        }
    }
    var palette: ThemePalette {
        switch self {
        case .mysticPurple: return .mysticPurple
        case .silverNoir:   return .silverNoir
        }
    }
    // 目前两套都偏暗色，如后续做浅色，这里再区分
    var colorScheme: ColorScheme { .dark }
}

// 语义化 token（先放常用的，后续可继续扩）
struct ThemePalette {
    let bgGradient: LinearGradient
    let cardFill: LinearGradient
    let cardStroke: LinearGradient
    let textPrimary: Color
    let textSecondary: Color
    let textInverse: Color
    let iconPrimary: Color
    let buttonGradient: LinearGradient
    let buttonStroke: LinearGradient
}

extension ThemePalette {
    static let mysticPurple = ThemePalette(
        bgGradient: LinearGradient(
            colors: [
                Color(red: 0.15, green: 0.05, blue: 0.25),
                Color(red: 0.25, green: 0.10, blue: 0.40)
            ],
            startPoint: .top, endPoint: .bottom
        ),
        cardFill: LinearGradient(
            colors: [Color(red: 0.70, green: 0.50, blue: 1.00), .purple],
            startPoint: .topLeading, endPoint: .bottomTrailing
        ),
        cardStroke: LinearGradient(
            colors: [.purple.opacity(0.9), .purple],
            startPoint: .topLeading, endPoint: .bottomTrailing
        ),
        textPrimary: .white,
        textSecondary: Color(red: 0.80, green: 0.70, blue: 1.00),
        textInverse: .white, // 按钮里的文字
        iconPrimary: .white,
        buttonGradient: LinearGradient(
            colors: [.purple, Color(red: 0.5, green: 0.0, blue: 0.8)],
            startPoint: .topLeading, endPoint: .bottomTrailing
        ),
        buttonStroke: LinearGradient(
            colors: [Color.purple.opacity(0.9), Color.purple.opacity(0.6)],
            startPoint: .topLeading, endPoint: .bottomTrailing
        )
    )

    static let silverNoir = ThemePalette(
        bgGradient: LinearGradient(
            colors: [
                Color(red: 0.08, green: 0.08, blue: 0.12),
                Color(red: 0.05, green: 0.05, blue: 0.08),
                Color(red: 0.03, green: 0.03, blue: 0.05)
            ],
            startPoint: .top, endPoint: .bottom
        ),
        cardFill: LinearGradient(
            colors: [Color(red: 0.25, green: 0.25, blue: 0.30),
                     Color(red: 0.15, green: 0.15, blue: 0.20)],
            startPoint: .topLeading, endPoint: .bottomTrailing
        ),
        cardStroke: LinearGradient(
            colors: [Color(red: 0.70, green: 0.70, blue: 0.80),
                     Color(red: 0.50, green: 0.50, blue: 0.60)],
            startPoint: .topLeading, endPoint: .bottomTrailing
        ),
        textPrimary: Color(red: 0.95, green: 0.95, blue: 1.00),
        textSecondary: Color(red: 0.80, green: 0.80, blue: 0.90),
        textInverse: Color(red: 0.10, green: 0.10, blue: 0.15), // 浅按钮上的深色字
        iconPrimary: Color(red: 0.95, green: 0.95, blue: 1.00),
        buttonGradient: LinearGradient(
            colors: [
                Color(red: 0.95, green: 0.95, blue: 1.00),
                Color(red: 0.80, green: 0.80, blue: 0.90),
                Color(red: 0.60, green: 0.60, blue: 0.80)
            ],
            startPoint: .topLeading, endPoint: .bottomTrailing
        ),
        buttonStroke: LinearGradient(
            colors: [
                Color(red: 0.95, green: 0.95, blue: 1.00),
                Color(red: 0.70, green: 0.70, blue: 0.80)
            ],
            startPoint: .topLeading, endPoint: .bottomTrailing
        )
    )
}

// MARK: - 2) 主题管理器（轻量 + 持久化）
final class ThemeManager: ObservableObject {
    private static let storeKey = "app.theme"
    private let persist: Bool   // 新增：是否持久化

    @Published var selected: AppTheme {
        didSet {
            if persist {
                UserDefaults.standard.set(selected.rawValue, forKey: Self.storeKey)
            }
        }
    }

    /// persist=false 时，不读取/不写入 UserDefaults，完全按 default 参数走
    init(default theme: AppTheme = .silverNoir, persist: Bool = true) {
        self.persist = persist
        if persist,
           let raw = UserDefaults.standard.string(forKey: Self.storeKey),
           let t = AppTheme(rawValue: raw) {
            self.selected = t
        } else {
            self.selected = theme
        }
    }

    func toggle() {
        selected = (selected == .silverNoir) ? .mysticPurple : .silverNoir
    }
}

// MARK: - 3) 设置页（先独立可用，后续再接入全局）
struct ThemeSettingsView: View {
    @EnvironmentObject var theme: ThemeManager

    var body: some View {
        List {
            Section("主题") {
                Picker("配色", selection: $theme.selected) {
                    ForEach(AppTheme.allCases) { t in
                        Text(t.displayName).tag(t)
                    }
                }
                .pickerStyle(.segmented)
            }

            Section("预览") {
                ThemePreview(palette: theme.selected.palette)
                    .listRowInsets(EdgeInsets())
                    .padding(.vertical, 6)
            }

            Section {
                Button(theme.selected == .silverNoir ? "切换到「梦幻紫」" : "切换到「银黑」") {
                    theme.toggle()
                }
            }
        }
        .navigationTitle("主题样式")
        .preferredColorScheme(theme.selected.colorScheme) // 设置页自身用对应外观
    }
}

// 一个小预览，不影响其他页面
private struct ThemePreview: View {
    let palette: ThemePalette
    var body: some View {
        ZStack {
            palette.bgGradient.ignoresSafeArea()
            VStack(spacing: 14) {
                RoundedRectangle(cornerRadius: 20)
                    .fill(palette.cardFill)
                    .frame(height: 110)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(palette.cardStroke, lineWidth: 1)
                    )
                    .overlay(
                        Image(systemName: "moon.stars")
                            .font(.system(size: 36))
                            .foregroundColor(palette.iconPrimary)
                    )

                Text("梦多塔").font(.title3.bold())
                    .foregroundColor(palette.textPrimary)
                Text("你想要的塔罗未必只是塔罗")
                    .font(.footnote)
                    .foregroundColor(palette.textSecondary)

                Button {} label: {
                    Text("示例主按钮")
                        .font(.headline)
                        .foregroundColor(palette.textInverse)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                        .background(
                            RoundedRectangle(cornerRadius: 14)
                                .fill(palette.buttonGradient)
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 14)
                                .stroke(palette.buttonStroke, lineWidth: 1)
                        )
                }
            }
            .padding(16)
        }
        .frame(height: 300)
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(radius: 8, y: 4)
    }
}

// MARK: - Preview
struct ThemeSettingsView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            NavigationStack {
                ThemeSettingsView()
                    .environmentObject(ThemeManager(default: .silverNoir))
            }
            .previewDisplayName("银黑 SilverNoir")

            NavigationStack {
                ThemeSettingsView()
                    .environmentObject(ThemeManager(default: .mysticPurple))
            }
            .previewDisplayName("梦幻紫 MysticPurple")
        }
    }
}
