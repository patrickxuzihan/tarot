
//
//  DailyTopicsView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/14/25.
//  重构：显示完整的30个每日话题

import SwiftUI

struct DailyTopicsView: View {
    var body: some View {
        ZStack {
            // 深紫色渐变背景
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.1, blue: 0.4)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)
            
            ScrollView {
                VStack(spacing: 20) {
                    // 页面标题
                    Text("每日塔罗话题")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.top, 20)
                        .shadow(color: .purple, radius: 5)
                    
                    // 说明文字
                    Text("30天神秘话题，每日更新探索")
                        .font(.subheadline)
                        .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                        .padding(.bottom, 10)
                    
                    // ✅ 显示全部30个话题（不显示标题栏）
                    DailyTopicsSectionView(
                        displayCount: 30,
                        showHeader: false
                    )
                    .padding(.horizontal, 20)
                    
                    // 底部间距
                    Spacer().frame(height: 30)
                }
            }
        }
        .navigationBarTitle("每日话题", displayMode: .inline)
    }
}

struct DailyTopicsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            DailyTopicsView()
        }
        .preferredColorScheme(.dark)
    }
}
