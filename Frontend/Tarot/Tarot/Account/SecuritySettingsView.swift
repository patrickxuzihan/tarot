// SecuritySettingsView.swift
import SwiftUI

struct SecuritySettingsView: View {
    @State private var isTwoFactorEnabled = false
    @State private var requireBiometrics = true

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

            Form {
                Section(header: Text("登录安全").foregroundColor(.purple)) {
                    Toggle("双重认证", isOn: $isTwoFactorEnabled)
                    Toggle("使用生物识别", isOn: $requireBiometrics)
                }

                // “更改登录密码” 已移除
            }
            .scrollContentBackground(.hidden)
            .background(Color.clear)
            .foregroundColor(.white)
        }
        .navigationTitle("安全设置")
        .navigationBarTitleDisplayMode(.inline)
    }
}
