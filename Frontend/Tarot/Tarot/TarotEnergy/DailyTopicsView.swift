//
//  DailyTopicsView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/14/25.
//

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
                    Text("每日塔罗话题")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.top, 20)
                        .shadow(color: .purple, radius: 5)
                    
                    // 使用您提供的每日话题组件
                    DailyTopicsSectionView()
                        .padding(.horizontal, 20)
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
