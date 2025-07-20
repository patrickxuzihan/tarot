import SwiftUI
import Combine

struct LoginView: View {
    // 改动：移除 showLoginView，只保留需要的绑定
    @Binding var showVerificationView: Bool
    @Binding var showRegistrationView: Bool
    @Binding var isLoggedIn: Bool  // 登录状态绑定

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
        ZStack {
            // 背景
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.1, blue: 0.4)
                ]),
                startPoint: .top, endPoint: .bottom
            )
            .ignoresSafeArea()

            GeometryReader { geometry in
                ScrollViewReader { scrollProxy in
                    ScrollView {
                        VStack(spacing: 30) {
                            headerSection
                            phoneSection
                            thirdPartySection
                            agreementSection
                            loginButton

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
        // MARK: — 模态全屏跳转
        .fullScreenCover(isPresented: $showRegistrationView) {
            RegistrationView(phoneNumber: phoneNumber)
                .preferredColorScheme(.dark)
        }
        .fullScreenCover(isPresented: $showVerificationView) {
            VerificationView(
                phoneNumber: phoneNumber,
                onSuccess: {
                    // 验证成功后设置登录状态
                    isLoggedIn = true
                    showVerificationView = false
                }
            )
            .preferredColorScheme(.dark)
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

    // MARK: - 子视图

    private var headerSection: some View {
        VStack(spacing: 10) {
            ZStack {
                RoundedRectangle(cornerRadius: 20)
                    .fill(
                        LinearGradient(
                            colors: [Color(red: 0.7, green: 0.5, blue: 1.0), .purple],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 150, height: 230)
                    .shadow(color: .purple.opacity(0.8), radius: 15)
                    .overlay(
                        Image(systemName: "moon.stars")
                            .font(.system(size: 70))
                            .foregroundColor(.white)
                            .symbolEffect(.bounce, value: cardRotation)
                    )
                    .rotation3DEffect(.degrees(cardRotation), axis: (0,1,0))
            }
            .padding(.top, 15)

            Text("梦多塔")
                .font(.system(size: 38, weight: .bold))
                .foregroundColor(.white)
                .shadow(color: .purple, radius: 10)

            Text("你想要的塔罗未必只是塔罗")
                .font(.headline)
                .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                .opacity(cardRotation >= 180 ? 1 : 0)
                .animation(.easeInOut(duration: 0.5).delay(0.3), value: cardRotation)
        }
    }

    private var phoneSection: some View {
        VStack(spacing: 15) {
            Text("手机号登录")
                .font(.headline)
                .foregroundColor(.white.opacity(0.8))
                .frame(maxWidth: .infinity, alignment: .leading)

            HStack(spacing: 10) {
                Menu {
                    ForEach(countryCodes) { c in
                        Button { countryCode = c.code } label: {
                            Text("\(c.name) (\(c.code))")
                        }
                    }
                } label: {
                    HStack {
                        Text(countryCode).foregroundColor(.white)
                        Image(systemName: "chevron.down")
                            .font(.system(size: 12))
                            .foregroundColor(.white.opacity(0.7))
                    }
                    .padding(10)
                    .background(RoundedRectangle(cornerRadius: 10)
                        .fill(Color.purple.opacity(0.3)))
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
                    .foregroundColor(.white)
                    .padding(12)
                    .background(RoundedRectangle(cornerRadius: 10)
                        .fill(Color.purple.opacity(0.3)))
            }
        }
    }

    private var thirdPartySection: some View {
        VStack(spacing: 15) {
            Text("其他登录方式")
                .font(.subheadline)
                .foregroundColor(.white.opacity(0.6))
                .padding(.top, 5)

            HStack(spacing: 25) {
                Button(action: appleLogin) {
                    VStack {
                        Image(systemName: "apple.logo")
                            .font(.title)
                            .foregroundColor(.white)
                            .padding(15)
                            .background(
                                RoundedRectangle(cornerRadius: 15)
                                    .fill(Color.black.opacity(0.7))
                            )
                        Text("Apple")
                            .font(.caption)
                            .foregroundColor(.white.opacity(0.8))
                    }
                }

                Button(action: wechatLogin) {
                    VStack {
                        Image(systemName: "message.fill")
                            .font(.title)
                            .foregroundColor(.green)
                            .padding(15)
                            .background(
                                RoundedRectangle(cornerRadius: 15)
                                    .fill(Color(red: 0.1, green: 0.4, blue: 0.2))
                            )
                        Text("微信")
                            .font(.caption)
                            .foregroundColor(.white.opacity(0.8))
                    }
                }
            }
        }
    }

    private var agreementSection: some View {
        HStack(spacing: 8) {
            Button { agreedToTerms.toggle() } label: {
                Image(systemName: agreedToTerms ? "checkmark.square.fill" : "square")
                    .font(.system(size: 16))
                    .foregroundColor(agreedToTerms ? .purple : .white.opacity(0.7))
            }
            Text("同意")
            Text("用户协议")
                .underline()
                .foregroundColor(Color(red: 0.8, green: 0.4, blue: 1.0))
            Text("和")
            Text("隐私政策")
                .underline()
                .foregroundColor(Color(red: 0.8, green: 0.4, blue: 1.0))
        }
        .font(.caption)
        .foregroundColor(.white.opacity(0.8))
        .padding(.vertical, 8)
        .frame(maxWidth: .infinity, alignment: .center)
    }

    private var loginButton: some View {
        Button(action: loginAction) {
            Text("进入神秘之旅")
                .font(.headline)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 15)
                        .fill(isValidLogin
                              ? AnyShapeStyle(LinearGradient(
                                  colors: [.purple, Color(red: 0.5, green: 0, blue: 0.8)],
                                  startPoint: .topLeading,
                                  endPoint: .bottomTrailing
                                ))
                              : AnyShapeStyle(Color.gray.opacity(0.5)))
                )
                .opacity(isValidLogin ? 1 : 0.7)
        }
        .disabled(!isValidLogin)
        .padding(.horizontal, 20)
    }

    // MARK: - 动画 & 业务

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
        // 发送验证码并弹出验证页
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

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        StatefulPreviewWrapper()
    }

    private struct StatefulPreviewWrapper: View {
        @State private var showVerificationView = false
        @State private var showRegistrationView = false
        @State private var isLoggedIn = false

        var body: some View {
            LoginView(
                showVerificationView: $showVerificationView,
                showRegistrationView: $showRegistrationView,
                isLoggedIn: $isLoggedIn
            )
            .preferredColorScheme(.dark)
        }
    }
}
