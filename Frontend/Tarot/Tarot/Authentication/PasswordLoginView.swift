import SwiftUI

struct PasswordLoginView: View {
    let phoneNumber: String
    let onSuccess: () -> Void

    @Environment(\.presentationMode) private var presentationMode
    @State private var password = ""
    @State private var errorMessage: String?

    private var isValid: Bool { password.count >= 6 }

    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.1, blue: 0.4)
                ]),
                startPoint: .top, endPoint: .bottom
            ).ignoresSafeArea()

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
                        .foregroundColor(.white)
                        .padding(8)
                        .background(Color.purple.opacity(0.3))
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                    }
                    Spacer()
                }

                Text("账号密码登录")
                    .font(.title.bold())
                    .foregroundColor(.white)
                    .padding(.top, 40)

                Text(phoneNumber)
                    .font(.headline)
                    .foregroundColor(.white.opacity(0.8))

                SecureField("请输入密码（至少6位）", text: $password)
                    .textContentType(.password)
                    .foregroundColor(.white)
                    .padding()
                    .background(RoundedRectangle(cornerRadius: 15).fill(Color.purple.opacity(0.3)))
                    .padding(.horizontal, 30)

                if let msg = errorMessage {
                    Text(msg)
                        .font(.caption)
                        .foregroundColor(.red)
                }

                Button {
                    // TODO: 调用实际登录 API
                    if password == "123456" {   // 模拟
                        presentationMode.wrappedValue.dismiss()
                        onSuccess()
                    } else {
                        errorMessage = "密码错误，请重试"
                    }
                } label: {
                    Text("登录")
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(
                            RoundedRectangle(cornerRadius: 15)
                                .fill(isValid ? .purple : Color.gray.opacity(0.5))
                        )
                }
                .disabled(!isValid)
                .padding(.horizontal, 30)

                Spacer()
            }
        }
    }
}

#Preview {
    PasswordLoginView(phoneNumber: "18888888888", onSuccess: {})
        .preferredColorScheme(.dark)
}
