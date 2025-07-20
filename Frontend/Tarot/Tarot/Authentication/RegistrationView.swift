import SwiftUI

struct RegistrationView: View {
    let phoneNumber: String

    @State private var verificationCode = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var nickname = ""

    @State private var showingAlert = false
    @State private var alertMessage = ""

    @State private var isVerificationCodeSent = false
    @State private var countdownTimer = 60
    @State private var timer: Timer?

    @Environment(\.presentationMode) private var presentationMode
    @StateObject private var viewModel = RegistrationViewModel()

    // MARK: – 校验
    private var isValidRegistration: Bool {
        verificationCode.count == 6 &&
        password.count >= 6 &&
        nickname.count >= 2 &&
        password == confirmPassword
    }

    private var passwordStrength: (text: String, color: Color) {
        guard password.count >= 6 else { return ("太短", .red) }
        var strength = 0
        if password.count > 8                      { strength += 1 }
        if password.rangeOfCharacter(from: .decimalDigits) != nil     { strength += 1 }
        if password.rangeOfCharacter(from: .uppercaseLetters) != nil  { strength += 1 }
        if password.rangeOfCharacter(from: .symbols) != nil           { strength += 1 }
        switch strength {
        case 0...1: return ("弱", .red)
        case 2...3: return ("中", .orange)
        case 4:     return ("强", .green)
        default:    return ("合格", .green)
        }
    }

