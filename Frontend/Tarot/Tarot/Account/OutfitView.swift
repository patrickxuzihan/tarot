//
//  OutfitView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

// Account/OutfitView.swift
import SwiftUI

struct OutfitView: View {
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
                Text("装扮功能开发中...")
                    .font(.title2)
                    .foregroundColor(.gray)
                    .padding()
                
                // 占位内容
                VStack {
                    // 虚拟形象预览
                    ZStack {
                        Circle()
                            .fill(Color(red: 0.2, green: 0.1, blue: 0.35))
                            .frame(width: 180, height: 180)
                        
                        VStack {
                            Image(systemName: "person.fill")
                                .font(.system(size: 80))
                                .foregroundColor(.white)
                            
                            HStack {
                                Image(systemName: "crown.fill")
                                    .foregroundColor(.yellow)
                                
                                Image(systemName: "sparkles")
                                    .foregroundColor(.pink)
                            }
                        }
                    }
                    .padding(.bottom, 30)
                    
                    // 装扮选项
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 15) {
                            ForEach(0..<5) { index in
                                VStack {
                                    Circle()
                                        .fill(Color(red: 0.2, green: 0.1, blue: 0.35))
                                        .frame(width: 70, height: 70)
                                        .overlay(
                                            Image(systemName: index == 0 ? "crown.fill" : "hat.fill")
                                                .foregroundColor(index == 0 ? .yellow : .blue)
                                        )
                                    
                                    Text(index == 0 ? "已装备" : "装备 \(index)")
                                        .font(.caption)
                                        .foregroundColor(.white)
                                }
                            }
                        }
                        .padding(.horizontal)
                    }
                    
                    // 购买按钮
                    Button(action: {}) {
                        Text("获取更多装扮")
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(Color(red: 0.5, green: 0.2, blue: 0.7))
                            .cornerRadius(15)
                    }
                    .padding(.horizontal)
                    .padding(.top, 20)
                }
            }
        }
        .navigationTitle("装扮")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct OutfitView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            OutfitView()
        }
        .preferredColorScheme(.dark)
    }
}
