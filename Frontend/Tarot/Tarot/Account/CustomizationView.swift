//
//  CustomizationView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

// Account/CustomizationView.swift
import SwiftUI

struct CustomizationView: View {
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
            
            VStack {
                Text("客制化功能开发中...")
                    .font(.title2)
                    .foregroundColor(.gray)
                    .padding()
                
                // 占位内容
                ScrollView {
                    VStack(spacing: 20) {
                        Text("塔罗牌背设计")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.horizontal)
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 15) {
                                ForEach(0..<5) { index in
                                    VStack {
                                        RoundedRectangle(cornerRadius: 10)
                                            .fill(Color(red: 0.2, green: 0.1, blue: 0.35))
                                            .frame(width: 100, height: 150)
                                            .overlay(
                                                Image(systemName: "seal.fill")
                                                    .foregroundColor(index == 0 ? .purple : .gray)
                                            )
                                        
                                        Text("样式 \(index + 1)")
                                            .foregroundColor(.white)
                                            .font(.caption)
                                    }
                                }
                            }
                            .padding(.horizontal)
                        }
                        
                        Text("主题颜色")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.horizontal)
                        
                        HStack(spacing: 15) {
                            ForEach([Color.purple, Color.blue, Color.green, Color.orange], id: \.self) { color in
                                Circle()
                                    .fill(color)
                                    .frame(width: 50, height: 50)
                                    .overlay(
                                        Circle()
                                            .stroke(Color.white, lineWidth: color == .purple ? 2 : 0)
                                    )
                            }
                        }
                        .padding(.horizontal)
                        
                        Text("界面布局")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.horizontal)
                        
                        HStack(spacing: 20) {
                            VStack {
                                RoundedRectangle(cornerRadius: 10)
                                    .fill(Color(red: 0.2, green: 0.1, blue: 0.35))
                                    .frame(width: 80, height: 120)
                                Text("经典")
                                    .foregroundColor(.white)
                                    .font(.caption)
                            }
                            
                            VStack {
                                RoundedRectangle(cornerRadius: 10)
                                    .fill(Color(red: 0.2, green: 0.1, blue: 0.35))
                                    .frame(width: 80, height: 120)
                                Text("现代")
                                    .foregroundColor(.white)
                                    .font(.caption)
                            }
                        }
                        .padding(.horizontal)
                    }
                }
            }
        }
        .navigationTitle("客制化")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct CustomizationView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            CustomizationView()
        }
        .preferredColorScheme(.dark)
    }
}
