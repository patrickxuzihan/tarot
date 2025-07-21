// PasswordChangeView.swift
import SwiftUI
import Security

/// 简单 Keychain 封装：存取“上一次密码”哈希
enum KeychainHelper {
    static let service = Bundle.main.bundleIdentifier!

    static func save(passwordHash: String, for account: String) {
        let data = Data(passwordHash.utf8)
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account
        ]
        SecItemDelete(query as CFDictionary)
        var add = query
        add[kSecValueData as String] = data
        SecItemAdd(add as CFDictionary, nil)
    }

    static func loadHash(for account: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
            kSecMatchLimit as String: kSecMatchLimitOne,
            kSecReturnData as String: kCFBooleanTrue as Any
        ]
        var item: CFTypeRef?
        guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess,
              let data = item as? Data,
              let s = String(data: data, encoding: .utf8)
        else { return nil }
        return s
    }
}

struct PasswordChangeView: View {
    @State private var oldPassword: String = ""
    @State private var newPassword: String = ""
    @State private var confirmPassword: String = ""
    @State private var showingAlert = false
    @State private var alertMessage = ""

    // Keychain 存“上一次密码”哈希的 key
    private let lastPasswordKey = "user.lastPasswordHash"

    // MARK: — SHA256 哈希（示例，用你的实际实现替换）
    private func sha256(_ text: String) -> String {
        Data(text.utf8).base64EncodedString()
    }

    // MARK: — 密码强度提示
    private var passwordStrength: (text: String, color: Color) {
        guard newPassword.count >= 6 else { return ("太短", .red) }
        var strength = 0
        if newPassword.count > 8                               { strength += 1 }
        if newPassword.rangeOfCharacter(from: .decimalDigits) != nil    { strength += 1 }
        if newPassword.rangeOfCharacter(from: .uppercaseLetters) != nil { strength += 1 }
        if newPassword.rangeOfCharacter(from: .symbols) != nil          { strength += 1 }
        switch strength {
        case 0...1: return ("弱", .red)
        case 2...3: return ("中", .orange)
        case 4:     return ("强", .green)
        default:    return ("合格", .green)
        }
    }
    private func passwordStrengthScore() -> Int {
        guard newPassword.count >= 6 else { return 0 }
        var s = 0
        if newPassword.count > 8                               { s += 1 }
        if newPassword.rangeOfCharacter(from: .decimalDigits) != nil    { s += 1 }
        if newPassword.rangeOfCharacter(from: .uppercaseLetters) != nil { s += 1 }
        if newPassword.rangeOfCharacter(from: .symbols) != nil          { s += 1 }
        return max(1, min(s, 4))
    }

    // 是否可提交：新旧不一致、长度符合、两次输入相同
    private var canSubmit: Bool {
        guard !oldPassword.isEmpty,
              newPassword == confirmPassword,
              newPassword.count >= 6
        else { return false }
        if let last = KeychainHelper.loadHash(for: lastPasswordKey) {
            return sha256(newPassword) != last
        }
        return true
    }

    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.10, blue: 0.40)
                ]),
                startPoint: .top, endPoint: .bottom
            )
            .ignoresSafeArea()
            .onTapGesture { hideKeyboard() }

            ScrollView {
                VStack(spacing: 30) {
                    Text("修改密码")
                        .font(.largeTitle).bold()
                        .foregroundColor(.white)
                        .padding(.top, 40)

                    SecureField("当前密码", text: $oldPassword)
                        .padding()
                        .background(Color.purple.opacity(0.2))
                        .cornerRadius(12)
                        .foregroundColor(.white)
                        .padding(.horizontal, 20)

                    SecureField("新密码（≥6位，含大小写、数字、符号）", text: $newPassword)
                        .padding()
                        .background(Color.purple.opacity(0.2))
                        .cornerRadius(12)
                        .foregroundColor(.white)
                        .padding(.horizontal, 20)

                    Text("必须包含：大写、小写、数字、符号；长度 ≥ 6")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.7))
                        .padding(.horizontal, 20)

                    if !newPassword.isEmpty {
                        HStack(spacing: 6) {
                            Text("强度：")
                                .font(.caption).foregroundColor(.white.opacity(0.8))
                            Text(passwordStrength.text)
                                .font(.caption).foregroundColor(passwordStrength.color)
                            HStack(spacing: 3) {
                                ForEach(0..<4) { idx in
                                    RoundedRectangle(cornerRadius: 2)
                                        .fill(passwordStrengthScore() > idx
                                              ? passwordStrength.color
                                              : Color.gray.opacity(0.3))
                                        .frame(height: 4)
                                }
                            }
                            .frame(width: 80)
                        }
                        .padding(.horizontal, 20)
                    }

                    SecureField("确认新密码", text: $confirmPassword)
                        .padding()
                        .background(Color.purple.opacity(0.2))
                        .cornerRadius(12)
                        .foregroundColor(.white)
                        .padding(.horizontal, 20)

                    if !confirmPassword.isEmpty && newPassword != confirmPassword {
                        Text("两次输入的密码不一致")
                            .font(.caption)
                            .foregroundColor(.red)
                    }

                    Button(action: submitChange) {
                        Text("确认修改")
                            .font(.headline).bold()
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(canSubmit ? Color.purple : Color.gray)
                            )
                    }
                    .disabled(!canSubmit)
                    .padding(.horizontal, 20)
                    .padding(.bottom, 40)
                }
            }
        }
        .alert(isPresented: $showingAlert) {
            Alert(title: Text(alertMessage), dismissButton: .default(Text("知道了")))
        }
        .navigationTitle("修改密码")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func submitChange() {
        hideKeyboard()
        // TODO: 校验 oldPassword 是否正确
        let oldHash = sha256(oldPassword)
        KeychainHelper.save(passwordHash: oldHash, for: lastPasswordKey)
        // TODO: 存储 newPassword 的哈希为当前密码
        alertMessage = "密码修改成功"
        showingAlert = true
    }

    private func hideKeyboard() {
        UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder),
                                        to: nil, from: nil, for: nil)
    }
}

struct PasswordChangeView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            PasswordChangeView()
        }
        .preferredColorScheme(.dark)
    }
}
