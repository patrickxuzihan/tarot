//
//  TermsOfServiceView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/21/25.
//

import SwiftUI

struct TermsOfServiceView: View {
    var body: some View {
        ZStack {
            // 背景渐变
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.10, blue: 0.40)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)
            
            ScrollView {
                VStack(spacing: 20) {
                    // TODO: 在此添加“服务条款”内容
                    Text("服务条款内容待添加")
                        .foregroundColor(.white.opacity(0.7))
                        .padding()
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 20)
                .padding(.top, 30)
            }
        }
        .navigationTitle("服务条款")
        .navigationBarTitleDisplayMode(.inline)
    }
}
