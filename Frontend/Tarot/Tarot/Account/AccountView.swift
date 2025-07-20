//
//  AccountView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/14/25.
//

import SwiftUI

struct AccountView: View {
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
                Text("账号中心")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.top, 40)
                
                Image(systemName: "person.crop.circle.fill")
                    .font(.system(size: 100))
                    .foregroundColor(Color(red: 0.7, green: 0.5, blue: 1.0))
                    .padding(.vertical, 30)
                
                Text("在此管理您的账户信息与设置")
                    .font(.title2)
                    .fontWeight(.medium)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 30)
                
                Text("功能开发中，敬请期待")
                    .font(.body)
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    .padding(.top, 10)
                
                Spacer()
            }
        }
        .navigationBarTitle("账号中心", displayMode: .inline)
    }
}

struct AccountView_Previews: PreviewProvider {
    static var previews: some View {
        AccountView()
            .preferredColorScheme(.dark)
    }
}
