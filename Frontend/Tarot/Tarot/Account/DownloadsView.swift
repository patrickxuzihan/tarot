//
//  DownloadsView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

// Account/DownloadsView.swift
import SwiftUI

struct DownloadsView: View {
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
                Text("下载内容开发中...")
                    .font(.title2)
                    .foregroundColor(.gray)
                    .padding()
                
                // 占位内容
                VStack(spacing: 20) {
                    ForEach(0..<3) { index in
                        HStack {
                            RoundedRectangle(cornerRadius: 10)
                                .fill(Color(red: 0.2, green: 0.1, blue: 0.35))
                                .frame(width: 60, height: 60)
                                .overlay(
                                    Image(systemName: "arrow.down.circle.fill")
                                        .foregroundColor(.blue)
                                )
                            
                            VStack(alignment: .leading) {
                                Text("塔罗牌指南 \(index + 1)")
                                    .foregroundColor(.white)
                                    .font(.headline)
                                
                                Text("离线可用 · 128MB")
                                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                                    .font(.caption)
                            }
                            
                            Spacer()
                            
                            Button(action: {}) {
                                Image(systemName: "xmark.circle.fill")
                                    .foregroundColor(.red)
                            }
                        }
                        .padding()
                        .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                        .cornerRadius(15)
                    }
                }
                .padding(.horizontal)
            }
        }
        .navigationTitle("我的下载")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct DownloadsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            DownloadsView()
        }
        .preferredColorScheme(.dark)
    }
}
