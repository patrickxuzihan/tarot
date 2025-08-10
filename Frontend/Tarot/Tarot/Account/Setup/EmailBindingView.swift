// EmailBindingView.swift
import SwiftUI

struct EmailBindingView: View {
    @State private var email: String = ""
    @State private var code: String = ""
    @State private var isCodeSent = false

    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.10, blue: 0.40)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)

            ScrollView {
                VStack(spacing: 30) {
                    // 邮箱输入
                    VStack(alignment: .leading, spacing: 6) {
                        Text("邮箱地址")
                            .foregroundColor(.white)
                            .font(.headline)
                        TextField("请输入邮箱", text: $email)
                            .keyboardType(.emailAddress)
                            .autocapitalization(.none)
                            .padding()
                            .background(
                                Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7)
                            )
                            .cornerRadius(10)
                            .foregroundColor(.white)
                    }
                    .padding(.horizontal, 20)

                    // 验证码行：标签 + 同行对齐的输入框和按钮
                    VStack(alignment: .leading, spacing: 6) {
                        Text("验证码")
                            .foregroundColor(.white)
                            .font(.headline)
                        HStack(spacing: 10) {
                            TextField("输入验证码", text: $code)
                                .padding()
                                .background(
                                    Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7)
                                )
                                .cornerRadius(10)
                                .foregroundColor(.white)
                                .frame(height: 44)

                            Button(isCodeSent ? "已发送" : "发送验证码") {
                                // TODO: 请求发送验证码
                                isCodeSent = true
                            }
                            .disabled(isCodeSent)
                            .font(.subheadline)
                            .padding(.vertical, 12)
                            .padding(.horizontal, 16)
                            .background(
                                RoundedRectangle(cornerRadius: 10)
                                    .fill(isCodeSent ? Color.gray : Color.purple)
                            )
                            .foregroundColor(.white)
                            .frame(height: 44)
                        }
                    }
                    .padding(.horizontal, 20)

                    // 绑定按钮
                    Button("绑定邮箱") {
                        // TODO: 提交绑定
                    }
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(RoundedRectangle(cornerRadius: 12).fill(Color.purple))
                    .padding(.horizontal, 20)

                    Spacer()
                }
                .padding(.top, 30)
            }
        }
        .navigationTitle("绑定邮箱")
        .navigationBarTitleDisplayMode(.inline)
    }
}
