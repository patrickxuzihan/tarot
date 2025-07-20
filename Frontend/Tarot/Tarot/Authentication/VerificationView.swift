import SwiftUI
import Combine

struct VerificationView: View {
    let phoneNumber: String
    let onSuccess: () -> Void

    @Environment(\.presentationMode) private var presentationMode

    @State private var verificationCode = ""
    @State private var countdown = 60
    @State private var isCountingDown = true
    @State private var timer: Timer?

    @State private var errorMessage: String? = nil
    @FocusState private var isCodeFieldFocused: Bool

    @State private var showPasswordLogin = false

    private var isValidVerification: Bool {
        verificationCode.count == 6 && verificationCode.allSatisfy(\.isNumber)
    }

    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.1, blue: 0.4)
                ]),
                startPoint: .top, endPoint: .bottom
            )
            .ignoresSafeArea()

            GeometryReader { geometry in
                ScrollView {
                    VStack(spacing: 30) {
                        backButton
                        headerSection
                        codeSection
                        resendButton
                        verifyButton
                        passwordLoginLink
                        Spacer()
                    }
                    .padding(.top, 40)
                    .padding(.horizontal, 30)
                    .frame(minHeight: geometry.size.height)
                }
                .background(Color.clear.contentShape(Rectangle())
                                .onTapGesture { hideKeyboard() })
                .scrollDismissesKeyboard(.interactively)
            }
        }
        .fullScreenCover(isPresented: $showPasswordLogin) {
            PasswordLoginView(
                phoneNumber: phoneNumber,
                onSuccess: {
                    presentationMode.wrappedValue.dismiss()
                    onSuccess()
                }
            )
            .preferredColorScheme(.dark)
        }
        .onAppear {
            isCodeFieldFocused = true
            sendVerificationCode()
            startCountdown()
        }
        .onDisappear {
            stopCountdown()
        }
    }

    // MARK: - 头部、返回按钮等

    private var backButton: some View {
        HStack {
            Button {
                presentationMode.wrappedValue.dismiss()
            } label: {
                HStack(spacing: 4) {
                    Image(systemName: "arrow.left")
                    Text("返回登录")
                }
                .font(.subheadline.bold())
                .foregroundColor(.white)
                .padding(8)
                .background(Color.purple.opacity(0.3))
                .clipShape(RoundedRectangle(cornerRadius: 8))
            }
            Spacer()
        }
    }

    private var headerSection: some View {
        VStack(spacing: 15) {
            RoundedRectangle(cornerRadius: 20)
                .fill(
                    LinearGradient(
                        colors: [Color(red: 0.7, green: 0.5, blue: 1.0), .purple],
                        startPoint: .topLeading, endPoint: .bottomTrailing
                    )
                )
                .frame(width: 100, height: 180)
                .shadow(color: .purple.opacity(0.8), radius: 10)
                .overlay(
                    Image(systemName: "envelope.fill")
                        .font(.system(size: 50))
                        .foregroundColor(.white)
                )

            Text("短信验证码")
                .font(.title2.bold())
                .foregroundColor(.white)
                .shadow(color: .purple, radius: 5)

            Text("验证码已发送至")
                .font(.headline)
                .foregroundColor(.white.opacity(0.8))

            Text(phoneNumber)
                .font(.title3.bold())
                .foregroundColor(.white)
                .padding(.horizontal, 20)
                .padding(.vertical, 8)
                .background(Color.purple.opacity(0.3))
                .cornerRadius(10)

            if let msg = errorMessage {
                Text(msg)
                    .font(.caption)
                    .foregroundColor(.red)
            }
        }
    }

    // MARK: - 验证码输入

    private var codeSection: some View {
        VStack(spacing: 15) {
            Text("请输入6位验证码")
                .font(.subheadline)
                .foregroundColor(.white.opacity(0.8))

            TextField("", text: $verificationCode)
                .keyboardType(.numberPad)
                .focused($isCodeFieldFocused)
                .submitLabel(.done)
                .toolbar {
                    ToolbarItemGroup(placement: .keyboard) {
                        Spacer()
                        Button("完成") {
                            hideKeyboard()
                        }
                        // 强制设回普通 body 字体
                        .font(.body)
                    }
                }
                .multilineTextAlignment(.center)
                // 只影响输入框本身的文字
                .font(.system(size: 28, weight: .bold))
                .foregroundColor(.white)
                .padding()
                .background(RoundedRectangle(cornerRadius: 15)
                                .fill(Color.purple.opacity(0.3)))
                .overlay(RoundedRectangle(cornerRadius: 15)
                            .stroke(
                                errorMessage != nil
                                  ? Color.red
                                  : Color.white.opacity(0.2),
                                lineWidth: 1
                            ))
                .frame(maxWidth: 220)
                .onChange(of: verificationCode) { old, new in
                    errorMessage = nil
                    var filtered = new.filter(\.isNumber)
                    if filtered.count > 6 {
                        filtered = String(filtered.prefix(6))
                    }
                    verificationCode = filtered
                }
        }
    }

    // MARK: - 其他按钮

    private var resendButton: some View {
        Button(action: resendCode) {
            Text(isCountingDown
                 ? "重新获取验证码 (\(countdown)s)"
                 : "重新发送验证码")
                .font(.footnote)
                .fontWeight(isCountingDown ? .regular : .bold)
                .foregroundColor(isCountingDown
                                 ? .white.opacity(0.6)
                                 : Color(red: 0.8, green: 0.5, blue: 1.0))
                .padding(.vertical, 10)
        }
        .disabled(isCountingDown)
    }

    private var verifyButton: some View {
        Button(action: verifyAction) {
            Text("验证并进入")
                .font(.headline)
                .foregroundColor(.white)
                .padding()
                .frame(maxWidth: .infinity)
                .background(
                    RoundedRectangle(cornerRadius: 15)
                        .fill(
                            isValidVerification
                            ? AnyShapeStyle(
                                LinearGradient(
                                   colors: [.purple, Color(red: 0.5, green: 0, blue: 0.8)],
                                   startPoint: .topLeading, endPoint: .bottomTrailing
                                )
                              )
                            : AnyShapeStyle(Color.gray.opacity(0.5))
                        )
                )
                .shadow(color: isValidVerification
                        ? .purple.opacity(0.8)
                        : .clear,
                        radius: 10, y: 5)
        }
        .disabled(!isValidVerification)
        .padding(.horizontal, 30)
        .opacity(isValidVerification ? 1 : 0.7)
        .scaleEffect(isValidVerification ? 1 : 0.98)
        .animation(.spring(), value: isValidVerification)
    }

    private var passwordLoginLink: some View {
        Button {
            showPasswordLogin = true
        } label: {
            Text("没收到验证码？尝试账号密码登录")
                .font(.footnote)
                .underline()
                .foregroundColor(Color(red: 0.8, green: 0.6, blue: 1.0))
        }
        .padding(.top, 6)
    }

    // MARK: - 功能方法

    private func resendCode() {
        sendVerificationCode()
        resetCountdown()
    }

    private func sendVerificationCode() {
        print("发送验证码到 \(phoneNumber)")
        errorMessage = nil
    }

    private func verifyAction() {
        hideKeyboard()
        let success = true // TODO: 后端校验
        if success {
            presentationMode.wrappedValue.dismiss()
            onSuccess()
        } else {
            errorMessage = "验证码错误，请重新输入"
            verificationCode = ""
            isCodeFieldFocused = true
            UINotificationFeedbackGenerator().notificationOccurred(.error)
        }
    }

    private func startCountdown() {
        stopCountdown()
        isCountingDown = true
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
            if countdown > 0 {
                countdown -= 1
            } else {
                stopCountdown()
                isCountingDown = false
            }
        }
    }

    private func resetCountdown() {
        countdown = 60
        startCountdown()
    }

    private func stopCountdown() {
        timer?.invalidate()
        timer = nil
    }

    private func hideKeyboard() {
        UIApplication.shared.sendAction(
            #selector(UIResponder.resignFirstResponder),
            to: nil, from: nil, for: nil
        )
    }
}

struct VerificationView_Previews: PreviewProvider {
    static var previews: some View {
        VerificationView(phoneNumber: "18888888888", onSuccess: {})
            .preferredColorScheme(.dark)
    }
}