    // MARK: – UI
    var body: some View {
        ZStack(alignment: .topLeading) {

            // 背景
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.1, blue: 0.4)
                ]),
                startPoint: .top, endPoint: .bottom
            )
            .ignoresSafeArea()
            .onTapGesture { hideKeyboard() }

            // 主内容
            ScrollView {
                VStack(spacing: 28) {

                    // 标题
                    VStack(spacing: 6) {
                        Text("创建账号")
                            .font(.system(size: 32, weight: .bold))
                            .foregroundColor(.white)
                            .shadow(color: .purple, radius: 8)
                        Text("欢迎加入梦多塔")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                    .padding(.top, 74)   // 让内容从按钮下方开始

                    // 手机号与验证码
                    phoneVerifySection

                    // 昵称（提前到密码之前）
                    nicknameSection

                    // 密码与确认
                    passwordSection

                    // 注册按钮
                    registerButton

                    // 底部返回登录
                    Button("返回登录页面") {
                        presentationMode.wrappedValue.dismiss()
                    }
                    .font(.subheadline)
                    .foregroundColor(Color(red: 0.8, green: 0.6, blue: 1.0))
                    .padding(.top, 8)

                    Spacer(minLength: 30)
                }
                .padding(.horizontal, 28)
            }

            // 返回按钮—放在最后声明，置于最上层
            Button(action: { presentationMode.wrappedValue.dismiss() }) {
                HStack(spacing: 4) {
                    Image(systemName: "arrow.left")
                    Text("返回登录")
                }
                .font(.subheadline.weight(.bold))
                .foregroundColor(.white)
                .padding(10)
                .background(Color.purple.opacity(0.3))
                .clipShape(RoundedRectangle(cornerRadius: 10))
            }
            .padding(.leading, 16)
            .padding(.top, 12)
        }
        .alert(isPresented: $showingAlert) {
            Alert(title: Text(alertMessage), dismissButton: .default(Text("确定")))
        }
        .onDisappear { stopTimer() }
        .navigationBarHidden(true)
    }

    // MARK: – 子视图
    private var phoneVerifySection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("手机验证")
                .font(.headline)
                .foregroundColor(.white.opacity(0.8))

            // 手机号展示
            HStack {
                Text(phoneNumber)
                    .font(.system(size: 18, weight: .medium))
                    .foregroundColor(.white)
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(RoundedRectangle(cornerRadius: 15).fill(Color.purple.opacity(0.2)))

                Button("更换") { presentationMode.wrappedValue.dismiss() }
                    .font(.subheadline)
                    .foregroundColor(Color(red: 0.8, green: 0.4, blue: 1.0))
                    .padding(.horizontal, 14)
                    .padding(.vertical, 6)
                    .background(RoundedRectangle(cornerRadius: 12).fill(Color.purple.opacity(0.3)))
            }

            // 输入验证码
            HStack(spacing: 10) {
                TextField("请输入6位验证码", text: $verificationCode)
                    .keyboardType(.numberPad)
                    .foregroundColor(.white)
                    .padding()
                    .background(RoundedRectangle(cornerRadius: 15).fill(Color.purple.opacity(0.2)))
                    .onChange(of: verificationCode) { _, newValue in
                        if newValue.count > 6 { verificationCode = String(newValue.prefix(6)) }
                    }

                Button(action: sendVerificationCode) {
                    Text(isVerificationCodeSent && countdownTimer > 0 ? "\(countdownTimer)s" : "获取验证码")
                        .font(.subheadline)
                        .foregroundColor(.white)
                        .frame(width: 90)
                        .padding(10)
                        .background(
                            RoundedRectangle(cornerRadius: 15)
                                .fill(
                                    (isVerificationCodeSent && countdownTimer > 0)
                                    ? Color.gray.opacity(0.5)
                                    : Color(red: 0.6, green: 0.2, blue: 0.8).opacity(0.8)
                                )
                        )
                }
                .disabled(isVerificationCodeSent && countdownTimer > 0)
            }

            if isVerificationCodeSent {
                Text("验证码已发送至您的手机")
                    .font(.caption)
                    .foregroundColor(Color(red: 0.6, green: 0.8, blue: 1.0))
            }
        }
    }

    private var nicknameSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("用户昵称")
                .font(.headline)
                .foregroundColor(.white.opacity(0.8))
            TextField("输入您的个性昵称", text: $nickname)
                .foregroundColor(.white)
                .padding()
                .background(RoundedRectangle(cornerRadius: 15).fill(Color.purple.opacity(0.2)))
            if nickname.count > 0 && nickname.count < 2 {
                Text("昵称至少需要2个字符")
                    .font(.caption)
                    .foregroundColor(.red)
            }
        }
    }

    private var passwordSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("设置密码")
                .font(.headline)
                .foregroundColor(.white.opacity(0.8))

            SecureField("密码（至少6位，含大小写、数字、符号）", text: $password)
                .foregroundColor(.white)
                .padding()
                .background(RoundedRectangle(cornerRadius: 15).fill(Color.purple.opacity(0.2)))
                .onChange(of: password) { _, _ in }

            // 密码提示
            Text("必须包含：大写、小写、数字、符号；长度≥6")
                .font(.caption2)
                .foregroundColor(.white.opacity(0.7))

            // 强度显示
            if !password.isEmpty {
                HStack(spacing: 6) {
                    Text("强度：")
                        .font(.caption)
                        .foregroundColor(.white.opacity(0.8))
                    Text(passwordStrength.text)
                        .font(.caption)
                        .foregroundColor(passwordStrength.color)
                    strengthBar
                }
            }

            // 确认密码
            VStack(alignment: .leading, spacing: 6) {
                Text("确认密码")
                    .font(.caption)
                    .foregroundColor(.white.opacity(0.8))
                SecureField("再次输入密码以确认", text: $confirmPassword)
                    .foregroundColor(.white)
                    .padding()
                    .background(RoundedRectangle(cornerRadius: 15).fill(Color.purple.opacity(0.2)))
            }

            if !password.isEmpty && !confirmPassword.isEmpty && password != confirmPassword {
                Text("两次输入的密码不一致")
                    .font(.caption)
                    .foregroundColor(.red)
            }
        }
    }

    private var strengthBar: some View {
        HStack(spacing: 3) {
            ForEach(0..<4) { idx in
                RoundedRectangle(cornerRadius: 2)
                    .fill(passwordStrengthScore() > idx ? passwordStrength.color : Color.gray.opacity(0.3))
                    .frame(height: 4)
            }
        }
        .frame(width: 80)
    }

    private var registerButton: some View {
        Button(action: registerAction) {
            Text("完成注册")
                .font(.headline)
                .foregroundColor(.white)
                .padding()
                .frame(maxWidth: .infinity)
                .background(
                    RoundedRectangle(cornerRadius: 15).fill(
                        isValidRegistration
                        ? LinearGradient(
                            colors: [.purple, Color(red: 0.5, green: 0, blue: 0.8)],
                            startPoint: .topLeading, endPoint: .bottomTrailing
                        )
                        : LinearGradient(
                            colors: [Color.gray.opacity(0.4), Color.gray.opacity(0.6)],
                            startPoint: .top, endPoint: .bottom
                        )
                    )
                )
                .shadow(color: isValidRegistration ? .purple.opacity(0.8) : .clear, radius: 10, y: 4)
        }
        .disabled(!isValidRegistration)
        .opacity(isValidRegistration ? 1 : 0.7)
        .scaleEffect(isValidRegistration ? 1 : 0.96)
        .animation(.spring(), value: isValidRegistration)
        .padding(.top, 10)
    }

    // MARK: – 工具
    private func passwordStrengthIndex(_ i: Int) -> Bool {
        passwordStrengthScore() >= i + 1
    }

    private func passwordStrengthScore() -> Int {
        guard password.count >= 6 else { return 0 }
        var s = 0
        if password.count > 8 { s += 1 }
        if password.rangeOfCharacter(from: .decimalDigits) != nil { s += 1 }
        if password.rangeOfCharacter(from: .uppercaseLetters) != nil { s += 1 }
        if password.rangeOfCharacter(from: .symbols) != nil { s += 1 }
        return max(1, min(s, 4))
    }

    private func sendVerificationCode() {
        hideKeyboard()
        isVerificationCodeSent = true
        countdownTimer = 60
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            if countdownTimer > 0 { countdownTimer -= 1 } else { timer?.invalidate() }
        }
        viewModel.sendVerificationCode(to: phoneNumber) { ok in
            alertMessage = ok ? "验证码已发送至您的手机" : "验证码发送失败，请重试"
            showingAlert = true
        }
    }

    private func registerAction() {
        hideKeyboard()
        guard isValidRegistration else { return }
        viewModel.registerUser(
            phoneNumber: phoneNumber,
            password: password,
            nickname: nickname,
            verificationCode: verificationCode
        ) { ok, msg in
            if ok {
                presentationMode.wrappedValue.dismiss()
            } else {
                alertMessage = msg
                showingAlert = true
            }
        }
    }

    private func stopTimer() {
        timer?.invalidate()
        timer = nil
    }

    private func hideKeyboard() {
        UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder),
                                        to: nil, from: nil, for: nil)
    }
}

