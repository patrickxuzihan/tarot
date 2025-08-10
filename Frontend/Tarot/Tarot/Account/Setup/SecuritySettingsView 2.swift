//
//  SecuritySettingsView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

// Setup/SecuritySettingsView.swift
import SwiftUI

struct SecuritySettingsView: View {
    @State private var isBiometricEnabled = true
    @State private var showPasswordChange = false
    @State private var showTwoFactorSetup = false
    
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
                    // 生物识别
                    VStack(alignment: .leading) {
                        HStack {
                            Text("生物识别登录")
                                .foregroundColor(.white)
                            
                            Spacer()
                            
                            Toggle("", isOn: $isBiometricEnabled)
                                .labelsHidden()
                        }
                        
                        Text("使用面容ID/指纹登录应用")
                            .font(.caption)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                    .padding()
                    .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                    .cornerRadius(15)
                    
                    // 修改密码
                    Button(action: {
                        showPasswordChange = true
                    }) {
                        HStack {
                            Text("修改密码")
                                .foregroundColor(.white)
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .foregroundColor(.gray)
                        }
                        .padding()
                        .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                        .cornerRadius(15)
                    }
                    
                    // 双重认证
                    Button(action: {
                        showTwoFactorSetup = true
                    }) {
                        HStack {
                            Text("双重认证")
                                .foregroundColor(.white)
                            
                            Spacer()
                            
                            Text("未启用")
                                .font(.caption)
                                .foregroundColor(.red)
                            
                            Image(systemName: "chevron.right")
                                .foregroundColor(.gray)
                        }
                        .padding()
                        .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                        .cornerRadius(15)
                    }
                    
                    // 登录设备管理
                    VStack(alignment: .leading) {
                        Text("登录设备管理")
                            .foregroundColor(.white)
                        
                        HStack {
                            Image(systemName: "iphone")
                                .foregroundColor(.blue)
                            
                            VStack(alignment: .leading) {
                                Text("iPhone 13 Pro")
                                    .foregroundColor(.white)
                                
                                Text("当前设备 · 最后登录: 今天 10:30")
                                    .font(.caption)
                                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                            }
                            
                            Spacer()
                            
                            Button(action: {}) {
                                Text("管理")
                                    .font(.caption)
                                    .padding(8)
                                    .background(Capsule().fill(Color(red: 0.5, green: 0.3, blue: 0.7)))
                            }
                        }
                        .padding(.top, 10)
                    }
                    .padding()
                    .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                    .cornerRadius(15)
                }
                .padding(.horizontal)
                .padding(.top, 20)
            }
        }
        .navigationTitle("安全设置")
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showPasswordChange) {
            PasswordChangeView()
        }
        .sheet(isPresented: $showTwoFactorSetup) {
            TwoFactorSetupView()
        }
    }
}

struct SecuritySettingsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            SecuritySettingsView()
        }
        .preferredColorScheme(.dark)
    }
}

struct TwoFactorSetupView: View {
    var body: some View {
        Text("双重认证设置视图")
    }
}
