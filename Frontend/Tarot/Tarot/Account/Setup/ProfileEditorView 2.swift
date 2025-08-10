//
//  ProfileEditorView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

// Setup/ProfileEditorView.swift
import SwiftUI

struct ProfileEditorView: View {
    @State private var name: String = "神秘塔罗师"
    @State private var email: String = "tarotmaster@example.com"
    @State private var horoscope: Horoscope = .libra
    @State private var showSaveConfirmation = false
    
    var body: some View {
        ZStack {
            // 使用与AccountView一致的背景
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.1, green: 0.05, blue: 0.2),
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.2, green: 0.1, blue: 0.35)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)
            
            ScrollView {
                VStack(spacing: 20) {
                    // 头像编辑
                    VStack {
                        Text("头像")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        HStack {
                            Circle()
                                .fill(
                                    LinearGradient(
                                        colors: [Color(red: 0.6, green: 0.4, blue: 0.8), Color(red: 0.4, green: 0.2, blue: 0.6)],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .frame(width: 80, height: 80)
                                .overlay(
                                    Image(systemName: "person.fill")
                                        .font(.system(size: 36))
                                        .foregroundColor(.white)
                                )
                            
                            Spacer()
                            
                            Button(action: {}) {
                                Text("更换头像")
                                    .font(.subheadline)
                                    .foregroundColor(.white)
                                    .padding(10)
                                    .background(Color(red: 0.5, green: 0.3, blue: 0.7))
                                    .cornerRadius(10)
                            }
                        }
                    }
                    .padding()
                    .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                    .cornerRadius(15)
                    
                    // 昵称编辑
                    VStack(alignment: .leading) {
                        Text("昵称")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                        
                        TextField("输入昵称", text: $name)
                            .foregroundColor(.white)
                            .padding()
                            .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                            .cornerRadius(10)
                    }
                    .padding()
                    .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                    .cornerRadius(15)
                    
                    // 星座选择
                    VStack(alignment: .leading) {
                        Text("星座")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                        
                        Picker("星座", selection: $horoscope) {
                            ForEach(Horoscope.allCases, id: \.self) { sign in
                                Text(sign.rawValue).tag(sign)
                            }
                        }
                        .pickerStyle(MenuPickerStyle())
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                        .cornerRadius(10)
                    }
                    .padding()
                    .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                    .cornerRadius(15)
                    
                    // 保存按钮
                    Button(action: {
                        showSaveConfirmation = true
                    }) {
                        Text("保存更改")
                            .font(.headline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color(red: 0.5, green: 0.2, blue: 0.7))
                            .cornerRadius(15)
                    }
                    .padding(.horizontal)
                    .alert(isPresented: $showSaveConfirmation) {
                        Alert(
                            title: Text("保存成功"),
                            message: Text("您的个人资料已更新"),
                            dismissButton: .default(Text("确定"))
                        )
                    }
                }
                .padding(.horizontal)
                .padding(.top, 20)
            }
        }
        .navigationTitle("个人资料")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct ProfileEditorView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            ProfileEditorView()
        }
        .preferredColorScheme(.dark)
    }
}
