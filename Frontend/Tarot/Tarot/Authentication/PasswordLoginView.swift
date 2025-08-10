import SwiftUI

struct PasswordLoginView: View {
    let phoneNumber: String
    let onSuccess: () -> Void

    @EnvironmentObject var theme: ThemeManager
    @Environment(\.presentationMode) private var presentationMode

    @State private var password = ""
    @State private var errorMessage: String?

    private var isValid: Bool { password.count >= 6 }

    var body: some View {
        let p = theme.selected.palette

        ZStack {
            p.bgGradient.ignoresSafeArea()

            VStack(spacing: 30) {
                // 返回按钮
                HStack {
                    Button {
                        presentationMode.wrappedValue.dismiss()
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: "arrow.left")
                            Text("返回")
                        }
                        .font(.subheadline.bold())
                        .foregroundColor(p.textPrimary)
                        .padding(8)
                        .background(p.textPrimary.opacity(0.08))
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                    }
                    Spacer()
                }

                Text("账号密码登录")
                    .font(.title.bold())
                    .foregroundColor(p.textPrimary)
                    .padding(.top, 40)

                Text(phoneNumber)
                    .font(.headline)
                    .foregroundColor(p.textPrimary.opacity(0.8))

                SecureField("请输入密码（至少6位）", text: $password)
                    .textContentType(.password)
                    .foregroundColor(p.textPrimary)
                    .padding()
                    .background(RoundedRectangle(cornerRadius: 15).fill(p.textPrimary.opacity(0.08)))
                    .overlay(
                        RoundedRectangle(cornerRadius: 15).stroke(p.textPrimary.opacity(0.25), lineWidth: 1)
                    )
                    .padding(.horizontal, 30)

                if let msg = errorMessage {
                    Text(msg)
                        .font(.caption)
                        .foregroundColor(.red)
                }

                Button {
                    if password == "123456" {   // 模拟
                        presentationMode.wrappedValue.dismiss()
                        onSuccess()
                    } else {
                        errorMessage = "密码错误，请重试"
                    }
                } label: {
                    Text("登录")
                        .font(.headline)
                        .foregroundColor(p.textInverse)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(
                            RoundedRectangle(cornerRadius: 15)
                                .fill(isValid ? AnyShapeStyle(p.buttonGradient) : AnyShapeStyle(Color.gray.opacity(0.5)))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 15).stroke(p.buttonStroke, lineWidth: 1)
                                .opacity(isValid ? 1 : 0)
                        )
                }
                .disabled(!isValid)
                .padding(.horizontal, 30)

                Spacer()
            }
        }
    }
}

struct PasswordLoginView_Previews: PreviewProvider {
    static var previews: some View {
        PasswordLoginView(phoneNumber: "18888888888", onSuccess: {})
            .environmentObject(ThemeManager(default: .silverNoir, persist: false))
            .previewDisplayName("银黑")

        PasswordLoginView(phoneNumber: "18888888888", onSuccess: {})
            .environmentObject(ThemeManager(default: .mysticPurple, persist: false))
            .previewDisplayName("梦幻紫")
    }
}
