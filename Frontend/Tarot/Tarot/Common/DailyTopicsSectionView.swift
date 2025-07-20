//
//  DailyTopicsSectionView.swift
//  Tarot
//
//  Created by Xu Zihan on 6/28/25.
//

import SwiftUI

/// 单独的“每日塔罗话题”模块视图
struct DailyTopicsSectionView: View {
    var body: some View {
        VStack(spacing: 15) {
            HStack {
                Text("每日塔罗话题")
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(.white)

                Spacer()

                Button(action: {}) {
                    Text("查看全部")
                        .font(.subheadline)
                        .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                }
            }
            .padding(.horizontal, 5)

            LazyVGrid(
                columns: [GridItem(.flexible(), spacing: 15), GridItem(.flexible())],
                spacing: 15
            ) {
                ForEach(1...10, id: \.self) { index in
                    dailyTopicCard(index: index)
                }
            }
        }
        .padding(.horizontal, 20)
    }

    // 单独的卡片构造函数
    private func dailyTopicCard(index: Int) -> some View {
        let cardColors: [Color] = [
            Color(red: 0.6, green: 0.3, blue: 0.8),
            Color(red: 0.5, green: 0.2, blue: 0.7),
            Color(red: 0.4, green: 0.1, blue: 0.6),
            Color(red: 0.7, green: 0.4, blue: 0.9)
        ]
        let symbolNames = ["heart.fill", "star.fill", "moon.fill", "sun.max.fill", "sparkles"]

        return Button(action: {
            print("点击了话题 #\(index)")
        }) {
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Image(systemName: symbolNames[index % symbolNames.count])
                        .font(.system(size: 20))
                        .foregroundColor(.white)
                        .padding(8)
                        .background(Circle().fill(Color.white.opacity(0.2)))

                    Spacer()

                    Text("\(index)天前")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.7))
                }

                Text("塔罗话题 #\(index)")
                    .font(.headline)
                    .fontWeight(.medium)
                    .foregroundColor(.white)
                    .padding(.top, 5)

                Text("探索塔罗牌的深层含义与智慧")
                    .font(.caption)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .lineLimit(2)
                    .padding(.top, 2)
            }
            .padding(15)
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 15)
                    .fill(cardColors[index % cardColors.count])
            )
            .overlay(
                RoundedRectangle(cornerRadius: 15)
                    .stroke(Color.white.opacity(0.2), lineWidth: 1)
            )
        }
    }
}

struct DailyTopicsSectionView_Previews: PreviewProvider {
    static var previews: some View {
        ZStack {
            Color.black.edgesIgnoringSafeArea(.all)
            DailyTopicsSectionView()
        }
        .preferredColorScheme(.dark)
    }
}
