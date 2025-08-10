//
//  HoroscopeView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/14/25.
//

import SwiftUI

struct HoroscopeView: View {
    var body: some View {
        ZStack {
            // 背景
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.25, green: 0.10, blue: 0.40)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()

            VStack(spacing: 20) {
                Text("星座运势")
                    .font(.largeTitle).fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.top, 40)

                Image(systemName: "star.circle.fill")
                    .font(.system(size: 100))
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                    .padding(.vertical, 30)

                Text("探索星座的神秘力量与运势")
                    .font(.title2).fontWeight(.medium)
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
        .navigationTitle("星座运势")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct HoroscopeView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            HoroscopeView()
        }
        .preferredColorScheme(.dark)
    }
}
