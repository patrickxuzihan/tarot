//
//  FavoritesView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

// Account/FavoritesView.swift
import SwiftUI

struct FavoritesView: View {
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
                Text("收藏功能开发中...")
                    .font(.title2)
                    .foregroundColor(.gray)
                    .padding()
                
                // 占位内容
                VStack(spacing: 20) {
                    ForEach(0..<5) { index in
                        HStack {
                            RoundedRectangle(cornerRadius: 10)
                                .fill(Color(red: 0.2, green: 0.1, blue: 0.35))
                                .frame(width: 60, height: 60)
                                .overlay(
                                    Image(systemName: "heart.fill")
                                        .foregroundColor(.pink)
                                )
                            
                            VStack(alignment: .leading) {
                                Text("收藏项目 \(index + 1)")
                                    .foregroundColor(.white)
                                    .font(.headline)
                                
                                Text("塔罗牌解读/文章/视频")
                                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                                    .font(.caption)
                            }
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .foregroundColor(.gray)
                        }
                        .padding()
                        .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                        .cornerRadius(15)
                    }
                }
                .padding(.horizontal)
            }
        }
        .navigationTitle("我的收藏")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct FavoritesView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            FavoritesView()
        }
        .preferredColorScheme(.dark)
    }
}
