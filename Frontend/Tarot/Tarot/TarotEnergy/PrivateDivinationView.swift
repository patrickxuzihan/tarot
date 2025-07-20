//
//  PrivateDivinationView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/14/25.
//

import SwiftUI

struct PrivateDivinationView: View {
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
                Text("私人定制占卜")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.top, 40)
                
                Image(systemName: "person.fill.viewfinder")
                    .font(.system(size: 100))
                    .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                    .padding(.vertical, 30)
                
                Text("专属您的个性化占卜体验")
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
        .navigationBarTitle("私人定制", displayMode: .inline)
    }
}

struct PrivateDivinationView_Previews: PreviewProvider {
    static var previews: some View {
        PrivateDivinationView()
    }
}
