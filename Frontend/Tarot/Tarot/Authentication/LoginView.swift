import SwiftUI
import Combine

struct LoginView: View {
    @EnvironmentObject var theme: ThemeManager

    @Binding var showVerificationView: Bool
    @Binding var showRegistrationView: Bool
    @Binding var isLoggedIn: Bool

    @State private var phoneNumber = ""
    @State private var countryCode = "+86"
    @State private var agreedToTerms = false
    @State private var cardRotation = 0.0

    @State private var keyboardHeight: CGFloat = 0
    @FocusState private var isPhoneNumberFocused: Bool

    private let registeredNumbers = ["18888888888", "13900000000", "15111111111"]

    struct Country: Identifiable {
        let id = UUID()
        let name: String
        let code: String
    }

    let countryCodes: [Country] = [
        .init(name: "中国", code: "+86"),
        .init(name: "美国", code: "+1"),
        .init(name: "英国", code: "+44"),
        .init(name: "日本", code: "+81"),
        .init(name: "韩国", code: "+82"),
        .init(name: "新加坡", code: "+65")
    ]

    private var isValidLogin: Bool {
        !phoneNumber.isEmpty && phoneNumber.count >= 8 && agreedToTerms
    }

    var body: some View {
        let p = theme.selected.palette

        ZStack {
            // 背景
            p.bgGradient.ignoresSafeArea()

            GeometryReader { geometry in
                ScrollViewReader { scrollProxy in
                    ScrollView {
                        VStack(spacing: 30) {
                            headerSection(p)
                            phoneSection(p)
                            thirdPartySection(p)
                            agreementSection(p)
                            loginButton(p)

                            Spacer()
                                .frame(
                                    height: min(
                                        keyboardHeight > 0
                                            ? keyboardHeight
                                            : geometry.size.height * 0.05,
                                        30
                                    )
                                )
                                .id("keyboardSpacer")
                        }
                        .padding(.vertical, 20)
                        .padding(.horizontal, 30)
                        .frame(minHeight: geometry.size.height)
                    }
                    .background(
                        Color.clear
                            .contentShape(Rectangle())
                            .onTapGesture { hideKeyboard() }
                    )
                    .scrollDismissesKeyboard(.interactively)
                    .onChange(of: isPhoneNumberFocused) { _, focused in
                        if focused && keyboardHeight > 0 {
                            scrollToButton(proxy: scrollProxy)
                        }
                    }
                    .onAppear(perform: startAnimations)
                }
            }
            .ignoresSafeArea(.keyboard, edges: .bottom)
        }
        // 不再强制深色，由 App 统一控制
        .fullScreenCover(isPresented: $showRegistrationView) {
            RegistrationView(phoneNumber: phoneNumber)
        }
        .fullScreenCover(isPresented: $showVerificationView) {
            VerificationView(
                phoneNumber: phoneNumber,
                onSuccess: {
                    isLoggedIn = true
                    showVerificationView = false
                }
            )
        }
        .onReceive(
            NotificationCenter.default.publisher(
                for: UIResponder.keyboardWillShowNotification
            )
        ) { note in
            if let frame = note.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect {
                keyboardHeight = frame.height
            }
        }
        .onReceive(
            NotificationCenter.default.publisher(
                for: UIResponder.keyboardWillHideNotification
            )
        ) { _ in
            keyboardHeight = 0
        }
    }

    // MARK: - 子视图（改为接收 palette，便于主题切换）