// MARK: – ViewModel & Model （保持原样）
class RegistrationViewModel: ObservableObject {
    func sendVerificationCode(to phone: String, completion: @escaping (Bool) -> Void) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            completion(true)
        }
    }

    func registerUser(
        phoneNumber: String,
        password: String,
        nickname: String,
        verificationCode: String,
        completion: @escaping (Bool, String) -> Void
    ) {
        guard verificationCode == "123456" else {
            completion(false, "验证码错误，请输入123456")
            return
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { [weak self] in
            completion(true, "")
            self?.saveUserInfo(
                UserInfo(
                    phoneNumber: phoneNumber,
                    nickname: nickname,
                    password: password
                )
            )
        }
    }

    private func saveUserInfo(_ user: UserInfo) {
        var users = (try?
            JSONDecoder()
            .decode([UserInfo].self,
                    from: UserDefaults.standard.data(forKey: "registeredUsers") ?? Data())
        ) ?? []

        if !users.contains(where: { $0.phoneNumber == user.phoneNumber }) {
            users.append(user)
        }

        if let data = try? JSONEncoder().encode(users) {
            UserDefaults.standard.set(data, forKey: "registeredUsers")
        }
    }
}

struct UserInfo: Codable, Equatable {
    let phoneNumber: String; let nickname: String; let password: String
    var passwordHash: String { "hashed_\(password.sha256() ?? "")" }
    static func == (l: Self, r: Self) -> Bool { l.phoneNumber == r.phoneNumber }
}

extension String {
    func sha256() -> String? {
        String(self.reversed()).data(using: .utf8)?.base64EncodedString()
    }
}

// MARK: – 预览
struct RegistrationView_Previews: PreviewProvider {
    static var previews: some View {
        RegistrationView(phoneNumber: "13800138000")
            .preferredColorScheme(.dark)
    }
}
