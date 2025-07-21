// ProfileEditorView.swift
import SwiftUI

struct ProfileEditorView: View {
    @State private var displayName: String = ""
    @State private var bio: String = ""

    var body: some View {
        ZStack {
            // 背景渐变
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
                    // 头像示意...
                    Circle()
                        .fill(
                            LinearGradient(
                                colors: [Color(red: 0.6, green: 0.4, blue: 0.8),
                                         Color(red: 0.4, green: 0.2, blue: 0.6)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 100, height: 100)
                        .overlay(Image(systemName: "camera.fill").foregroundColor(.white))
                        .shadow(radius: 8)

                    // 昵称字段
                    VStack(alignment: .leading, spacing: 6) {
                        Text("昵称")
                            .foregroundColor(.white)
                            .font(.headline)
                        TextField("请输入昵称", text: $displayName)
                            .padding()
                            .background(
                                Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7)
                            )
                            .cornerRadius(10)
                            .foregroundColor(.white)
                    }
                    .padding(.horizontal, 20)

                    // **个性签名，改为深色背景 + 白色输入**
                    VStack(alignment: .leading, spacing: 6) {
                        Text("个性签名")
                            .foregroundColor(.white)
                            .font(.headline)
                        TextEditor(text: $bio)
                            .frame(height: 100)
                            .padding(8)
                            .background(
                                Color(red: 0.2, green: 0.1, blue: 0.35).opacity(0.7)
                            )
                            .cornerRadius(10)
                            .foregroundColor(.white)
                    }
                    .padding(.horizontal, 20)

                    // 保存按钮...
                    Button("保存") {
                        // TODO: 保存逻辑
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
        .navigationTitle("编辑个人资料")
        .navigationBarTitleDisplayMode(.inline)
    }
}