    private func headerSection(_ p: ThemePalette) -> some View {
        VStack(spacing: 10) {
            ZStack {
                RoundedRectangle(cornerRadius: 20)
                    .fill(p.cardFill)
                    .frame(width: 150, height: 230)
                    .shadow(color: p.textSecondary.opacity(0.5), radius: 15)
                    .overlay(
                        Image(systemName: "moon.stars")
                            .font(.system(size: 70))
                            .foregroundColor(p.iconPrimary)
                            .symbolEffect(.bounce, value: cardRotation)
                    )
                    .rotation3DEffect(.degrees(cardRotation), axis: (0,1,0))
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(p.cardStroke, lineWidth: 1)
                    )
            }
            .padding(.top, 15)

            Text("梦多塔")
                .font(.system(size: 38, weight: .bold))
                .foregroundColor(p.textPrimary)
                .shadow(color: p.textSecondary.opacity(0.5), radius: 10)

            Text("你想要的塔罗未必只是塔罗")
                .font(.headline)
                .foregroundColor(p.textSecondary)
                .opacity(cardRotation >= 180 ? 1 : 0)
                .animation(.easeInOut(duration: 0.5).delay(0.3), value: cardRotation)
        }
    }

    private func phoneSection(_ p: ThemePalette) -> some View {
        VStack(spacing: 15) {
            Text("手机号登录")
                .font(.headline)
                .foregroundColor(p.textPrimary.opacity(0.8))
                .frame(maxWidth: .infinity, alignment: .leading)

            HStack(spacing: 10) {
                Menu {
                    ForEach(countryCodes) { c in
                        Button { countryCode = c.code } label: {
                            Text("\(c.name) (\(c.code))")
                                .foregroundColor(p.textPrimary)
                        }
                    }
                } label: {
                    HStack {
                        Text(countryCode).foregroundColor(p.textPrimary)
                        Image(systemName: "chevron.down")
                            .font(.system(size: 12))
                            .foregroundColor(p.textPrimary.opacity(0.7))
                    }
                    .padding(10)
                    .background(
                        RoundedRectangle(cornerRadius: 10)
                            .fill(p.textPrimary.opacity(0.08))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(p.textPrimary.opacity(0.25), lineWidth: 1)
                    )
                }

                TextField("输入手机号码", text: $phoneNumber)
                    .keyboardType(.phonePad)
                    .focused($isPhoneNumberFocused)
                    .submitLabel(.done)
                    .toolbar {
                        ToolbarItemGroup(placement: .keyboard) {
                            Spacer()
                            Button("完成") { hideKeyboard() }
                        }
                    }
                    .foregroundColor(p.textPrimary)
                    .padding(12)
                    .background(
                        RoundedRectangle(cornerRadius: 10)
                            .fill(p.textPrimary.opacity(0.08))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(p.textPrimary.opacity(0.25), lineWidth: 1)
                    )
            }
        }
    }

    private func thirdPartySection(_ p: ThemePalette) -> some View {
        VStack(spacing: 15) {
            Text("其他登录方式")
                .font(.subheadline)
                .foregroundColor(p.textPrimary.opacity(0.6))
                .padding(.top, 5)

            HStack(spacing: 25) {
                Button(action: appleLogin) {
                    VStack {
                        Image(systemName: "apple.logo")
                            .font(.title)
                            .foregroundColor(p.iconPrimary)
                            .padding(15)
                            .background(
                                RoundedRectangle(cornerRadius: 15)
                                    .fill(p.textPrimary.opacity(0.08))
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: 15)
                                    .stroke(p.textPrimary.opacity(0.25), lineWidth: 1)
                            )
                        Text("Apple")
                            .font(.caption)
                            .foregroundColor(p.textPrimary.opacity(0.8))
                    }
                }

                Button(action: wechatLogin) {
                    VStack {
                        Image(systemName: "message.fill")
                            .font(.title)
                            .foregroundColor(Color(red: 0.2, green: 0.8, blue: 0.2)) // 品牌绿保留
                            .padding(15)
                            .background(
                                RoundedRectangle(cornerRadius: 15)
                                    .fill(Color(red: 0.1, green: 0.3, blue: 0.1))
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: 15)
                                    .stroke(p.textPrimary.opacity(0.25), lineWidth: 1)
                            )
                        Text("微信")
                            .font(.caption)
                            .foregroundColor(p.textPrimary.opacity(0.8))
                    }
                }
            }
        }
    }

    private func agreementSection(_ p: ThemePalette) -> some View {
        HStack(spacing: 8) {
            Button { agreedToTerms.toggle() } label: {
                Image(systemName: agreedToTerms ? "checkmark.square.fill" : "square")
                    .font(.system(size: 16))
                    .foregroundColor(agreedToTerms ? p.iconPrimary : p.textPrimary.opacity(0.7))
            }
            Text("同意")
                .foregroundColor(p.textPrimary.opacity(0.8))
            Text("用户协议")
                .underline()
                .foregroundColor(p.textSecondary)
            Text("和")
                .foregroundColor(p.textPrimary.opacity(0.8))
            Text("隐私政策")
                .underline()
                .foregroundColor(p.textSecondary)
        }
        .font(.caption)
        .padding(.vertical, 8)
        .frame(maxWidth: .infinity, alignment: .center)
    }

    private func loginButton(_ p: ThemePalette) -> some View {
        Button(action: loginAction) {
            Text("进入神秘之旅")
                .font(.headline)
                .foregroundColor(p.textInverse)
                .frame(maxWidth: .infinity)
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 15)
                        .fill(
                            isValidLogin
                            ? AnyShapeStyle(p.buttonGradient)
                            : AnyShapeStyle(Color.gray.opacity(0.5))
                        )
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 15)
                        .stroke(p.buttonStroke, lineWidth: 1)
                        .opacity(isValidLogin ? 1 : 0)
                )
                .shadow(color: isValidLogin ? p.textPrimary.opacity(0.3) : .clear, radius: 10, y: 5)
                .opacity(isValidLogin ? 1 : 0.7)
        }
        .disabled(!isValidLogin)
        .padding(.horizontal, 20)
    }

    // MARK: - 动画 & 业务（保持不变）
    private func startAnimations() {
        withAnimation(.spring(response: 0.7, dampingFraction: 0.6)) {
            cardRotation = 180
        }
    }

    private func scrollToButton(proxy: ScrollViewProxy) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.05) {
            withAnimation(.easeOut(duration: 0.2)) {
                proxy.scrollTo("keyboardSpacer", anchor: .bottom)
            }
        }
    }

    private func hideKeyboard() {
        UIApplication.shared.sendAction(
            #selector(UIResponder.resignFirstResponder),
            to: nil, from: nil, for: nil
        )
    }

    private func loginAction() {
        hideKeyboard()
        print("发送验证码到 \(countryCode)\(phoneNumber)")
        showVerificationView = true
    }

    private func appleLogin() {
        hideKeyboard()
        if Bool.random() {
            print("Apple 账号登录成功")
            isLoggedIn = true
        } else {
            showRegistrationView = true
        }
    }

    private func wechatLogin() {
        hideKeyboard()
        if Bool.random() {
            print("微信账号登录成功")
            isLoggedIn = true
        } else {
            showRegistrationView = true
        }
    }
}

// MARK: - 预览
// MARK: - 预览
struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            LoginView(
                showVerificationView: .constant(false),
                showRegistrationView: .constant(false),
                isLoggedIn: .constant(false)
            )
            .environmentObject(ThemeManager(default: .silverNoir, persist: false))
            .previewDisplayName("银黑")

            LoginView(
                showVerificationView: .constant(false),
                showRegistrationView: .constant(false),
                isLoggedIn: .constant(false)
            )
            .environmentObject(ThemeManager(default: .mysticPurple, persist: false))
            .previewDisplayName("梦幻紫")
        }
    }
}
