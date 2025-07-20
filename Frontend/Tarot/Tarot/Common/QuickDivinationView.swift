//
//  QuickDivinationView.swift
//  Tarot
//
//  Created by Xu Zihan on 6/24/25.
//

import SwiftUI

struct QuickDivinationView: View {
    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.1, blue: 0.4)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)

            VStack(spacing: 30) {
                // 占位标题
                Text("Quick Divination")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.white)

                // 占位卡片
                RoundedRectangle(cornerRadius: 25)
                    .fill(
                        LinearGradient(
                            colors: [
                                Color(red: 0.6, green: 0.3, blue: 0.8),
                                Color(red: 0.4, green: 0.1, blue: 0.6)
                            ],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 280, height: 400)
                    .shadow(color: .purple.opacity(0.8), radius: 20)
                    .overlay(
                        Image(systemName: "sparkles")
                            .font(.system(size: 100))
                            .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                    )

                Text("这里将展示占卜结果的占位内容")
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .padding(.horizontal, 30)
            }
        }
        .navigationBarTitleDisplayMode(.inline)  // 显示返回按钮
    }
}

struct QuickDivinationView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            QuickDivinationView()
        }
        .preferredColorScheme(.dark)
    }
}
