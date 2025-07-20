//
//  TarotTutorialView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/14/25.
//

import SwiftUI

struct TarotTutorialView: View {
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
            
            VStack(spacing: 20) {
                Text("塔罗教学")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.top, 40)
                
                Image(systemName: "book.fill")
                    .font(.system(size: 100))
                    .foregroundColor(Color(red: 0.5, green: 0.8, blue: 1.0))
                    .padding(.vertical, 30)
                
                Text("学习塔罗牌的深层含义与解读技巧")
                    .font(.title2)
                    .fontWeight(.medium)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 30)
                
                Text("此功能正在开发中，即将为您呈现")
                    .font(.body)
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    .padding(.top, 10)
                
                Spacer()
            }
        }
        .navigationBarTitle("塔罗教学", displayMode: .inline)
    }
}

struct TarotTutorialView_Previews: PreviewProvider {
    static var previews: some View {
        TarotTutorialView()
    }
}
